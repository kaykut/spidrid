# RSVP (Rapid Serial Visual Presentation) Specifications

Research compiled: 2026-01-06

## Overview

RSVP is a technique for displaying text one word at a time at a fixed location. The key innovation (popularized by Spritz) is the **Optimal Recognition Point (ORP)** - a specific letter in each word that the eye naturally focuses on for fastest recognition.

## Optimal Recognition Point (ORP)

### What is ORP?

The ORP (also called Optimal Viewing Position or OVP) is the letter most crucial for the brain to process the meaning of a word. Research shows:

- Eyes naturally land at a predictable position: **between the beginning and middle of the word** (slightly left of center)
- Word recognition is fastest when fixation is centered around this optimal point
- During natural reading, fixation tends to be **slightly to the left** of the geometric center

### ORP Calculation Algorithm

Based on the canonical implementation from [GitHub gist by jmgunn87](https://gist.github.com/jmgunn87/9882152):

```javascript
function ORP(word) {
  var length = word.length;
  // Strip trailing punctuation
  while('\\n,.?!:;"'.indexOf(word[--length]) !== -1);
  switch(++length) {
    case 0: case 1: return 0;      // 0-1 chars: first letter
    case 2: case 3: return 1;      // 2-3 chars: second letter
    default: return Math.floor(length / 2) - 1;  // 4+ chars: slightly left of center
  }
}
```

**Key principle**: As word length increases, the ORP shifts progressively to the left of center.

### ORP Examples

| Word Length | ORP Index | Example |
|-------------|-----------|---------|
| 1 | 0 | **a** |
| 2 | 1 | a**n** |
| 3 | 1 | t**h**e |
| 4 | 1 | r**e**ad |
| 5 | 1 | s**p**eed |
| 6 | 2 | re**a**der |
| 7 | 2 | re**a**ding |
| 8 | 3 | und**e**rway |
| 10 | 4 | unde**r**stand |

## Visual Display Requirements

### Fixed Anchor Position (Critical)

**The ORP letter must always appear at the exact same horizontal position on screen.** This is the core principle of RSVP:

1. A fixed vertical line (crosshair/anchor) marks the focus position
2. Each word is positioned such that its ORP letter aligns exactly with this anchor
3. The eye stays fixed; only the surrounding letters change

This eliminates saccades (eye movements) which slow down reading.

### Color Highlighting

Per Spritz and standard implementations:

- **ORP letter**: Highlighted in **red** (typically bright red like #ff0000 or coral)
- **Other letters**: Displayed in the standard text color
- The color contrast must be **high enough** to make the ORP letter instantly identifiable

The red highlight serves two purposes:
1. Draws the eye to the fixation point
2. Helps maintain focus during rapid word changes

### Crosshair/Anchor

A subtle vertical line or marker at the ORP position helps users:
- Initially find the focus point
- Maintain consistent eye position
- Verify words are properly aligned

## Timing Considerations

### Base WPM Calculation
```
interval_ms = 60000 / wpm
```

### Pause Multipliers

Adaptive pausing improves comprehension:
- **Sentence endings** (. ! ?): 1.5-2.0x pause
- **Clause breaks** (, ; :): 1.2-1.5x pause
- **Long words** (12+ chars): 1.1-1.3x pause
- **Normal words**: 1.0x (no extra pause)

## Research Findings

### Benefits
- Eliminates saccadic eye movements
- Can increase reading speed to 400-600+ WPM with practice
- Fixed focus point reduces visual fatigue during short sessions

### Limitations (from academic research)
- Prolonged use may reduce parafoveal processing
- Can impair literal comprehension at very high speeds
- May increase visual fatigue during extended sessions
- Re-reading and backtracking are more difficult

## Sources

- [Wikipedia: Rapid Serial Visual Presentation](https://en.wikipedia.org/wiki/Rapid_serial_visual_presentation)
- [GitHub: pasky/speedread](https://github.com/pasky/speedread) - Terminal-based RSVP implementation
- [GitHub Gist: jmgunn87/ORP](https://gist.github.com/jmgunn87/9882152) - ORP calculation reference
- [ScienceDirect: Rapid serial visual presentation in reading: The case of Spritz](https://www.sciencedirect.com/science/article/abs/pii/S0747563214007663)
- [Am I Reading This Right? - Visual Cognition Lab](https://jhenderson.org/vclab/Blog/Entries/2014/3/7_Am_I_Reading_This_Right.html)
- [Rapid Reader](https://rapidreader.clayson.io/) - Web-based RSVP tool
