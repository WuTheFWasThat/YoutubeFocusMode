// ==UserScript==
// @name         Youtube-focus
// @namespace    wuthefwasthat
// @version      0.1
// @description  Youtube focus
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
  console.log('focus mode on');
  if (styleEl) {
    console.log('hmm, already has styleel?')
    return;
  }
  addStyle(`
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
  }
}

function toggleFocusMode() {
  var styleEl = document.getElementById(styleElemId);
  if (styleEl) {
    focusModeOff();
  } else {
    focusModeOn();
  }
}

// toggle once by default
focusModeOn();

function isPlaying() {
  var vid = document.querySelector("video");
  return !!(vid.currentTime > 0 && !vid.paused && !vid.ended && vid.readyState > 2);
}

function pauseOrResume() {
  var vid = document.querySelector("video");
  vid.paused ? vid.play() : vid.pause();
}

document.addEventListener("keydown", function(e) {
  var keyCode = e.keyCode;
  console.log('keyCode', keyCode);
  if (keyCode === 13) { // enter
    pauseOrResume();
    if (isPlaying()) {
      focusModeOn();
    } else {
      focusModeOff();
    }
  } else if (keyCode === 80) { // p
    pauseOrResume();
  } else if (keyCode === 0 || keyCode === 32) { // space
    pauseOrResume();
  } else if (keyCode === 72) { // h
    sendKey(74); // send a j
  } else if (keyCode === 77) { // m
    toggleFocusMode();
  } else if (keyCode === 188) { // ,
    if (e.shiftKey) { return; }
    sendKey(keyCode, true); // send a <
  } else if (keyCode === 190) { // .
    if (e.shiftKey) { return; }
    sendKey(keyCode, true); // send a >
  }
}, false);

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
