import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, spacing } from '@/constants/theme';
import ActivitiesScreen from './ActivitiesScreen';
import EventsScreen from './EventsScreen';
import OutingsScreen from './OutingsScreen';
import VolunteerScreen from './VolunteerScreen';

type FeedSegment = 'activities' | 'events' | 'outings' | 'volunteer';

const SEGMENTS: { key: FeedSegment; label: string }[] = [
  { key: 'activities', label: 'Activities' },
  { key: 'events', label: 'Events' },
  { key: 'outings', label: 'Outings' },
  { key: 'volunteer', label: 'Volunteer' },
];

export default function FeedHomeScreen() {
  const [segment, setSegment] = useState<FeedSegment>('activities');

  const renderContent = () => {
    switch (segment) {
      case 'activities':
        return <ActivitiesScreen />;
      case 'events':
        return <EventsScreen />;
      case 'outings':
        return <OutingsScreen />;
      case 'volunteer':
        return <VolunteerScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.tabs}>
        {SEGMENTS.map((s) => {
          const active = segment === s.key;
          return (
            <Pressable
              key={s.key}
              onPress={() => setSegment(s.key)}
              style={[styles.tab, active && styles.tabActive]}
            >
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{s.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <View style={{ flex: 1 }}>{renderContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    backgroundColor: colors.surface,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.surfaceContainer,
  },
  tabActive: { backgroundColor: colors.primary },
  tabLabel: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.slate600 },
  tabLabelActive: { color: '#fff' },
});
