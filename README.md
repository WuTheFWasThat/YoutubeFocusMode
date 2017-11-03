# YoutubeFocusMode

Userscript which makes Youtube videos display in a pseudo-fullscreen mode, which I call focus mode.

## Features

In focus mode, the video takes up the full screen.  There is almost nothing else.

- You can't scroll, see recommendations, comments, etc.
- No controls menu, just a tiny progress bar at the bottom
- When the video ends, you don't see recommendations - just a beautiful black screen :)

When you do want comments, etc., you can simply press `m` to toggle focus mode.

### Keybindings

- Remaps `m` to toggling focus mode (on by default, of course!)
- Remaps `enter` to toggle focus mode, and play/resume based on that (good if you want focus mode IFF the video is playing, like I do)
- Remaps `h` to rewind (instead of `j`)
- Remaps `space` and `p` to pause/resume
- Remaps `[` and `]` to control volume
- Remaps `,` and `.` to speed changes (normally it's `<` and `>`, so you save a keystroke!)

These mappings may seem slightly arbitrary to you since it was designed for my worfklow.
In particular, `h` is rewind to match `l` being fast-forward is based on vim bindings.
So I tried to keep my script simple and hackable, so anyone with some basic Javascript knowledge should be able to tweak it.

## Install

If you have Tampermonkey/Greasemonkey installed, then just [click this link](https://github.com/WuTheFWasThat/YoutubeFocus/raw/master/youtube-focus.user.js)

## Caveats

This script can break anytime, since Youtube can update their website.
I tried to make it not depend too much on specifics of the CSS, but I'm sure things will happen.

Pull requests are much appreciated!

## Why?

I spend way more time than I'd like to admit on Youtube.
I wanted something like youtube full-screen, but more lightweight, and which worked with my Vimium workflow.

Hopefully, it will
- save me more time than I spent making it
- be useful to others

### Vimium workflow

As a Vimium user, Youtube's normal full-screen is annoying (I can't use Vomnibar.activateTabSelection, for example).
Furthermore, Youtube uses `j` and `k` for rewinding and pause/resume.
This is annoying since Vimium by default uses these for scrolling.

So here's my workflow, and that which I recommend to Vimium users:

- Tell vimium to let the keys `hlmp><,.[]` pass through to the page
- As a result,
  - `h` rewinds and `l` fast-forwards
  - `j` and `k` scroll (only useful outside of focus mode)
  - all the other script-added shortcuts work too, of course

## Alternatives

This is sort of similar to [Zren/ResizeYoutubePlayerToWindowSize](https://github.com/Zren/ResizeYoutubePlayerToWindowSize), but much fewer lines of code, and works better for me.
Also, it removes the extra distractions entirely.

I'm sure there are other alternatives, maybe even ones *gasp* better than this.
Feel free to make a PR adding them here.
