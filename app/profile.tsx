import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Award, Calendar, MapPin, Settings, Sparkles } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

const STATS = [
  { label: 'Posts', value: '142' },
  { label: 'Followers', value: '4.2k' },
  { label: 'Following', value: '318' },
];

const BADGES = [
  { id: 'b1', label: 'Top Contributor', icon: Award },
  { id: 'b2', label: 'Early Member', icon: Sparkles },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.slate700} strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Profile</Text>
        <Pressable style={styles.iconBtn} onPress={() => router.push('/settings' as never)}>
          <Settings size={18} color={colors.slate700} strokeWidth={2} />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.hero}>
          <View style={styles.premiumBadge}>
            <Sparkles size={12} color="#fff" strokeWidth={2} />
            <Text style={styles.premiumLabel}>Premium</Text>
          </View>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Rahul Sharma</Text>
          <Text style={styles.handle}>@rahul.sharma</Text>
          <View style={styles.metaRow}>
            <MapPin size={12} color={colors.slate500} strokeWidth={2} />
            <Text style={styles.metaText}>Indiranagar, Bengaluru</Text>
            <Text style={styles.metaDot}>.</Text>
            <Calendar size={12} color={colors.slate500} strokeWidth={2} />
            <Text style={styles.metaText}>Joined Mar 2024</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          {STATS.map((s) => (
            <View key={s.label} style={styles.statCell}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.actionsRow}>
          <Pressable style={[styles.primaryBtn, { flex: 1 }]}>
            <Text style={styles.primaryLabel}>Edit Profile</Text>
          </Pressable>
          <Pressable style={styles.secondaryBtn}>
            <Text style={styles.secondaryLabel}>Share</Text>
          </Pressable>
        </View>
        <Text style={styles.sectionLabel}>Badges</Text>
        <View style={styles.badgeRow}>
          {BADGES.map((b) => {
            const Icon = b.icon;
            return (
              <View key={b.id} style={styles.badge}>
                <View style={styles.badgeIcon}>
                  <Icon size={16} color={colors.primary} strokeWidth={2} />
                </View>
                <Text style={styles.badgeLabel}>{b.label}</Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.sectionLabel}>About</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutText}>
            Neighborhood enthusiast. I love discovering hidden food spots, organizing community
            walks, and helping new residents settle in.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  headerTitle: { fontFamily: fonts.headline, fontSize: 17, color: colors.onSurface },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  body: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 120 },
  hero: { alignItems: 'center', gap: 6 },
  premiumBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#f59e0b', paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 999, marginBottom: 8,
  },
  premiumLabel: { fontFamily: fonts.label, fontSize: 10, color: '#fff', letterSpacing: 0.5 },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: colors.primaryContainer },
  name: { fontFamily: fonts.headline, fontSize: 20, color: colors.onSurface, marginTop: 8 },
  handle: { fontFamily: fonts.body, fontSize: 13, color: colors.slate500 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  metaText: { fontFamily: fonts.body, fontSize: 11, color: colors.slate500 },
  metaDot: { fontFamily: fonts.body, color: colors.slate400, marginHorizontal: 4 },
  statsRow: {
    flexDirection: 'row', backgroundColor: colors.surface,
    borderRadius: 16, borderWidth: 1, borderColor: colors.outlineVariant,
    paddingVertical: 14,
  },
  statCell: { flex: 1, alignItems: 'center' },
  statValue: { fontFamily: fonts.headline, fontSize: 18, color: colors.onSurface },
  statLabel: { fontFamily: fonts.body, fontSize: 11, color: colors.slate500, marginTop: 2 },
  actionsRow: { flexDirection: 'row', gap: 10 },
  primaryBtn: { backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  primaryLabel: { fontFamily: fonts.label, fontSize: 13, color: '#fff' },
  secondaryBtn: { backgroundColor: colors.surfaceContainer, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 20, alignItems: 'center' },
  secondaryLabel: { fontFamily: fonts.label, fontSize: 13, color: colors.slate700 },
  sectionLabel: {
    fontFamily: fonts.bodySemi, fontSize: 11, color: colors.primary,
    textTransform: 'uppercase', letterSpacing: 1.1,
  },
  badgeRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.outlineVariant,
    paddingHorizontal: 12, paddingVertical: 10, borderRadius: 999,
  },
  badgeIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primaryContainer, alignItems: 'center', justifyContent: 'center' },
  badgeLabel: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.onSurface },
  aboutCard: { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.outlineVariant, padding: 16 },
  aboutText: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.onSurfaceVariant },
});
