import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { Hop as Home, MessageCircle, FileText, Store, TrendingUp } from 'lucide-react-native';
import { colors, fonts } from '@/constants/theme';

export default function AppTabLayout() {
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
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} strokeWidth={2} />,
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
        name="pages"
        options={{
          title: 'Pages',
          tabBarIcon: ({ color, size }) => <FileText size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: 'Marketplace',
          tabBarIcon: ({ color, size }) => <Store size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="funding"
        options={{
          title: 'Funding',
          tabBarIcon: ({ color, size }) => <TrendingUp size={size} color={color} strokeWidth={2} />,
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
