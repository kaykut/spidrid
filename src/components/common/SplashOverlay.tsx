import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Image, Dimensions, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Original image is 1024x1024
const ORIGINAL_SIZE = 1024;
const LOGO_SIZE = SCREEN_WIDTH * 0.4; // 40% of screen for better visibility
const SCALE = LOGO_SIZE / ORIGINAL_SIZE;

// Slice dimensions (from the slicing script - non-overlapping regions)
const FORK = { width: 293, height: 1024, left: 0 };
const BOOK = { width: 447, height: 1024, left: 295 };
const KNIFE = { width: 280, height: 1024, left: 744 };

interface SplashOverlayProps {
  /** Whether the splash should be visible */
  visible: boolean;
  /** Duration to show splash in ms (default: 2000) */
  duration?: number;
  /** Callback when splash animation completes */
  onAnimationComplete?: () => void;
}

/**
 * Animated splash overlay with fork, book, and knife components.
 *
 * Animation sequence (fits in 2 seconds):
 * - 0-350ms: Fork slides in from left with slight rotation
 * - 50-400ms: Knife slides in from right with slight rotation
 * - 200-700ms: Book drops from top with 3D rotation effect
 * - 700-1600ms: Hold to appreciate the assembled logo
 * - 1600-2000ms: Fade out
 */
export function SplashOverlay({
  visible,
  duration = 2000,
  onAnimationComplete,
}: SplashOverlayProps) {
  // Main container opacity for fade out
  const containerOpacity = useRef(new Animated.Value(1)).current;

  // Fork animations
  const forkTranslateX = useRef(new Animated.Value(-150)).current;
  const forkRotate = useRef(new Animated.Value(-20)).current;
  const forkOpacity = useRef(new Animated.Value(0)).current;

  // Knife animations
  const knifeTranslateX = useRef(new Animated.Value(150)).current;
  const knifeRotate = useRef(new Animated.Value(20)).current;
  const knifeOpacity = useRef(new Animated.Value(0)).current;

  // Book animations (3D fall effect)
  const bookTranslateY = useRef(new Animated.Value(-200)).current;
  const bookScale = useRef(new Animated.Value(0.7)).current;
  const bookOpacity = useRef(new Animated.Value(0)).current;

  const hasStartedAnimation = useRef(false);

  useEffect(() => {
    if (!hasStartedAnimation.current) {
      hasStartedAnimation.current = true;

      // Fork animation: slide in from left with rotation
      const forkAnimation = Animated.parallel([
        Animated.timing(forkOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(forkTranslateX, {
          toValue: 0,
          duration: 350,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(forkRotate, {
          toValue: 0,
          duration: 350,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]);

      // Knife animation: slide in from right with rotation
      const knifeAnimation = Animated.parallel([
        Animated.timing(knifeOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(knifeTranslateX, {
          toValue: 0,
          duration: 350,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(knifeRotate, {
          toValue: 0,
          duration: 350,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]);

      // Book animation: drop from top with scale (simulating 3D perspective)
      const bookAnimation = Animated.parallel([
        Animated.timing(bookOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(bookTranslateY, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(bookScale, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]);

      // Orchestrate the sequence
      Animated.sequence([
        // Start fork and knife with slight offset
        Animated.parallel([
          forkAnimation,
          Animated.sequence([
            Animated.delay(50),
            knifeAnimation,
          ]),
          Animated.sequence([
            Animated.delay(200),
            bookAnimation,
          ]),
        ]),
        // Hold for appreciation (adjust to fit within duration)
        Animated.delay(duration - 700 - 400), // duration minus animation time minus fade time
        // Fade out
        Animated.timing(containerOpacity, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        onAnimationComplete?.();
      });
    }
  }, [
    duration,
    containerOpacity,
    forkTranslateX,
    forkRotate,
    forkOpacity,
    knifeTranslateX,
    knifeRotate,
    knifeOpacity,
    bookTranslateY,
    bookScale,
    bookOpacity,
    onAnimationComplete,
  ]);

  // Interpolate rotation values to strings
  const forkRotateStr = forkRotate.interpolate({
    inputRange: [-20, 0],
    outputRange: ['-20deg', '0deg'],
  });

  const knifeRotateStr = knifeRotate.interpolate({
    inputRange: [0, 20],
    outputRange: ['0deg', '20deg'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: containerOpacity },
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <LinearGradient
        colors={[
          '#12121a', // Slightly elevated dark with cool undertone (top)
          '#0e0e12', // Mid transition
          '#0a0a0a', // True dark matching native splash (bottom)
        ]}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      >
        {/* Container for all logo pieces - positioned to reconstruct the original */}
        <View style={[styles.logoContainer, { width: LOGO_SIZE, height: LOGO_SIZE }]}>
          {/* Fork - slides in from left with rotation */}
          <Animated.View
            style={[
              styles.piece,
              {
                left: FORK.left * SCALE,
                width: FORK.width * SCALE,
                height: FORK.height * SCALE,
                opacity: forkOpacity,
                transform: [
                  { translateX: forkTranslateX },
                  { rotate: forkRotateStr },
                ],
              },
            ]}
          >
            <Image
              source={require('../../../assets/splash_fork.png')}
              style={styles.pieceImage}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Book - drops from top with 3D effect (rendered last for proper layering) */}
          <Animated.View
            style={[
              styles.piece,
              styles.bookPiece,
              {
                left: BOOK.left * SCALE,
                width: BOOK.width * SCALE,
                height: BOOK.height * SCALE,
                opacity: bookOpacity,
                transform: [
                  { translateY: bookTranslateY },
                  { scale: bookScale },
                ],
              },
            ]}
          >
            <Image
              source={require('../../../assets/splash_book.png')}
              style={styles.pieceImage}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Knife - slides in from right with rotation */}
          <Animated.View
            style={[
              styles.piece,
              {
                left: KNIFE.left * SCALE,
                width: KNIFE.width * SCALE,
                height: KNIFE.height * SCALE,
                opacity: knifeOpacity,
                transform: [
                  { translateX: knifeTranslateX },
                  { rotate: knifeRotateStr },
                ],
              },
            ]}
          >
            <Image
              source={require('../../../assets/splash_knife.png')}
              style={styles.pieceImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 9999,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'relative',
  },
  piece: {
    position: 'absolute',
    top: 0,
  },
  bookPiece: {
    zIndex: 1, // Book renders on top to cover overlap edges
  },
  pieceImage: {
    width: '100%',
    height: '100%',
  },
});
