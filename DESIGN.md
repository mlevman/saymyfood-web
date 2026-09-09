# DESIGN.md — SayMyFood web

**Skeleton.** Only what is already written down somewhere in this repository has
been moved here. Every other heading is marked `TODO - owner to fill.` Nothing in
this file was invented; if a rule is not in the source, it is not stated here.

## Contents

1. [Colour tokens](#1-colour-tokens)
2. [Typography](#2-typography)
3. [Spacing and radii](#3-spacing-and-radii)
4. [Components](#4-components)
5. [Motion](#5-motion)
6. [The game field](#6-the-game-field)
7. [Language](#7-language)
8. [Iconography](#8-iconography)
9. [Voice and copy](#9-voice-and-copy)
10. [Accessibility](#10-accessibility)

---

## 1. Colour tokens

Source: the `:root` block of `site.css`. These are the site-wide custom properties.

| Token | Value | Used for |
| --- | --- | --- |
| `--bg` | `#0C100E` | page background |
| `--card` | `#151A18` | raised surface |
| `--card2` | `#1B211E` | second-level surface (dropdown menu) |
| `--hair` | `rgba(255,255,255,0.07)` | hairline border |
| `--hair2` | `rgba(255,255,255,0.14)` | stronger hairline border |
| `--tx` | `#F2F5F3` | primary text |
| `--tx2` | `rgba(242,245,243,0.60)` | secondary text |
| `--tx3` | `rgba(242,245,243,0.42)` | tertiary / muted text |
| `--mint` | `#8FDCC0` | accent, primary action, links |
| `--mint-dim` | `rgba(143,220,192,0.12)` | accent fill / highlighted row |
| `--fat` | `#E3C34A` | nutrient: fat |
| `--carbs` | `#F0913E` | nutrient: carbs |
| `--fiber` | `#A8D06A` | nutrient: fiber |
| `--protein` | `#F08A8A` | nutrient: protein |

`color-scheme: dark` is declared on `:root`. The site is dark only.

### Game palette

Source: the `ART` object in `test/alpha/game/art.js` and the `<style>` block of
`test/alpha/game/index.html`. The game shares `site.css` and therefore the tokens
above, but the canvas renderer carries its own literals:

| Name | Value | Note |
| --- | --- | --- |
| `ART.mint` | `#8FDCC0` | same value as `--mint` |
| `ART.warm` | `#F0913E` | same value as `--carbs` |
| `ART.hot` | `#F2717A` | also used in CSS for the hardcore accent |
| `ART.bone` | `#E3EAE6` | line art stroke |
| `ART.dim` | `rgba(227,234,230,.35)` | faded line art |
| `ART.red` | `#E23E24` | |
| `ART.yellow` | `#E0C93B` | |
| `ART.green` | `#2FB56A` | |
| `ART.ink` | `#0E1210` | |
| clash highlight | `#F6E7A0` | canvas only, not a token |
| game page background | `#161616` | the game page overrides `--bg` |
| field background | `#141816` | inside the 16:9 frame |

## 2. Typography

Source: `site.css`.

- Font stack, the `--font` token:
  `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- Body: `16px / 1.6`, `-webkit-font-smoothing: antialiased`.
- `h2`: `25px`, line-height `1.2`, letter-spacing `-0.02em`, weight `700`;
  `22px` below 640px.
- `.eyebrow`: `10.5px`, weight `700`, letter-spacing `0.14em`, uppercase.
- Legal pages: `h1` `31px` (`26px` below 640px), `h2` `16.5px`, body `15px`.
- `.legal p` and `.box p` use `text-wrap: pretty`.

The game canvas draws text in `Manrope, sans-serif` at weights `600`–`800`. Note
that Manrope is not loaded anywhere in this repository, so it resolves to the
generic sans-serif fallback.

Numeric columns use `font-variant-numeric: tabular-nums` (score tables, the
leaderboard, the stats grid).

## 3. Spacing and radii

Only two facts are written down:

- `--r: 18px`, the shared card radius token in `site.css`.
- Pills and primary buttons use `border-radius: 999px`.

TODO - owner to fill. There is no spacing scale in the source; the values are
per-component literals.

## 4. Components

TODO - owner to fill.

## 5. Motion

Written down:

- `@media (prefers-reduced-motion: reduce)` in `site.css` switches off the logo
  sheen, the pulsing dot and the reveal transition.
- `test/alpha/game/game.js` reads the same query into `RM` and uses it to drop the
  rise and pop of the clash-bonus flourish.

TODO - owner to fill: durations and easings are per-component literals with no
stated scale.

## 6. The game field

Source: `test/alpha/game/game.js` and the `<style>` block of
`test/alpha/game/index.html`.

- The logical field is a fixed **960 × 540**. `game.js` declares `W=960, H=540`
  and sets the canvas backing store to those numbers; every coordinate in the
  engine and in `art.js` is in that space.
- Ground line `GY = 470`. Fence at `FX = 480`, height `FH = 92`. Trees at
  `TREE_L = 64` and `TREE_R = 896`, gather zone `GZONE = 95`.
- The canvas is presented inside a **16:9** frame — `.frame` sets
  `aspect-ratio: 16/9` and caps its width against the available height, so the
  field scales but never changes shape.
- Landscape only on a touch device: a portrait phone gets the rotate prompt
  instead of the game.

## 7. Language

Four languages, always: **en, ru, es, pt** (pt is pt-BR). Adding one UI string
means adding four entries.

The choice is shared across the whole site through the **`smf_lang`**
localStorage key. Every page reads it the same way: `smf_lang` first, then the
first two letters of `navigator.language`, then `en`. `i18n.js`,
`test/alpha/game/ui.js` and `auth/callback/index.html` each implement that order.

A missing key must render as the key name, so a gap is visible rather than blank.

## 8. Iconography

Written down: icons are inline SVG. There is no icon library and no icon image
files in this repository — the only raster asset is the brand mark,
`brand/saymyfood-mark.png`.

TODO - owner to fill: stroke width and sizing are per-icon literals.

## 9. Voice and copy

TODO - owner to fill.

## 10. Accessibility

TODO - owner to fill.
