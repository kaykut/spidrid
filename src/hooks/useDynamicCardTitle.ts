/**
 * Dynamic Card Title Hook
 *
 * Provides adaptive font sizing for card titles that automatically reduces
 * font size when text would truncate. Uses React Native's onTextLayout to
 * detect truncation and progressively reduce size through discrete tiers.
 *
 * Font sizes are pulled from existing design system tokens:
 * - 17pt: TYPOGRAPHY.cardTitle.fontSize (default)
 * - 15pt: TYPOGRAPHY.body.fontSize (reduced)
 * - 14pt: One tier down (minimal)
 *
 * Expected distribution:
 * - 70% of titles remain at 17pt
 * - 25% reduce to 15pt
 * - 5% reduce to 14pt
 */

import { useState, useCallback } from 'react';
import { NativeSyntheticEvent, TextLayoutEventData, TextStyle } from 'react-native';
import { TYPOGRAPHY } from '../constants/typography';
import { LINE_HEIGHTS } from '../constants/spacing';

const CARD_TITLE_SIZES = {
  default: 17,  // TYPOGRAPHY.cardTitle.fontSize
  reduced: 15,  // TYPOGRAPHY.body.fontSize
  minimal: 14,  // One tier down
} as const;

const CARD_TITLE_LINE_HEIGHTS = {
  default: 24,  // LINE_HEIGHTS.loose
  reduced: 22,  // LINE_HEIGHTS.relaxed
  minimal: 20,  // LINE_HEIGHTS.normal
} as const;

interface DynamicTitleStyle extends TextStyle {
  fontSize: number;
  lineHeight: number;
  fontWeight: '600';
}

/**
 * Hook to dynamically adjust card title font size based on text length.
 *
 * The hook measures rendered text and progressively reduces font size
 * if truncation is detected (text doesn't fit in 2 lines).
 *
 * @param text - The title text to render
 * @returns Object with titleStyle and onTextLayout callback
 *
 * @example
 * const { titleStyle, onTextLayout } = useDynamicCardTitle(item.title);
 *
 * <Text
 *   style={[cardBaseStyles.title, titleStyle, { color: theme.textColor }]}
 *   numberOfLines={2}
 *   ellipsizeMode="tail"
 *   onTextLayout={onTextLayout}
 * >
 *   {item.title}
 * </Text>
 */
export function useDynamicCardTitle(text: string) {
  const [titleStyle, setTitleStyle] = useState<DynamicTitleStyle>({
    fontSize: CARD_TITLE_SIZES.default,
    lineHeight: CARD_TITLE_LINE_HEIGHTS.default,
    fontWeight: '600',
  });

  const onTextLayout = useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      const { lines } = event.nativeEvent;

      // Check if text is truncated
      // Truncation occurs when:
      // 1. More than 2 lines are needed (overflow)
      // 2. Rendered text is shorter than original text (ellipsis applied)
      const allRenderedText = lines.map((line) => line.text).join('');
      const isTruncated =
        lines.length > 2 ||
        allRenderedText.trim().length < text.trim().length;

      if (!isTruncated) {
        return; // Fits perfectly, no adjustment needed
      }

      // Progressive size reduction through discrete tiers
      const currentSize = titleStyle.fontSize;

      if (currentSize === CARD_TITLE_SIZES.default) {
        // First reduction: 17pt → 15pt
        setTitleStyle({
          fontSize: CARD_TITLE_SIZES.reduced,
          lineHeight: CARD_TITLE_LINE_HEIGHTS.reduced,
          fontWeight: '600',
        });
      } else if (currentSize === CARD_TITLE_SIZES.reduced) {
        // Second reduction: 15pt → 14pt
        setTitleStyle({
          fontSize: CARD_TITLE_SIZES.minimal,
          lineHeight: CARD_TITLE_LINE_HEIGHTS.minimal,
          fontWeight: '600',
        });
      }
      // At minimal size (14pt), allow truncation as last resort
    },
    [text, titleStyle.fontSize]
  );

  return { titleStyle, onTextLayout };
}
