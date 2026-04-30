import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, spacing } from '@/constants/theme';
import AskScreen from './AskScreen';
import IssuesScreen from './IssuesScreen';
import NewsScreen from './NewsScreen';

type CharchaSegment = 'ask' | 'issues' | 'news';

const SEGMENTS: { key: CharchaSegment; label: string }[] = [
  { key: 'ask', label: 'Ask' },
  { key: 'issues', label: 'Issues' },
  { key: 'news', label: 'News' },
];

export default function CharchaHomeScreen() {
  const [segment, setSegment] = useState<CharchaSegment>('ask');

  const renderContent = () => {
    switch (segment) {
      case 'ask':
        return <AskScreen />;
      case 'issues':
        return <IssuesScreen />;
      case 'news':
        return <NewsScreen />;
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
