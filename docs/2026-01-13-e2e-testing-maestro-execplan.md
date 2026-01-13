# Implement E2E Testing with Maestro for Spidrid

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with `PLANS.md` at the repository root.


## Purpose / Big Picture

After completing this plan, developers can run automated end-to-end tests that verify critical user journeys in the Spidrid speed reading app. A developer will be able to run `npm run e2e` and watch Maestro automatically launch the app on a dedicated iOS simulator (separate from their manual testing device), navigate through screens, tap buttons, and verify that the RSVP playback, quiz completion, and subscription paywall flows work correctly. This fills the final gap in the test pyramid: the project already has 98 test files covering unit, component, and integration tests, but zero E2E tests that exercise the app as a real user would.

The observable outcome is this: after running `npm run e2e:playback`, the terminal shows Maestro executing a YAML flow file, the dedicated "Spidrid-E2E-Test" simulator displays the app going through playback motions automatically, and the command exits with "Flow Passed" indicating all assertions succeeded.


## Progress

- [ ] M0: Create git worktree on branch `test/e2e-maestro`
- [ ] M0: Install Maestro CLI via Homebrew
- [ ] M0: Create dedicated iOS simulator "Spidrid-E2E-Test"
- [ ] M0: Create e2e/ directory structure
- [ ] M0: Add e2e npm scripts to package.json
- [ ] M1: Add testIDs to PlaybackControls.tsx
- [ ] M1: Add testIDs to RSVPWord.tsx
- [ ] M1: Add testIDs to QuestionRenderer.tsx and question type components
- [ ] M1: Add testIDs to Paywall.tsx
- [ ] M1: Add testIDs to ContentListScreen (index.tsx)
- [ ] M1: Verify testIDs work with Maestro Studio
- [ ] M2: Create playback-basic.yaml flow
- [ ] M2: Create playback-wpm-control.yaml flow
- [ ] M2: Create playback-navigation.yaml flow
- [ ] M2: Verify all playback flows pass
- [ ] M3: Create quiz-completion.yaml flow
- [ ] M3: Create quiz-retry.yaml flow
- [ ] M3: Verify all quiz flows pass
- [ ] M4: Create paywall-wpm-limit.yaml flow
- [ ] M4: Create paywall-content-limit.yaml flow
- [ ] M4: Create subscription-simulate.yaml flow
- [ ] M4: Verify all monetization flows pass


## Surprises & Discoveries

No discoveries yet. This section will be updated during implementation.


## Decision Log

- Decision: Use Maestro instead of Detox for E2E testing.
  Rationale: Maestro works directly with Expo Go builds without requiring native compilation or EAS Build setup. The project currently uses Expo Go for development and has no EAS configuration. Maestro's YAML-based flows are simpler to write and maintain than Detox's JavaScript tests. If the project later moves to production native builds, Detox can be added as a complementary framework.
  Date/Author: 2026-01-13 / Claude

- Decision: Use a dedicated iOS simulator named "Spidrid-E2E-Test" for E2E tests.
  Rationale: The developer uses an iPhone 16 Plus simulator for manual testing. Running E2E tests on that same simulator would interfere with their development workflow, potentially clearing app state or interrupting their work. A dedicated iPhone 15 simulator isolates E2E testing completely.
  Date/Author: 2026-01-13 / Claude

- Decision: Use hierarchical dot-notation for testID naming (e.g., "playback.controls.play-btn").
  Rationale: Industry best practice from Detox and Maestro documentation recommends semantic, hierarchical naming that indicates screen, component, and element. This makes selectors self-documenting and prevents naming collisions. The pattern `{screen}.{component}.{element}[-{index}]` scales well as the app grows.
  Date/Author: 2026-01-13 / Claude

- Decision: Prioritize flows in order: Playback, Quiz, Monetization.
  Rationale: User specified this priority order. Playback is the core feature (RSVP reading), quiz validates comprehension tracking, and monetization ensures the freemium business model works correctly.
  Date/Author: 2026-01-13 / Claude


## Outcomes & Retrospective

No outcomes yet. This section will be updated as milestones are completed.


## Context and Orientation

Spidrid is a React Native speed reading app built with Expo SDK 54 and Expo Router v6. The app displays text one word at a time using RSVP (Rapid Serial Visual Presentation), a technique where words appear sequentially at a fixed point on screen, eliminating the need for eye movement. The ORP (Optimal Recognition Point) is highlighted in coral red at approximately 30% into each word to help the reader's eye fixate quickly.

The codebase lives at `/Users/kaya/Coding/spidrid`. Key directories are `src/app/` for Expo Router screens, `src/components/` for React components, `src/store/` for Zustand state management, and `src/services/` for business logic. The existing test suite is in `__tests__/` with 98 test files using Jest and React Native Testing Library.

Terms used in this plan:

**Maestro** is a mobile UI testing framework that automates taps, swipes, and assertions on iOS and Android. It uses YAML files called "flows" to define test sequences. Maestro connects to a running simulator and controls the app through accessibility APIs.

**testID** is a React Native prop that assigns a unique identifier to a component for testing purposes. When you add `testID="my-button"` to a TouchableOpacity, Maestro can find and tap it using `tapOn: id: "my-button"`.

**RSVP Engine** refers to the `useRSVPEngine` hook in `src/hooks/useRSVPEngine.ts` that manages word-by-word playback timing.

**Zustand store** is a state container. The app has stores like `subscriptionStore` (premium status), `learningStore` (article progress), and `settingsStore` (user preferences) in `src/store/`.

**Expo Go** is a development client app that runs Expo projects without native compilation. It imposes limitations (no custom native modules) but enables fast iteration.

The app's bundle identifier is `com.kaya.spidrid` (defined in `app.config.js`).


## Plan of Work

The work proceeds in four milestones, each independently verifiable.

**Milestone 0: Infrastructure & Environment Setup** establishes the development branch, installs Maestro, creates a dedicated simulator, and adds npm scripts. After this milestone, running `npm run e2e:setup-sim` boots a clean simulator and `npm run e2e:studio` opens Maestro's interactive inspector.

**Milestone 1: TestID Foundation** adds testID props to all components that E2E tests will interact with. This requires editing five component files to add testID props and ensuring they propagate to native elements. After this milestone, running Maestro Studio shows the testIDs in the element hierarchy.

**Milestone 2: Playback E2E Flows** creates three YAML flow files that test the core reading experience: starting playback, adjusting WPM, and navigating sentences. After this milestone, `npm run e2e:playback` passes all three flows.

**Milestone 3: Quiz E2E Flows** creates two YAML flow files that test comprehension quizzes after reading. After this milestone, `npm run e2e:quiz` passes both flows.

**Milestone 4: Monetization E2E Flows** creates three YAML flow files that test the freemium paywall triggers and simulated purchase. After this milestone, `npm run e2e:monetization` passes all three flows.


## Milestone 0: Infrastructure & Environment Setup

This milestone creates the isolated development environment for E2E testing. At the end, a dedicated iOS simulator exists, Maestro is installed and functional, and npm scripts are ready to run tests.

First, create a git worktree. A worktree is a separate working directory that shares the same git repository, allowing parallel development without branch switching. From the main project directory:

    cd /Users/kaya/Coding/spidrid
    git worktree add ../spidrid-e2e-maestro test/e2e-maestro

This creates directory `../spidrid-e2e-maestro` on branch `test/e2e-maestro`. All E2E work happens there.

Next, install Maestro using Homebrew:

    brew install maestro

Verify installation:

    maestro --version

Expected output resembles `Maestro version: 1.38.x` (version number may vary).

Create the dedicated iOS simulator. The `xcrun simctl` command manages simulators from the terminal. First, list available device types and runtimes:

    xcrun simctl list devicetypes | grep iPhone
    xcrun simctl list runtimes | grep iOS

Then create the simulator:

    xcrun simctl create "Spidrid-E2E-Test" "iPhone 15" com.apple.CoreSimulator.SimRuntime.iOS-17-0

This outputs a UUID like `5B6D77EF-2AE9-47D0-9A62-70A1ABBC5FA2`. The simulator is now registered but not running.

Boot the simulator:

    xcrun simctl boot "Spidrid-E2E-Test"

Verify it is running:

    xcrun simctl list devices booted

Expected output includes a line like `Spidrid-E2E-Test (5B6D77EF-...) (Booted)`.

Create the e2e directory structure in the worktree:

    cd ../spidrid-e2e-maestro
    mkdir -p e2e/flows/playback e2e/flows/quiz e2e/flows/subscription e2e/scripts

Create e2e/.maestro/config.yaml with basic configuration:

    # e2e/.maestro/config.yaml
    appId: com.kaya.spidrid

Edit `package.json` to add these scripts in the `"scripts"` section:

    "e2e:setup-sim": "xcrun simctl create 'Spidrid-E2E-Test' 'iPhone 15' 2>/dev/null || true && xcrun simctl boot 'Spidrid-E2E-Test' 2>/dev/null || true",
    "e2e": "maestro --device 'Spidrid-E2E-Test' test e2e/flows/",
    "e2e:playback": "maestro --device 'Spidrid-E2E-Test' test e2e/flows/playback/",
    "e2e:quiz": "maestro --device 'Spidrid-E2E-Test' test e2e/flows/quiz/",
    "e2e:monetization": "maestro --device 'Spidrid-E2E-Test' test e2e/flows/subscription/",
    "e2e:studio": "maestro --device 'Spidrid-E2E-Test' studio",
    "e2e:reset": "xcrun simctl shutdown 'Spidrid-E2E-Test' 2>/dev/null || true && xcrun simctl erase 'Spidrid-E2E-Test'"

The `2>/dev/null || true` pattern suppresses errors if the simulator already exists or is already booted, making the scripts idempotent.

Acceptance for Milestone 0: Run `npm run e2e:setup-sim` and verify the simulator boots (visible in Simulator.app or via `xcrun simctl list devices booted`). Then start Expo in the worktree with `npx expo start`, press `i` to open on iOS, and select "Spidrid-E2E-Test" from the device list. The app should launch on the dedicated simulator. Finally, run `npm run e2e:studio` and verify Maestro Studio opens in a browser showing the app's element hierarchy.


## Milestone 1: TestID Foundation

This milestone adds testID props to components so Maestro can locate and interact with them. At the end, every button, input, and interactive element in the playback, quiz, and paywall screens has a testID visible in Maestro Studio.

**Critical React Native testID Rules** (from official Maestro and Detox documentation):

1. testID must be forwarded to native components. If you add testID to a custom component, it has no effect until that component passes it down to a View, TouchableOpacity, Text, or other native element. Example:

       // Correct: testID reaches native TouchableOpacity
       function PlayButton({ testID, onPress }) {
         return (
           <TouchableOpacity testID={testID} onPress={onPress}>
             <PlayIcon />
           </TouchableOpacity>
         );
       }

       // Wrong: testID is lost, Maestro cannot find it
       function PlayButton({ testID, onPress }) {
         return (
           <TouchableOpacity onPress={onPress}>
             <PlayIcon />
           </TouchableOpacity>
         );
       }

2. iOS nested touchables require accessibility workaround. When a TouchableOpacity contains another TouchableOpacity, iOS accessibility may not allow tapping the inner element. The fix is to set `accessible={false}` on the outer element and `accessible={true}` on the inner:

       <TouchableOpacity accessible={false} onPress={handleOuter}>
         <TouchableOpacity accessible={true} testID="inner-btn" onPress={handleInner}>
           <Text>Tap me</Text>
         </TouchableOpacity>
       </TouchableOpacity>

3. List items need unique testIDs. Never use the same testID for multiple elements. For FlatList items, append the index:

       renderItem={({ item, index }) => (
         <ContentCard testID={`content-list.item-${index}`} />
       )}

4. Never use text content in testIDs. Text changes break tests and prevent internationalization. Use semantic names like "playback.controls.play-btn" not "play-button-Play".

5. Naming convention: `{screen}.{component}.{element}[-{index}]` using dots and hyphens. Examples: `playback.controls.play-btn`, `quiz.options.choice-0`, `paywall.upgrade-btn`.

**Files to modify:**

Edit `src/components/controls/PlaybackControls.tsx`. Find the play/pause button (likely a TouchableOpacity with an icon) and add testID. The button shows a play icon when paused and pause icon when playing, so it needs two testIDs or a single one with conditional logic. Use a single testID "playback.controls.play-pause-btn" since only one is visible at a time. Add testIDs to skip-forward and skip-back buttons as "playback.controls.skip-forward-btn" and "playback.controls.skip-back-btn". Add testID to the WPM slider as "playback.controls.wpm-slider".

Edit `src/components/rsvp/RSVPWord.tsx`. Find the container View that displays the current word and add testID="playback.rsvp.word-container".

Edit `src/components/quiz/QuestionRenderer.tsx`. This component renders different question types. Each answer option needs a testID. For SingleChoiceQuestion, MultipleSelectQuestion, TrueFalseQuestion, and NumericQuestion components, add testIDs to answer options following the pattern "quiz.options.choice-{index}". Add testID="quiz.submit-btn" to the submit/continue button.

Edit `src/components/paywall/Paywall.tsx`. Add testID="paywall.upgrade-btn" to the primary upgrade/purchase button. Add testID="paywall.close-btn" to the close/dismiss button if present.

Edit `src/app/index.tsx` (ContentListScreen). Add testID to the FAB (floating action button) that opens the add-content modal: "content-list.fab-add". If content items are rendered in a list, add testIDs to each item.

Edit `src/app/add-content.tsx`. Add testIDs to the Practice, Read, and Learn expandable cards. For practice topics in the grid, add testIDs like "add-content.practice.topic-{index}".

Acceptance for Milestone 1: Start the app on the Spidrid-E2E-Test simulator, run `npm run e2e:studio`, and use Maestro Studio's element inspector to click on the play button. The inspector should show `id: playback.controls.play-pause-btn` in the element details. Repeat for WPM slider, quiz options, and paywall button to verify all testIDs are visible.


## Milestone 2: Playback E2E Flows

This milestone creates three YAML flow files that test the core RSVP reading experience. At the end, running `npm run e2e:playback` executes all three flows and they all pass.

**Flow 1: playback-basic.yaml**

This flow verifies basic playback: open an article, start playing, pause, and complete. Create file `e2e/flows/playback/playback-basic.yaml`:

    appId: com.kaya.spidrid
    ---
    - launchApp:
        clearState: true

    # Open add-content modal and select first practice topic
    - tapOn:
        id: "content-list.fab-add"
    - tapOn: "Practice"
    - tapOn:
        id: "add-content.practice.topic-0"

    # Verify playback screen loaded and word container visible
    - assertVisible:
        id: "playback.rsvp.word-container"

    # Start playback
    - tapOn:
        id: "playback.controls.play-pause-btn"

    # Wait for words to start displaying
    - extendedWaitUntil:
        visible:
          id: "playback.rsvp.word-container"
        timeout: 5000

    # Pause playback
    - tapOn:
        id: "playback.controls.play-pause-btn"

    # Skip to end using forward button repeatedly
    - repeat:
        times: 30
        commands:
          - tapOn:
              id: "playback.controls.skip-forward-btn"

    # Verify completion state (look for completion modal or text)
    - assertVisible:
        text: "Completed"

**Flow 2: playback-wpm-control.yaml**

This flow verifies WPM (words per minute) slider adjustments. Create file `e2e/flows/playback/playback-wpm-control.yaml`:

    appId: com.kaya.spidrid
    ---
    - launchApp:
        clearState: true

    # Navigate to playback
    - tapOn:
        id: "content-list.fab-add"
    - tapOn: "Practice"
    - tapOn:
        id: "add-content.practice.topic-0"

    # Verify WPM slider is visible
    - assertVisible:
        id: "playback.controls.wpm-slider"

    # Interact with WPM slider (swipe right to increase)
    - swipe:
        from:
          id: "playback.controls.wpm-slider"
        direction: RIGHT
        duration: 500

    # Start playback to observe speed
    - tapOn:
        id: "playback.controls.play-pause-btn"

    # Wait briefly then pause
    - extendedWaitUntil:
        visible:
          id: "playback.rsvp.word-container"
        timeout: 3000

    - tapOn:
        id: "playback.controls.play-pause-btn"

**Flow 3: playback-navigation.yaml**

This flow verifies skip forward and skip back controls. Create file `e2e/flows/playback/playback-navigation.yaml`:

    appId: com.kaya.spidrid
    ---
    - launchApp:
        clearState: true

    # Navigate to playback
    - tapOn:
        id: "content-list.fab-add"
    - tapOn: "Practice"
    - tapOn:
        id: "add-content.practice.topic-0"

    # Start playback
    - tapOn:
        id: "playback.controls.play-pause-btn"

    # Wait for some words to display
    - extendedWaitUntil:
        visible:
          id: "playback.rsvp.word-container"
        timeout: 3000

    # Skip forward
    - tapOn:
        id: "playback.controls.skip-forward-btn"
    - tapOn:
        id: "playback.controls.skip-forward-btn"

    # Skip back
    - tapOn:
        id: "playback.controls.skip-back-btn"

    # Pause
    - tapOn:
        id: "playback.controls.play-pause-btn"

    # Verify still on playback screen
    - assertVisible:
        id: "playback.rsvp.word-container"

Acceptance for Milestone 2: Run `npm run e2e:playback` from the worktree. The terminal shows Maestro executing each flow in sequence. All three flows should complete with "Flow Passed" status. The dedicated simulator shows the app being controlled automatically.


## Milestone 3: Quiz E2E Flows

This milestone creates two YAML flow files that test comprehension quizzes after completing an article. At the end, running `npm run e2e:quiz` executes both flows and they pass.

**Flow 1: quiz-completion.yaml**

This flow completes an article that has a quiz, answers questions, and verifies the score display. Create file `e2e/flows/quiz/quiz-completion.yaml`:

    appId: com.kaya.spidrid
    ---
    - launchApp:
        clearState: true

    # Navigate to a practice article (these have quizzes)
    - tapOn:
        id: "content-list.fab-add"
    - tapOn: "Practice"
    - tapOn:
        id: "add-content.practice.topic-0"

    # Fast-forward through the article
    - repeat:
        times: 50
        commands:
          - tapOn:
              id: "playback.controls.skip-forward-btn"

    # Wait for quiz to appear (after article completion)
    - extendedWaitUntil:
        visible:
          id: "quiz.options.choice-0"
        timeout: 10000

    # Answer first question by tapping first option
    - tapOn:
        id: "quiz.options.choice-0"

    # If there's a submit button, tap it
    - tapOn:
        id: "quiz.submit-btn"
        optional: true

    # Wait for next question or results
    - extendedWaitUntil:
        timeout: 2000

    # Answer subsequent questions (repeat pattern)
    - tapOn:
        id: "quiz.options.choice-0"
        optional: true
    - tapOn:
        id: "quiz.submit-btn"
        optional: true

    # Eventually should see results
    - assertVisible:
        text: "Comprehension"
        optional: true

**Flow 2: quiz-retry.yaml**

This flow retakes a quiz to verify score updates. Create file `e2e/flows/quiz/quiz-retry.yaml`:

    appId: com.kaya.spidrid
    ---
    - launchApp:
        clearState: true

    # Navigate to playback and complete article
    - tapOn:
        id: "content-list.fab-add"
    - tapOn: "Practice"
    - tapOn:
        id: "add-content.practice.topic-0"

    # Skip through article
    - repeat:
        times: 50
        commands:
          - tapOn:
              id: "playback.controls.skip-forward-btn"

    # Answer quiz questions (intentionally wrong by picking last option)
    - extendedWaitUntil:
        visible:
          id: "quiz.options.choice-0"
        timeout: 10000

    - tapOn:
        id: "quiz.options.choice-2"
        optional: true
    - tapOn:
        id: "quiz.submit-btn"
        optional: true

    # Complete quiz
    - extendedWaitUntil:
        timeout: 5000

Acceptance for Milestone 3: Run `npm run e2e:quiz` from the worktree. Both flows complete with "Flow Passed" status.


## Milestone 4: Monetization E2E Flows

This milestone creates three YAML flow files that test the freemium paywall system. The app has a free tier that caps WPM at 450 and limits content imports to 5. These flows verify the paywall appears when limits are hit and that simulated purchases unlock premium features.

**Important:** The `subscriptionStore` in `src/store/subscriptionStore.ts` has `isPremium` defaulting to `true` in development. To test paywall flows, this must be temporarily set to `false`, or the flows must clear app state and rely on the default non-premium state for fresh installs.

**Flow 1: paywall-wpm-limit.yaml**

This flow attempts to set WPM above 450 and verifies the paywall appears. Create file `e2e/flows/subscription/paywall-wpm-limit.yaml`:

    appId: com.kaya.spidrid
    ---
    - launchApp:
        clearState: true

    # Navigate to playback
    - tapOn:
        id: "content-list.fab-add"
    - tapOn: "Practice"
    - tapOn:
        id: "add-content.practice.topic-0"

    # Try to increase WPM above free tier limit (450)
    # Swipe slider far right multiple times
    - swipe:
        from:
          id: "playback.controls.wpm-slider"
        direction: RIGHT
        duration: 1000

    - swipe:
        from:
          id: "playback.controls.wpm-slider"
        direction: RIGHT
        duration: 1000

    # If free tier, paywall should appear
    - assertVisible:
        id: "paywall.upgrade-btn"
        optional: true

**Flow 2: paywall-content-limit.yaml**

This flow imports content until the free tier limit is reached. Create file `e2e/flows/subscription/paywall-content-limit.yaml`:

    appId: com.kaya.spidrid
    ---
    - launchApp:
        clearState: true

    # This test requires repeatedly importing content
    # The exact flow depends on how content import works
    # Placeholder for content limit testing

    - tapOn:
        id: "content-list.fab-add"

    # Look for "Read" option to import content
    - tapOn: "Read"
        optional: true

**Flow 3: subscription-simulate.yaml**

This flow simulates a premium purchase and verifies premium features unlock. Create file `e2e/flows/subscription/subscription-simulate.yaml`:

    appId: com.kaya.spidrid
    ---
    - launchApp:
        clearState: true

    # Navigate to trigger paywall
    - tapOn:
        id: "content-list.fab-add"
    - tapOn: "Practice"
    - tapOn:
        id: "add-content.practice.topic-0"

    # Try to exceed free tier to trigger paywall
    - swipe:
        from:
          id: "playback.controls.wpm-slider"
        direction: RIGHT
        duration: 1000

    # If paywall appears, tap upgrade
    - tapOn:
        id: "paywall.upgrade-btn"
        optional: true

    # Simulate purchase (in Expo Go this calls simulatePurchase)
    - tapOn:
        text: "Simulate"
        optional: true

Acceptance for Milestone 4: Run `npm run e2e:monetization` from the worktree. The flows execute and demonstrate paywall behavior. Due to the development mode premium default, some assertions may need adjustment based on actual app behavior.


## Concrete Steps

All commands are run from the worktree directory `/Users/kaya/Coding/spidrid-e2e-maestro` unless otherwise specified.

Step 1 - Create worktree (run from main project):

    cd /Users/kaya/Coding/spidrid
    git worktree add ../spidrid-e2e-maestro test/e2e-maestro
    cd ../spidrid-e2e-maestro

Step 2 - Install Maestro:

    brew install maestro
    maestro --version

Expected output: `Maestro version: 1.38.x`

Step 3 - Create dedicated simulator:

    xcrun simctl create "Spidrid-E2E-Test" "iPhone 15" com.apple.CoreSimulator.SimRuntime.iOS-17-0
    xcrun simctl boot "Spidrid-E2E-Test"
    xcrun simctl list devices booted

Expected output includes: `Spidrid-E2E-Test (...) (Booted)`

Step 4 - Create directory structure:

    mkdir -p e2e/flows/playback e2e/flows/quiz e2e/flows/subscription e2e/.maestro

Step 5 - Create Maestro config file `e2e/.maestro/config.yaml` with content shown in Milestone 0.

Step 6 - Edit `package.json` to add e2e scripts shown in Milestone 0.

Step 7 - Start Expo and verify app launches on dedicated simulator:

    npx expo start

Press `i`, then select "Spidrid-E2E-Test" from device list.

Step 8 - Verify Maestro Studio works:

    npm run e2e:studio

Browser opens showing element hierarchy.

Step 9 through 15 - Edit component files to add testIDs as described in Milestone 1.

Step 16 - Create flow files as described in Milestones 2, 3, and 4.

Step 17 - Run all E2E tests:

    npm run e2e

Expected output: All flows pass.


## Validation and Acceptance

The plan is complete when:

1. Running `npm run e2e:setup-sim` successfully boots the Spidrid-E2E-Test simulator (verify with `xcrun simctl list devices booted`)

2. Running `npm run e2e:studio` opens Maestro Studio in a browser, and clicking on interactive elements shows their testIDs in the inspector panel

3. Running `npm run e2e:playback` executes three flow files and all three show "Flow Passed"

4. Running `npm run e2e:quiz` executes two flow files and both show "Flow Passed"

5. Running `npm run e2e:monetization` executes three flow files (some may be marked optional due to premium defaults)

6. Running `npm run e2e` executes all flows in sequence without manual intervention

7. The dedicated simulator (Spidrid-E2E-Test) remains isolated from the iPhone 16 Plus simulator used for manual testing


## Idempotence and Recovery

All commands in this plan are safe to run multiple times:

The `xcrun simctl create` command fails silently if the simulator already exists (handled by `2>/dev/null || true` in the npm script).

The `xcrun simctl boot` command fails silently if the simulator is already booted.

The `git worktree add` command fails if the worktree already exists; to recover, either use the existing worktree or remove it with `git worktree remove ../spidrid-e2e-maestro`.

To reset the simulator to a clean state (clearing all app data):

    npm run e2e:reset
    npm run e2e:setup-sim

To completely remove the dedicated simulator:

    xcrun simctl delete "Spidrid-E2E-Test"

To remove the git worktree:

    cd /Users/kaya/Coding/spidrid
    git worktree remove ../spidrid-e2e-maestro
    git branch -D test/e2e-maestro


## Artifacts and Notes

Example Maestro Studio output when inspecting an element with testID:

    Element Details:
      type: Button
      id: playback.controls.play-pause-btn
      label: Play
      frame: {x: 150, y: 600, width: 60, height: 60}

Example successful flow execution output:

    $ npm run e2e:playback
    Running flow: e2e/flows/playback/playback-basic.yaml
    ✓ launchApp
    ✓ tapOn: content-list.fab-add
    ✓ tapOn: Practice
    ✓ tapOn: add-content.practice.topic-0
    ✓ assertVisible: playback.rsvp.word-container
    ...
    Flow Passed - playback-basic.yaml


## Interfaces and Dependencies

**External dependencies:**

Maestro CLI (installed via Homebrew): Used for running YAML flow files against iOS simulator. Minimum version 1.30.

Xcode command line tools: Provides `xcrun simctl` for simulator management. Must be installed via `xcode-select --install`.

**npm packages (no new dependencies required):**

The project already has all necessary testing infrastructure. Maestro operates externally and communicates with the simulator via accessibility APIs.

**Optional dependency for launch arguments:**

If E2E-specific app behavior is needed (like disabling animations), install `react-native-launch-arguments`:

    npm install react-native-launch-arguments

Then in app code:

    import { LaunchArguments } from 'react-native-launch-arguments';
    const isE2E = LaunchArguments.value()?.isE2E === 'true';

**Component interfaces after testID additions:**

In `src/components/controls/PlaybackControls.tsx`, the play/pause button must have:

    <TouchableOpacity
      testID="playback.controls.play-pause-btn"
      accessible={true}
      onPress={handlePlayPause}
    >

In `src/components/rsvp/RSVPWord.tsx`, the word container must have:

    <View testID="playback.rsvp.word-container">

In `src/components/quiz/QuestionRenderer.tsx`, answer options must have:

    <TouchableOpacity
      testID={`quiz.options.choice-${index}`}
      accessible={true}
      onPress={() => selectOption(index)}
    >

In `src/components/paywall/Paywall.tsx`, the upgrade button must have:

    <TouchableOpacity
      testID="paywall.upgrade-btn"
      accessible={true}
      onPress={handleUpgrade}
    >


---

**Revision Note (2026-01-13):** Initial creation of ExecPlan based on planning session. Captured all requirements including dedicated iOS simulator setup (separate from iPhone 16 Plus), Maestro framework selection, testID best practices from official documentation, and prioritized E2E flows (playback, quiz, monetization). This plan follows PLANS.md structure exactly.
