import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { useTheme } from '../../components/common/ThemeProvider';
import { FloatingNavBar } from '../../components/navigation/FloatingNavBar';
import { FloatingProfileButton } from '../../components/navigation/FloatingProfileButton';

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tabs.Screen name="journey" />
        <Tabs.Screen name="train" />
        <Tabs.Screen name="read" />
        <Tabs.Screen name="learn" />
        <Tabs.Screen name="profile" />
      </Tabs>
      <FloatingNavBar />
      <FloatingProfileButton />
    </View>
  );
}
