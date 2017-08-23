# piazza-js
Various scripts designed to make life with Piazza a little easier.

Can be installed in Tampermonkey for Chrome (https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) or Greasemonkey for Firefox (https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/).

# piazza-shortcuts.js

Hotkeys and links to make catching up on Piazza posts easier.

- Shift+left arrow: move earlier in the history.
- Shift+right arrow: move later in the history (or jump to first unread follow-up if already at the end).
- Shift+up arrow: move later in the post list.
- Shift+down arrow: move earlier in the post list.

- Shift+meta+U: mark thread as unread.
- Shift+meta+X: unarchive thread.
- Shift+meta+alt+X: archive thread.
- Shift+meta+S: star thread.
- Shift+meta+E: start or stop receiving e-mails for the thread.

## Known issues

Shift+meta+X doesn't reflect the fact that you unarchived the thread until you refresh the page.

# piazza-themes.js

Allows "skinning" Piazza forums for individual classes.  Handy if you're enrolled in multiple Piazzas.  Particularly handy if you're a TA who posts announcements in one and a mild-mannered student in others.

To theme your classes:
1. Pull open the class forum in your web browser.
2. You'll see a url like /class/<your-class-id>
3. Scroll to the updateTheme method and put in a check like this:
```
   if (window.location.pathname.indexOf('/class/<your-class-id>') > -1) {
       addTheme('<some-unique-name-like-your-class-number>', themes.jackets);
   } else {
       $('style.<some-unique-name-like-your-class-number>').remove();
   }
```

To change the current term (hiding older classes):
1. Scroll to the hideOutdated method and change the value of the term variable:
   `var term = 'Fall 2017';`

Note that dark themes look a little wonky at the moment and some are incomplete.  Less eye-bleedy themes include: grass, lime, purple, orange, raspberry, grayscale.

# Bug reports

Bug reports, feature requests and pull requests are all welcomed!
New color schemes for piazza-themes.js are also particularly appreciated.

This repository should accept both bug reports and pull requests.  *SHOULD.*

In the event that I've messed up the Github settings (likely), my GATech e-mail alias is "smiley".
