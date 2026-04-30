import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { Home, Compass, TrendingUp, MessageCircle, Store } from 'lucide-react-native';
import { colors, fonts } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.slate500,
        tabBarLabelStyle: { fontFamily: fonts.label, fontSize: 10, marginTop: -2 },
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'News',
          tabBarIcon: ({ color, size }) => <Compass size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="funding"
        options={{
          title: 'Funding',
          tabBarIcon: ({ color, size }) => <TrendingUp size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="charcha"
        options={{
          title: 'Charcha',
          tabBarIcon: ({ color, size }) => <MessageCircle size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: 'Market',
          tabBarIcon: ({ color, size }) => <Store size={size} color={color} strokeWidth={2} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === 'ios' ? 84 : 64,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
    backgroundColor: colors.surface,
    borderTopColor: colors.outlineVariant,
  },
});
