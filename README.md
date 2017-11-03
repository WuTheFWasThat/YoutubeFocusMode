# YoutubeFocus

Userscript which makes Youtube videos display in "mini-fullscreen" mode, which I call focus mode.
It can be toggled easily with `m`.

## Install

If you have Tampermonkey/Greasemonkey installed, then just [click this link](https://github.com/WuTheFWasThat/YoutubeFocus/raw/master/youtube-focus.user.js)

## Alternatives

This is sort of similar to [Zren/ResizeYoutubePlayerToWindowSize](https://github.com/Zren/ResizeYoutubePlayerToWindowSize), but much fewer lines of code, and works better for me.
I'm sure there are others.

## Features

Focus mode
- Video takes up the full screen.  Nothing else.
  You can't scroll, see recommendations, comments, etc.
- No end-screen with recommendations to bait you into more videos!
- No controls menu, just a tiny progress bar at the bottom.

Keybindings:
- Remaps `m` to toggling focus mode (on by default, of course!)
- Remaps `enter` to pause/resume, plus toggle focus mode based on that (good if you want focus mode IFF the video is playing, like I do)
- Remaps `h` to rewind (instead of `j`)
- Remaps `space` and `p` to pause/resume
- Remaps `,` and `.` to speed changes (normally it's `<` and `>`, so you save a keystroke!)

This may seem arbitrary to you since it was designed for my worfklow.
Luckily my script is simple enough that perhaps you can tweak it!

## Why?

I made this for myself to solve a perhaps random set of problems, arising from my use of Vimium.

- I wanted something like youtube full-screen, but more lightweight, and with other vimium unaffected (in actual full-screen, I can't use Vomnibar.activateTabSelection, for example).
- Youtube uses `j` and `k` for rewinding and pause/resume.  This annoying since I'm used to these being scrolling.

So here's my workflow:

- I tell vimium to let the keys `hlmp><,.` pass through to the page
- As a result, I end up with the more intuitive (to me) bindings:
  - `,` and `.` change speed
  - `h` rewinds and `l` fast-forwards
  - `enter` to toggle watching
  - `j` and `k` scroll (only useful outside of focus mode)
