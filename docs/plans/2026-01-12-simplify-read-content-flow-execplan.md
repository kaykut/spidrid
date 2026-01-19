# Simplify Add Content Read Flow to Single Expandable Card

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with PLANS.md at the repository root.


## Purpose / Big Picture

Currently, when a user wants to import reading content (a webpage, pasted text, or ebook), they must navigate through multiple screens and modals: first tapping the "Read" card, then seeing another screen with 3 options, then interacting with yet another modal for input. This creates unnecessary friction for a simple task.

After this change, users will experience a streamlined single-screen flow. When they tap the "Read" card, it expands in-place to reveal three compact option cards ("A webpage", "Plain Text", "Epub & PDF"). Selecting URL or text shows an inline textbox right below the options—no additional modals. The user enters their content, taps a button, and is taken directly to the reader. This reduces the number of taps and cognitive load significantly.

To see it working: Open the app, navigate to the home screen, tap the floating action button to open the Add Content modal, tap the "Read" card, observe it expanding smoothly with three square cards. Tap "A webpage", see a URL input field appear below. Enter a valid URL, tap "Import", and observe navigation to the content reader with the article loaded.


## Progress

- [x] (2026-01-12) Create ExpandableReadCard component in src/components/addContent/
- [x] (2026-01-12) Update add-content.tsx to use the new component
- [x] (2026-01-12) Update contentExtractor.ts to extract title from first line of pasted text
- [x] (2026-01-12) Clean up: remove ReadContent import, delete ReadContent.tsx, update index.ts exports
- [ ] Test all import flows (URL, text, ebook) - TypeScript compiles, manual testing needed
- [ ] Verify animations are smooth - manual testing needed


## Surprises & Discoveries

(To be filled during implementation)


## Decision Log

- Decision: Use clipboard icon for "Plain Text" option
  Rationale: User selected this option when asked; clipboard represents paste action better than the current document/edit icon
  Date/Author: 2026-01-12, User

- Decision: Textbox appears below the 3 option cards (cards stay visible)
  Rationale: User selected this layout; allows easy switching between options without losing context
  Date/Author: 2026-01-12, User

- Decision: Navigate to content reader after successful import
  Rationale: User selected this behavior; provides immediate feedback and allows reading right away
  Date/Author: 2026-01-12, User

- Decision: Extract title from first line of pasted text (until first newline)
  Rationale: Eliminates need for separate title field; first line is typically a natural title
  Date/Author: 2026-01-12, User requirement

- Decision: Create ExpandableReadCard as a separate component
  Rationale: User requested componentization for better code organization and maintainability; follows pattern of other addContent components
  Date/Author: 2026-01-12, User


## Outcomes & Retrospective

(To be filled after implementation)


## Context and Orientation

This is a React Native (Expo) speed reading app called Devoro. The relevant navigation and component structure is as follows:

The Add Content modal lives at `src/app/add-content.tsx`. It uses a level-based navigation system where `level` can be `'menu'`, `'read'`, or `'learn'`. The menu shows three cards (Read, Learn, Practice). Read and Learn navigate to sub-views, while Practice is already expandable in-place.

The Practice card expansion pattern is the model to follow. It uses:
- A state variable `isPracticeExpanded` to track expansion
- An `Animated.Value` for chevron rotation (0 to 90 degrees over 200ms)
- The `animateLayout()` function from `src/constants/animations.ts` which triggers a 300ms LayoutAnimation for smooth height changes

The current Read flow uses `src/components/addContent/ReadContent.tsx`, which displays 3 cards (URL, Paste Text, E-book) that each open slide-up modals for input. This component will be replaced by the new `ExpandableReadCard` component.

Content extraction happens in `src/services/contentExtractor.ts`. The `extractFromUrl()` function already has title detection (HTML title tag → Open Graph tag → domain fallback). The `createFromText()` function currently accepts an optional title parameter; we will modify it to extract the title from the first line if not provided.

Key design system tokens (all from `src/constants/spacing.ts`, `src/constants/typography.ts`, `src/data/themes.ts`):
- SPACING: xxs=2, xs=4, sm=8, md=16, lg=24, xl=32
- COMPONENT_RADIUS: card=16, chip=8, input=12, button=12
- SIZES: touchTarget=44, iconLg=24, iconXl=32, iconMd=20
- JOURNEY_COLORS: accent (coral red for Read card)


## Plan of Work

The work proceeds in a single milestone since all changes are tightly coupled and the feature is not usable until complete.

First, we create a new component `src/components/addContent/ExpandableReadCard.tsx`. This component encapsulates all the Read card logic: expansion state, chevron animation, the three option cards, inline textbox, and import handlers. It receives callbacks from the parent for closing the modal and for coordinating collapse with other expandable cards (Practice).

The component manages its own internal state for expansion (`isExpanded`), selected option (`readOption`), input value (`inputValue`), and loading state (`isLoading`). It exposes an `onExpandChange` callback so the parent can coordinate mutual exclusivity with the Practice card. It also accepts `isExpanded` as a prop so the parent can force collapse when needed.

The component follows the same visual pattern as the Practice card: a touchable header row with icon, text, and animated chevron, followed by expanded content that renders conditionally. The expanded content contains a row of three square cards (width calculated based on screen dimensions) and, when URL or Text is selected, an inline TextInput with a submit button below.

Next, we modify `src/app/add-content.tsx` to use the new component. We remove the 'read' entry from `MENU_OPTIONS`, update `ContentLevel` type to remove 'read', remove the `ReadContent` import and its case from `renderContent()`. We import `ExpandableReadCard` and render it in the menu view before the Learn card. We pass the necessary props for modal closing and expansion coordination.

In `src/services/contentExtractor.ts`, we modify `createFromText()` to extract the title from the first line of text (up to the first newline character), truncating at 50 characters with ellipsis if needed.

Finally, we clean up by deleting `src/components/addContent/ReadContent.tsx` and updating `src/components/addContent/index.ts` to export `ExpandableReadCard` instead of `ReadContent`.


## Concrete Steps

All commands run from the repository root `/Users/kaya/Coding/devoro`.

Step 1: Create `src/components/addContent/ExpandableReadCard.tsx`

This new component contains all the Read card functionality:

    import { useState, useRef, useEffect } from 'react';
    import {
      View,
      Text,
      StyleSheet,
      TouchableOpacity,
      TextInput,
      ActivityIndicator,
      Alert,
      Keyboard,
      Dimensions,
      Animated,
    } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';
    import { router } from 'expo-router';
    import * as DocumentPicker from 'expo-document-picker';
    import { useTheme } from '../common/ThemeProvider';
    import { animateLayout } from '../../constants/animations';
    import { SPACING, COMPONENT_RADIUS, SIZES } from '../../constants/spacing';
    import { TYPOGRAPHY } from '../../constants/typography';
    import { JOURNEY_COLORS } from '../../data/themes';
    import { extractFromUrl, createFromText, extractFromEbook } from '../../services/contentExtractor';
    import { useContentStore } from '../../store/contentStore';
    import { useSubscriptionStore } from '../../store/subscriptionStore';
    import { Paywall } from '../paywall/Paywall';
    import { usePdfExtractor } from '../PdfExtractorProvider';

    const READ_OPTIONS = [
      { id: 'url', icon: 'link-outline', label: 'A webpage' },
      { id: 'text', icon: 'clipboard-outline', label: 'Plain Text' },
      { id: 'ebook', icon: 'book-outline', label: 'Epub & PDF' },
    ] as const;

    type ReadOptionId = typeof READ_OPTIONS[number]['id'];

    interface ExpandableReadCardProps {
      isExpanded: boolean;
      onExpandChange: (expanded: boolean) => void;
      onClose: () => void;
    }

    const getReadOptionCardWidth = () => {
      const screenWidth = Dimensions.get('window').width;
      return (screenWidth - SPACING.lg * 2 - SPACING.md * 2 - SPACING.sm * 2) / 3;
    };

    export function ExpandableReadCard({ isExpanded, onExpandChange, onClose }: ExpandableReadCardProps) {
      const { theme } = useTheme();
      const { extractPdf } = usePdfExtractor();
      const { addContent } = useContentStore();
      const { canAccessContent, incrementContentCount, isPremium } = useSubscriptionStore();

      const [readOption, setReadOption] = useState<ReadOptionId | null>(null);
      const [inputValue, setInputValue] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [showPaywall, setShowPaywall] = useState(false);

      const rotateAnim = useRef(new Animated.Value(0)).current;
      const readOptionCardWidth = getReadOptionCardWidth();

      useEffect(() => {
        Animated.timing(rotateAnim, {
          toValue: isExpanded ? 1 : 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }, [isExpanded, rotateAnim]);

      const chevronRotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
      });

      const handleToggle = () => {
        animateLayout();
        const newExpanded = !isExpanded;
        onExpandChange(newExpanded);
        if (!newExpanded) {
          setReadOption(null);
          setInputValue('');
          Keyboard.dismiss();
        }
      };

      const handleOptionPress = async (optionId: ReadOptionId) => {
        if (optionId === 'ebook') {
          await handlePickEbook();
          return;
        }
        animateLayout();
        if (readOption === optionId) {
          setReadOption(null);
          setInputValue('');
        } else {
          setReadOption(optionId);
          setInputValue('');
        }
      };

      const checkImportLimit = (): boolean => {
        if (isPremium) return true;
        if (!canAccessContent()) {
          setShowPaywall(true);
          return false;
        }
        return true;
      };

      const handleImportSuccess = (contentId: string) => {
        if (!isPremium) {
          incrementContentCount();
        }
        setReadOption(null);
        setInputValue('');
        onExpandChange(false);
        onClose();
        router.push(`/content/${contentId}`);
      };

      const handleImportUrl = async () => {
        if (!inputValue.trim() || !checkImportLimit()) return;
        setIsLoading(true);
        const result = await extractFromUrl(inputValue.trim());
        setIsLoading(false);
        if (result.success && result.content) {
          const saved = addContent(result.content);
          handleImportSuccess(saved.id);
        } else {
          Alert.alert('Import Failed', result.error || 'Could not extract content from URL');
        }
      };

      const handleImportText = () => {
        if (!inputValue.trim() || !checkImportLimit()) return;
        const result = createFromText(inputValue.trim());
        if (result.success && result.content) {
          const saved = addContent(result.content);
          handleImportSuccess(saved.id);
        } else {
          Alert.alert('Import Failed', result.error || 'Could not process text');
        }
      };

      const handlePickEbook = async () => {
        try {
          const result = await DocumentPicker.getDocumentAsync({
            type: ['application/epub+zip', 'application/pdf', 'application/x-mobipocket-ebook'],
            copyToCacheDirectory: true,
          });
          if (result.canceled || !checkImportLimit()) return;
          const asset = result.assets[0];
          setIsLoading(true);
          const importResult = await extractFromEbook(asset.uri, asset.name, { pdfExtractor: extractPdf });
          setIsLoading(false);
          if (importResult.success && importResult.content) {
            const saved = addContent(importResult.content);
            handleImportSuccess(saved.id);
          } else {
            Alert.alert('Import Failed', importResult.error || 'Could not extract content');
          }
        } catch {
          setIsLoading(false);
          Alert.alert('Error', 'Failed to pick document');
        }
      };

      return (
        <>
          <Paywall visible={showPaywall} onClose={() => setShowPaywall(false)} reason="content_limit" />
          <View
            style={[
              styles.cardWrapper,
              { backgroundColor: theme.secondaryBackground },
              isExpanded && styles.cardExpanded,
            ]}
          >
            <TouchableOpacity style={styles.cardHeader} onPress={handleToggle} activeOpacity={0.7}>
              <View style={[styles.iconContainer, { backgroundColor: `${JOURNEY_COLORS.accent}20` }]}>
                <Ionicons name="book-outline" size={SIZES.iconLg} color={JOURNEY_COLORS.accent} />
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.title, { color: theme.textColor }]}>Read</Text>
                <Text style={[styles.description, { color: theme.textColor }]}>
                  Speed read your own articles or books from PDFs, EPUBs, or links
                </Text>
              </View>
              <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
                <Ionicons name="chevron-forward" size={SIZES.iconMd} color={theme.textColor} style={styles.chevron} />
              </Animated.View>
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.expandedContent}>
                <View style={styles.optionRow}>
                  {READ_OPTIONS.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.optionCard,
                        {
                          width: readOptionCardWidth,
                          height: readOptionCardWidth,
                          backgroundColor: theme.backgroundColor,
                        },
                        readOption === option.id && styles.optionCardSelected,
                        readOption === option.id && { borderColor: JOURNEY_COLORS.accent },
                      ]}
                      onPress={() => handleOptionPress(option.id)}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={option.icon as keyof typeof Ionicons.glyphMap}
                        size={SIZES.iconXl}
                        color={readOption === option.id ? JOURNEY_COLORS.accent : theme.textColor}
                      />
                      <Text
                        style={[
                          styles.optionLabel,
                          { color: readOption === option.id ? JOURNEY_COLORS.accent : theme.textColor },
                        ]}
                        numberOfLines={2}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {(readOption === 'url' || readOption === 'text') && (
                  <View style={styles.inputContainer}>
                    {readOption === 'url' ? (
                      <TextInput
                        style={[styles.input, { backgroundColor: theme.backgroundColor, color: theme.textColor }]}
                        placeholder="Enter URL (e.g., https://example.com/article)"
                        placeholderTextColor={`${theme.textColor}60`}
                        value={inputValue}
                        onChangeText={setInputValue}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="url"
                        returnKeyType="go"
                        onSubmitEditing={handleImportUrl}
                      />
                    ) : (
                      <TextInput
                        style={[styles.textArea, { backgroundColor: theme.backgroundColor, color: theme.textColor }]}
                        placeholder="Paste your text here..."
                        placeholderTextColor={`${theme.textColor}60`}
                        value={inputValue}
                        onChangeText={setInputValue}
                        multiline
                        textAlignVertical="top"
                      />
                    )}
                    <TouchableOpacity
                      style={[
                        styles.submitButton,
                        { backgroundColor: JOURNEY_COLORS.accent },
                        (isLoading || !inputValue.trim()) && styles.submitButtonDisabled,
                      ]}
                      onPress={readOption === 'url' ? handleImportUrl : handleImportText}
                      disabled={isLoading || !inputValue.trim()}
                    >
                      {isLoading ? (
                        <ActivityIndicator color={JOURNEY_COLORS.textPrimary} />
                      ) : (
                        <Text style={styles.submitButtonText}>
                          {readOption === 'url' ? 'Import' : 'Save & Read'}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        </>
      );
    }

    const styles = StyleSheet.create({
      cardWrapper: {
        borderRadius: COMPONENT_RADIUS.card,
        overflow: 'hidden',
      },
      cardExpanded: {
        paddingBottom: SPACING.md,
      },
      cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.lg,
      },
      iconContainer: {
        width: SIZES.touchTarget,
        height: SIZES.touchTarget,
        borderRadius: COMPONENT_RADIUS.badge,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.md,
      },
      textContainer: {
        flex: 1,
      },
      title: {
        ...TYPOGRAPHY.cardSubtitle,
        fontWeight: '600',
        marginBottom: SPACING.xs,
      },
      description: {
        ...TYPOGRAPHY.body,
        opacity: 0.7,
      },
      chevron: {
        opacity: 0.5,
        marginLeft: SPACING.sm,
      },
      expandedContent: {
        paddingHorizontal: SPACING.md,
      },
      optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.sm,
      },
      optionCard: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: COMPONENT_RADIUS.chip,
        borderWidth: 2,
        borderColor: 'transparent',
        gap: SPACING.sm,
      },
      optionCardSelected: {
        borderWidth: 2,
      },
      optionLabel: {
        ...TYPOGRAPHY.caption,
        textAlign: 'center',
      },
      inputContainer: {
        marginTop: SPACING.md,
        gap: SPACING.sm,
      },
      input: {
        padding: SPACING.md,
        borderRadius: COMPONENT_RADIUS.input,
        ...TYPOGRAPHY.body,
      },
      textArea: {
        padding: SPACING.md,
        borderRadius: COMPONENT_RADIUS.input,
        ...TYPOGRAPHY.body,
        height: 120,
      },
      submitButton: {
        paddingVertical: SPACING.md,
        borderRadius: COMPONENT_RADIUS.button,
        alignItems: 'center',
      },
      submitButtonDisabled: {
        opacity: 0.6,
      },
      submitButtonText: {
        color: JOURNEY_COLORS.textPrimary,
        ...TYPOGRAPHY.button,
      },
    });

Step 2: Update `src/components/addContent/index.ts`

Replace ReadContent export with ExpandableReadCard:

    // Change from:
    export { ReadContent } from './ReadContent';
    export { LearnContent } from './LearnContent';
    export { MiniTopicCard } from './MiniTopicCard';
    // To:
    export { ExpandableReadCard } from './ExpandableReadCard';
    export { LearnContent } from './LearnContent';
    export { MiniTopicCard } from './MiniTopicCard';

Step 3: Update `src/app/add-content.tsx`

Update imports:

    // Change from:
    import { ReadContent, LearnContent, MiniTopicCard } from '../components/addContent';
    // To:
    import { ExpandableReadCard, LearnContent, MiniTopicCard } from '../components/addContent';

Update ContentLevel type:

    // Change from:
    type ContentLevel = 'menu' | 'read' | 'learn';
    // To:
    type ContentLevel = 'menu' | 'learn';

Update MENU_OPTIONS to only contain 'learn':

    const MENU_OPTIONS: MenuOption[] = [
      {
        id: 'learn',
        title: 'Learn',
        description: 'Generate articles or curricula on topics you want to master',
        icon: 'brain-outline',
        iconColor: JOURNEY_COLORS.success,
      },
    ];

Add state for Read card expansion coordination:

    const [isReadExpanded, setIsReadExpanded] = useState(false);

Update togglePracticeExpanded to collapse Read:

    const togglePracticeExpanded = () => {
      if (isReadExpanded) {
        animateLayout();
        setIsReadExpanded(false);
      }
      animateLayout();
      setIsPracticeExpanded((prev) => !prev);
    };

Add handler for Read expansion change:

    const handleReadExpandChange = (expanded: boolean) => {
      if (expanded && isPracticeExpanded) {
        animateLayout();
        setIsPracticeExpanded(false);
      }
      setIsReadExpanded(expanded);
    };

Update handleOutsidePress to reset Read:

    const handleOutsidePress = () => {
      if (isPracticeExpanded) {
        animateLayout();
        setIsPracticeExpanded(false);
      }
      if (isReadExpanded) {
        animateLayout();
        setIsReadExpanded(false);
      }
    };

Update handleOptionPress to collapse Read when navigating to Learn:

    const handleOptionPress = (optionId: ContentLevel) => {
      if (isPracticeExpanded) {
        animateLayout();
        setIsPracticeExpanded(false);
      }
      if (isReadExpanded) {
        animateLayout();
        setIsReadExpanded(false);
      }
      setLevel(optionId);
    };

Remove 'read' case from getTitle (only 'learn' and default remain).

In renderContent, remove the 'read' case. In the default case, add `keyboardShouldPersistTaps="handled"` to ScrollView and add the ExpandableReadCard before MENU_OPTIONS.map:

    default:
      return (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <ScrollView
            style={styles.menuContainer}
            contentContainerStyle={styles.menuContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Expandable Read Card */}
            <ExpandableReadCard
              isExpanded={isReadExpanded}
              onExpandChange={handleReadExpandChange}
              onClose={handleClose}
            />

            {/* Learn card */}
            {MENU_OPTIONS.map((option) => (
              // ... existing Learn card JSX
            ))}

            {/* Expandable Practice Card */}
            {/* ... existing Practice card JSX */}
          </ScrollView>
        </TouchableWithoutFeedback>
      );

Step 4: Update `src/services/contentExtractor.ts`

Locate the `createFromText` function (around line 268). Update the title generation logic to extract from first line:

    export function createFromText(text: string, title?: string): ContentImportResult {
      const trimmedText = text.trim();

      if (trimmedText.length < 20) {
        return {
          success: false,
          error: 'Text is too short (minimum 20 characters)',
        };
      }

      const wordCount = countWords(trimmedText);

      let generatedTitle = title;
      if (!generatedTitle) {
        const firstLine = trimmedText.split('\n')[0].trim();
        if (firstLine.length > 50) {
          const truncated = firstLine.substring(0, 50);
          const lastSpace = truncated.lastIndexOf(' ');
          generatedTitle = lastSpace > 30 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
        } else if (firstLine.length > 0) {
          generatedTitle = firstLine;
        } else {
          generatedTitle = 'Pasted Text';
        }
      }

      return {
        success: true,
        content: {
          id: '',
          title: generatedTitle,
          content: trimmedText,
          wordCount,
          source: 'text',
          createdAt: 0,
          readProgress: 0,
        },
      };
    }

Step 5: Delete `src/components/addContent/ReadContent.tsx`

Remove the file entirely as it is replaced by ExpandableReadCard.

Step 6: Run the app and verify

    npx expo start

Open the app on iOS simulator or device. Navigate to home screen. Tap the FAB to open Add Content modal. Verify the Read card appears with a chevron. Tap Read and verify smooth expansion with 3 square cards. Tap "A webpage" and verify URL input appears below. Enter a test URL and tap Import. Verify navigation to content reader.


## Validation and Acceptance

1. Visual verification: Tap Read card, observe smooth expansion animation (300ms) and chevron rotation (200ms, 0→90 degrees). The 3 square cards should be equally sized and fit in one row.

2. URL import: Select "A webpage", enter `https://example.com` or any valid article URL, tap Import. Expect: Loading indicator appears, then navigation to `/content/[id]` with article title extracted from page.

3. Text paste: Select "Plain Text", paste multi-line text starting with "My Test Title\n\nSome content here...". Tap "Save & Read". Expect: Navigation to reader with title "My Test Title".

4. Title extraction edge case: Paste text with a very long first line (80+ characters). Expect: Title truncated at word boundary near 50 chars with "..." suffix.

5. Ebook import: Select "Epub & PDF", pick a test PDF or EPUB file. Expect: Loading indicator, then navigation to reader with extracted content.

6. Mutual exclusivity: Expand Read card, then tap Practice card. Expect: Read collapses, Practice expands. Reverse should also work.

7. Collapse on outside tap: Expand Read card, tap empty area of ScrollView. Expect: Read card collapses.

8. Subscription limit: If testing free tier, import content up to limit, then try another import. Expect: Paywall appears.

Run TypeScript check:

    npx tsc --noEmit

Expect: No errors related to modified files.


## Idempotence and Recovery

All changes are additive code modifications except for the file deletion. If implementation is interrupted:
- The git working tree shows all modified files via `git status`
- `git checkout -- <file>` can restore any file to its previous state
- The deleted ReadContent.tsx can be restored via `git checkout -- src/components/addContent/ReadContent.tsx`

The changes do not affect any database, stored user data, or require migrations. Re-running the app after any partial implementation will show the current state of the UI.


## Artifacts and Notes

Key file paths:
- `src/components/addContent/ExpandableReadCard.tsx` - New component (to be created)
- `src/app/add-content.tsx` - Main modal component (update to use new component)
- `src/services/contentExtractor.ts` - Content extraction service (minor title logic update)
- `src/components/addContent/index.ts` - Component exports (replace ReadContent with ExpandableReadCard)
- `src/components/addContent/ReadContent.tsx` - To be deleted
- `src/constants/animations.ts` - Reference for animateLayout() pattern (read-only)
- `src/constants/spacing.ts` - Design tokens (read-only)
- `src/data/themes.ts` - Color tokens (read-only)


## Interfaces and Dependencies

No new external dependencies are required. All imports are from existing packages already in the project.

New component interface:

    interface ExpandableReadCardProps {
      isExpanded: boolean;           // Controlled expansion state from parent
      onExpandChange: (expanded: boolean) => void;  // Callback when expansion changes
      onClose: () => void;           // Callback to close the modal after successful import
    }

Existing interfaces remain unchanged:
- `extractFromUrl(url: string): Promise<ContentImportResult>` - Already exists, extracts content from URL with title detection
- `createFromText(text: string, title?: string): ContentImportResult` - Modified to extract title from first line when title not provided
- `extractFromEbook(uri: string, name: string, options): Promise<ContentImportResult>` - Already exists, handles PDF/EPUB extraction
- `useContentStore().addContent(content): SavedContent` - Already exists, persists content
- `animateLayout(): void` - Already exists in `src/constants/animations.ts`, triggers LayoutAnimation


---

Revision note (2026-01-12): Updated plan to extract the expandable Read card into a separate component (`ExpandableReadCard.tsx`) rather than embedding all logic inline in `add-content.tsx`. This improves code organization and maintainability, following the pattern of other addContent components.
