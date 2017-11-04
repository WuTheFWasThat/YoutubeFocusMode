# YoutubeFocusMode

This is a userscript which makes Youtube videos display in a pseudo-fullscreen mode, which I call focus mode.

## Features

### Focus mode

In focus mode, the video takes up the full screen.  There is almost nothing else.

- You can't scroll, see sidebar recommendations, comments, etc.
- No controls menu, just a tiny progress bar at the bottom
- When the video ends, you don't see those recommendations either - just a beautiful black screen :)

### Keybindings

In addition to the excellent [built in shortcuts](https://sites.google.com/a/umich.edu/going-google/accessibility/google-keyboard-shortcuts---youtube), this script provides:
- `;` to toggle focus mode (on by default, of course!).  I recommend `space` or `enter` instead, almost always.
- `enter` to toggle focus mode, and play/resume based on that (while the video hasn't ended)
- `p` to pause/resume (normally `space` or `k`)
- `[` and `]` to control volume
- `,` and `.` for speed changes (more control than the default `<` and `>`, plus you don't have to press shift!)
- `h` to rewind (normally `j`, with `l` as fast-forward)

These mappings may seem slightly arbitrary to you since it was designed for my worfklow.
I tried to keep my script simple and hackable, so anyone with some basic Javascript knowledge should be able to tweak it.

### Caveats

This script may break when Youtube updates their website.
I tried to make it not depend too much on specifics of the CSS, but I'm sure things will happen.
Hopefully this will be rare and fixes will be quick.

Pull requests are much appreciated!

## Install

If you have Tampermonkey/Greasemonkey installed, then just [click this link](https://github.com/WuTheFWasThat/YoutubeFocus/raw/master/youtube-focus.user.js)

## Why?

I spend way more time than I'd like to admit on Youtube.
I wanted something like youtube full-screen, but more lightweight, and which worked with my Vimium workflow.
Hopefully, it will save me more time than I spent making it and be useful to others.

### Vimium workflow

As a Vimium user, Youtube's normal full-screen is annoying (I can't use Vomnibar.activateTabSelection, for example).
Furthermore, Youtube uses `j` and `k` for rewinding and pause/resume, which are usually used for scrolling.

So here's my workflow, and that which I recommend to Vimium users:

- Tell vimium to let the keys `hlmp><,.[];/` pass through to the page
- As a result,
  - `h` rewinds and `l` fast-forwards
  - `j` and `k` scroll (only useful outside of focus mode)
  - all the other script-added shortcuts work too, of course

## Alternatives

This is sort of similar to [Zren/ResizeYoutubePlayerToWindowSize](https://github.com/Zren/ResizeYoutubePlayerToWindowSize), but much fewer lines of code, and works better for me.
Also, it removes the extra distractions entirely.

I'm sure there are other alternatives, maybe even ones better than this (*gasp*).
Feel free to make a PR adding them here.
