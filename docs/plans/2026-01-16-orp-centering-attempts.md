# ORP Centering Problem - Implementation Attempts

**Date:** 2026-01-16
**Goal:** Position ORP character at exactly 40% of screen width with perfect centering (zero wobble)
**Status:** Failed after multiple attempts

---

## The Problem

In RSVP (Rapid Serial Visual Presentation) speed reading, we display one word at a time with the ORP (Optimal Recognition Point) highlighted. The ORP should:

1. **Stay at a fixed horizontal position** (40% of screen width)
2. **Be perfectly centered at that position** (center of character aligns with the 40% mark)
3. **Have zero wobble** (position doesn't shift as different characters appear)

### Why This Is Hard

Different characters have different widths:
- Narrow characters: 'i', 'l', 'j' (~8-10px at 42pt font)
- Medium characters: 'o', 'e', 'a' (~18-20px at 42pt font)
- Wide characters: 'W', 'M', 'm' (~26-30px at 42pt font)

To center a character at 40%, we need to:
1. Position its left edge at 40%
2. Shift it left by half its width

The challenge: **we don't know the character's width until it's rendered**.

---

## Current Implementation (40/60 Layout)

### Layout Structure

```tsx
<View style={wordRow}>
  {/* Before text: 40% width, right-aligned */}
  <View style={beforeContainer}>
    <Text>{before}</Text>
  </View>

  {/* After text: takes remaining space */}
  <View style={afterContainer}>
    <Text>{after}</Text>
  </View>

  {/* ORP: absolutely positioned at 40% */}
  <Text style={orpCharPositioned}>
    {orpChar}
  </Text>
</View>
```

### Styles

```tsx
wordRow: {
  position: 'relative',
  flexDirection: 'row',
  width: '100%',
}

beforeContainer: {
  width: '40%',
  alignItems: 'flex-end',
}

afterContainer: {
  marginLeft: 20,  // Offset to avoid ORP overlap
  flex: 1,
  alignItems: 'flex-start',
}

orpCharPositioned: {
  position: 'absolute',
  left: '40%',
  // Need to shift left by half character width - this is the problem
}
```

---

## Attempts and Failures

### Attempt 1: Fixed Pixel Value (45/55 split, -10.5px shift)

**What I tried:**
```tsx
orpCharPositioned: {
  position: 'absolute',
  left: '45%',
  transform: [{ translateX: -10.5 }],
}
```

**Reasoning:**
- At 48pt font, characters average ~21px wide
- Shift left by 21/2 = 10.5px to center

**Why it failed:**
- Assumption about character width was incorrect
- Different characters have different widths
- No visible change from previous implementation
- User reported: "absolutely nothing changed"

---

### Attempt 2: Fixed Pixel Value (40/60 split, -9px shift)

**What I tried:**
```tsx
orpCharPositioned: {
  position: 'absolute',
  left: '40%',
  transform: [{ translateX: -9 }],
}
```

**Reasoning:**
- Font size was reduced to 42pt (from 48pt)
- At 42pt, characters average ~18px wide
- Shift left by 18/2 = 9px to center

**Why it failed:**
- Still just guessing at character width
- No actual measurement of rendered characters
- User feedback: "this whole time you weren't dynamically calculating and just trying to eyeball it?"

---

### Attempt 3: Percentage Transform (invalid)

**What I tried:**
```tsx
orpCharPositioned: {
  position: 'absolute',
  left: '40%',
  transform: [{ translateX: '-50%' }],
}
```

**Reasoning:**
- Tried to use CSS-style percentage transform
- `-50%` should mean "shift left by 50% of element's own width"

**Why it failed:**
- **React Native transforms only accept numbers (pixels), not percentage strings**
- The string `'-50%'` is invalid and gets silently ignored
- This is different from CSS on web where percentage transforms work
- User feedback: "again, nothing actually changed"

---

### Attempt 4: Dynamic Measurement with onLayout

**What I tried:**
```tsx
// Add state to track width
const [orpWidth, setOrpWidth] = useState(0);

// Measure character width with onLayout
<Text
  style={[
    styles.orpCharPositioned,
    {
      transform: [{ translateX: -orpWidth / 2 }]
    }
  ]}
  onLayout={(event) => {
    const { width } = event.nativeEvent.layout;
    if (width !== orpWidth) {
      setOrpWidth(width);
    }
  }}
>
  {orpChar}
</Text>
```

**Reasoning:**
- Use React Native's `onLayout` callback to measure actual rendered width
- Calculate dynamic transform: `-orpWidth / 2`
- This should give exact centering for each character

**Current status:**
- Implementation complete
- **User has not yet confirmed if this works**
- This is the theoretically correct approach

**Potential issues:**
- Initial render has `orpWidth = 0`, so first frame might be wrong
- State update after layout might cause a flash/flicker
- `onLayout` timing might interact poorly with RSVP playback (words change rapidly)

---

## Why This Is Difficult

### React Native Transform Limitations

1. **No percentage values:** `transform: [{ translateX: '-50%' }]` doesn't work
2. **Must use pixels:** Need actual pixel width of character
3. **Width varies:** Each character has different width
4. **Fonts vary:** Different font families have different character widths

### Measurement Timing Issues

1. **onLayout is async:** Character renders first, then layout callback fires
2. **State update required:** Setting `orpWidth` triggers re-render
3. **Rapid changes:** In RSVP, words change every 240ms (at 250 WPM)
4. **Potential flicker:** First frame might show uncentered character

### Alternative Approaches Not Tried

1. **Pre-measure character widths:**
   - Render all characters a-z, A-Z off-screen on app load
   - Store widths in a lookup table
   - Use lookup during RSVP playback
   - Problem: Still font-family dependent

2. **Use a monospace font:**
   - All characters same width
   - Can use fixed pixel shift
   - Problem: Less readable, user has font preference

3. **Don't center - just left-align:**
   - Position left edge of ORP at 40%
   - Accept that ORP will be slightly right of 40% mark
   - Simpler, no measurement needed
   - Problem: Character width variation causes visible wobble

4. **Center crosshair on character, not vice versa:**
   - Let ORP position naturally
   - Move crosshair to center of rendered character
   - Problem: Crosshair wobbles instead of ORP

---

## Key Insights

1. **React Native transforms are pixel-only:** Cannot use percentage strings like CSS
2. **Guessing character widths doesn't work:** Too much variation between characters
3. **Dynamic measurement is required:** Must use `onLayout` or pre-measurement
4. **Timing matters:** RSVP playback is fast, measurement must be immediate

---

## Current State

### What's Implemented

- 40/60 asymmetric layout (40% for "before" text, 60% for "after" text)
- Crosshair at 40% of screen width
- ORP character absolutely positioned at `left: '40%'`
- Dynamic width measurement with `onLayout`
- Transform calculated as `-orpWidth / 2`

### What's Not Working

- User reports no visible change from previous attempts
- Either:
  - `onLayout` measurement isn't working correctly
  - Transform calculation is wrong
  - Timing issue with state updates
  - Something else fundamental I'm missing

### Files Modified

- `src/components/rsvp/RSVPWord.tsx` - ORP positioning logic
- `src/constants/typography.ts` - Font size reduced to 42pt

---

## Questions for Future Investigation

1. Is `onLayout` firing correctly? (Add console.log to verify)
2. Is `orpWidth` being set with correct values? (Log the width)
3. Does the transform actually update? (Log transform value)
4. Is there a better way to center absolutely positioned elements in React Native?
5. Should we try pre-measuring all characters on app load?
6. Can we use a monospace font specifically for the ORP character?
7. Is there a way to make transforms work with percentages in React Native?

---

## Recommendation

**Next steps to debug:**

1. Add logging to `onLayout` callback to see if it fires and what width it measures
2. Add logging to transform value to see what pixel shift is being applied
3. Try rendering a test screen with just the ORP character and its measured width displayed
4. Compare behavior across different characters ('i' vs 'W') to see if centering works differently
5. Consider asking in React Native community if there's a standard pattern for this

**Alternative approach to try:**

Accept that we can't perfectly center every character and instead:
- Position ORP left edge at 38% (slightly left of 40%)
- Let character extend right from there
- Most characters will appear roughly centered at 40%
- Wide characters will extend further right (acceptable)
- Narrow characters will appear slightly left (acceptable)
- Zero state management, zero measurement, zero flicker

This trades "perfect mathematical centering" for "good enough visual centering" with simpler code and zero performance overhead.
