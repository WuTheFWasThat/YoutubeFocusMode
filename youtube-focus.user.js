// ==UserScript==
// @name         Youtube-focus-mode
// @namespace    wuthefwasthat
// @version      0.1
// @description  Youtube focus mode
// @match        *://www.youtube.com/watch*
// @copyright    2017+, You
// @grant        none
// ==/UserScript==

function addStyle(style_str, id) {
  var el = document.createElement('style');
  el.type = "text/css";
  if (id) el.id = id;
  if (el.styleSheet) { el.styleSheet.cssText = str; } // IE only
  else { el.appendChild(document.createTextNode(style_str)); }
  document.head.appendChild(el);
}

var styleElemId = 'yt-custom-style';

function focusModeOn() {
  var styleEl = document.getElementById(styleElemId);
  getVideo().focus();
  console.log('focus mode on');
  if (styleEl) {
    console.log('focus mode already on?');
    return;
  }
  addStyle(`
    /* TODO: Ideally figure out how to get this to work in focus mode
    .search-input:focus {
      z-index: 200 !important;
    }
    */
    .html5-video-player {
      position: fixed;
      left: 0;
      top: 50%;
      transform: translate(0%, -50%);
    }
    .html5-video-container {
      width: 100% !important;
      height: 100% !important;
    }
    .html5-main-video {
      width: 100% !important;
      height: 100% !important;
      left: 0px !important;
      top: 0px !important;
    }
    .html5-endscreen {
      display: none !important;
    }
    /*
    .ytp-chrome-bottom {
      display: none !important;
    }
    */
    .ytp-chrome-controls {
      display: none !important;
    }
    .ytp-progress-bar-container {
      bottom: 0px !important;
    }
    #masthead-positioner {
      z-index: 0 !important;
    }
    #container {
      display: none !important;
    }
    #main {
      display: none;
    }
    #items {
      display: none;
    }
  `, styleElemId);
}

function focusModeOff() {
  var styleEl = document.getElementById(styleElemId);
  console.log('focus mode off');
  if (styleEl) {
    styleEl.parentNode.removeChild(styleEl);
    // b/c of browser layout bugs
    window.dispatchEvent(new Event('resize'));
  }
}

function hasFocusMode() {
  var styleEl = document.getElementById(styleElemId);
  return !!styleEl;
}

function toggleFocusMode() {
  if (hasFocusMode()) {
    focusModeOff();
  } else {
    focusModeOn();
  }
}

// toggle once by default
focusModeOn();

function getVideo() {
  return document.querySelector("video");
}

function pauseOrResume() {
  var vid = getVideo();
  vid.paused ? vid.play() : vid.pause();
}

function cancelEv(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

var speedPow = 0;
function handleKeydown(e) {
  if (
    document.activeElement.type === 'textarea' ||
    document.activeElement.type === 'text'
  ) {
    // not sure why browser doesn't take care of this for me, but we don't want to
    // interfere with typing comments or search
    return;
  }
  var keyCode = e.keyCode;
  console.log('keyCode', keyCode);
  if (keyCode === 13) { // enter
    var vid = getVideo();
    if (hasFocusMode()) {
      // not sure why needed sometimes for very first load
      setTimeout(function() {
        if (!vid.paused && !vid.ended) {
          console.log('pausing');
          vid.pause();
        }
      }, 10);
      focusModeOff();
    } else {
      if (vid.paused && !vid.ended) {
        console.log('playing');
        vid.play();
      }
      focusModeOn();
    }
    return cancelEv(e);
  } else if (keyCode === 80) { // p
    pauseOrResume();
  // } else if (keyCode === 0 || keyCode === 32) { // space
  // } pauseOrResume();
  } else if (keyCode === 72) { // h
    sendKey(74); // send a j
  } else if (keyCode === 59) { // ;
    toggleFocusMode();
  } else if (keyCode === 188) { // ,
    speedPow = Math.max(speedPow - 1, -25);
    getVideo().playbackRate = Math.pow(1.25, speedPow);
  } else if (keyCode === 190) { // .
    speedPow = Math.min(speedPow + 1, 25);
    getVideo().playbackRate = Math.pow(1.25, speedPow);
  } else if (keyCode === 191) { // /
    // TODO: ideally make this work in focus mode
    if (hasFocusMode()) {
      focusModeOff();
    }
    // wtf, there are two things with id search
    document.querySelector('input#search').focus();
  } else if (keyCode === 219) { // [
    var vid = getVideo();
    vid.volume = vid.volume - 0.05;
  } else if (keyCode === 221) { // ]
    var vid = getVideo();
    vid.volume = vid.volume + 0.05;
  }
}
document.addEventListener("keydown", handleKeydown, false);

function sendKey(keyCode, shift) {
  var keyboardEvent = document.createEvent("KeyboardEvent");
  var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
  keyboardEvent[initMethod](
    "keydown", // event type : keydown, keyup, keypress
     true, // bubbles
     true, // cancelable
     window, // viewArg: should be window
     false, // ctrlKeyArg
     false, // altKeyArg
     !!shift, // shiftKeyArg
     false, // metaKeyArg
     keyCode, // keyCodeArg : unsigned long the virtual key code, else 0
     0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
  );
  document.dispatchEvent(keyboardEvent);
}
