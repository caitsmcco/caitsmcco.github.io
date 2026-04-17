# caitsmcco.github.io

## Cribbage Analytics Dashboard

[caitsmcco.github.io/data/crib/](https://caitsmcco.github.io/data/crib/)

Cribbage (or 'crib') is a game of pairs, runs, fifteens, and mental arithmetic — and it turns out me and my friends were slightly worse at scoring our hands than we had anticipated. This dashboard lets us go back through every round of every game and figure out exactly what we missed, why, and how often.

### What you can explore

**The heatmap** shows every game and every round laid out in a grid, coloured by score margin. A ⚠ marks any round where a hand or crib was miscounted. Hovering or clicking on a cell populates the crib board and cards. Stars are gifted to the winner of each game.

**The cribbage board** shows the score state at that moment in the game, with animated pegs for both players. This is all you usually get in a game of crib!

**The hand and crib breakdown** shows each player's kept cards, the cut card, their score bars with tooltips explaining the counts, and a flag with the correct score whenever something was counted wrong. A play sequence sits between the two players showing the order cards were played and the running total.

**The win / loss chart** shows each player's record across all games. Wins and losses are both shown in the player's own colour with wins at full opacity and losses dimmed.

**The average points chart** breaks down each player's average points per round into the three sections of the game (pegging, hand, and crib) shown as a grouped bar.

**The best round chart** shows each player's highest scoring round, broken down by pegging, hand, and crib points. Clicking one will load that game.

**The distribution charts** compare our actual hand and crib scores against the theoretical distribution across 12,994,800 possible hands. Hands skew higher than random because players choose what to keep and cribs are closer to random because both players discard into them.

**The accuracy charts** plot every hand and crib miscount as a beeswarm to highlight any all outliers in our counting. Clicking a dot loads that round.

### Built with

- [D3.js](https://d3js.org/) — all SVG charts, the cribbage board, scales, axes, colour interpolation
- Vanilla JS — cribbage scoring engine, card parser, play sequence logic, miscount detection
- Google Fonts — Playfair Display + IBM Plex Mono
- GitHub Pages — hosting

### A note on development
This dashboard was built with d3 coding assistance from Claude Sonnet (Anthropic, 2026). Claude Sonnet was used to write and debug JavaScript and CSS to my specifications. All design decisions, data collection, analysis direction, and project scope had no AI use.


## Make it your own

This dashboard is built around a specific CSV format and a small set of hardcoded player names but feel free to fork!

**1. Fork the repository**

Fork this repo on GitHub and enable GitHub Pages in your repository settings (Settings → Pages → deploy from main branch).

**2. Collect your data**

Use the data collection page at `/data/crib/collect/` to record games round by round. At the end of each game, download the CSV. Combine all your game CSVs into a single file and replace `edited.csv` in the `/data/crib/` directory. This is optimized for a touchscreen laptop! **The collection page is temporarily out of order**

**3. Update player names and colours**

In `index.html`, find the `PCOL` object near the top of the script (search for `const PCOL`). It looks like this:

```js
const PCOL = {
  Caitlin: { peg: '#c0392b', light: '#e85d4a' },
  Sarah:   { peg: '#6113a5', light: '#a855f7' },
  Colban:  { peg: '#918000', light: '#E3E049' },
  James:   { peg: '#185fa5', light: '#3a8fd4' },
  Darren:  { peg: '#0e7c55', light: '#10b981' },
};
```

Replace the names with your own players and pick colours to match. The `peg` colour is used for filled shapes and bar charts, `light` is used for text labels. Names must match exactly what you enter in the data collection tool.

**4. Update the collect page**

In `collect/index.html`, find the player name dropdowns and update the default names to match your group.

---

*Contributions and improvements welcome — open an issue or pull request if you build something new on top of it. Idealy, eventually this site will allow for personal data collection and viewing without manually updating the csv in the source code.*
