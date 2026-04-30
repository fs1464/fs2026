import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Search, UserPlus, Users } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

const PILLS = ['All', 'DMs', 'Groups', 'Activities', 'Events', 'Outings', 'Volunteers'];

const MY_GROUPS = [
  {
    id: '1',
    name: 'Sector 12 Parents',
    members: '842 members',
    last: 'Rahul: Does anyone know a good pediatrician nearby?',
    time: '12:45 PM',
    online: true,
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: '2',
    name: 'Block C Residents',
    members: '156 members',
    last: 'Priya: The water supply maintenance is scheduled for tomorrow.',
    time: 'Yesterday',
    online: false,
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: '3',
    name: 'Morning Yoga Circle',
    members: '42 members',
    last: 'Amit: Great session today! See you all on Thursday morning.',
    time: 'Tue',
    online: true,
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

const DISCOVER = [
  {
    id: 'd1',
    name: 'Indore Foodies',
    members: '2.4k members',
    desc: 'Discovering the hidden culinary gems of the city. Join our weekly food crawls!',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'd2',
    name: 'Weekend Walkers',
    members: '1.1k members',
    desc: 'Exploring local trails and parks. Every Saturday morning at 7:00 AM sharp.',
    image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'd3',
    name: 'Green Thumbs',
    members: '850 members',
    desc: 'Community for gardening enthusiasts. Share tips, seeds, and plant care advice.',
    image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default function CharchaTab() {
  const [active, setActive] = useState('Groups');
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <Pressable style={styles.iconBtn} onPress={() => router.push('/listing/create?type=deals' as never)} hitSlop={8}>
          <UserPlus size={20} color={colors.primary} strokeWidth={2} />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View style={styles.searchWrap}>
          <Search size={18} color={colors.slate400} strokeWidth={2} />
          <TextInput placeholder="Search groups..." placeholderTextColor={colors.slate400} style={styles.searchInput} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsRow}>
          {PILLS.map((p) => {
            const on = p === active;
            return (
              <Pressable key={p} onPress={() => setActive(p)} style={[styles.pill, on && styles.pillActive]}>
                <Text style={[styles.pillLabel, on && styles.pillLabelActive]}>{p}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>My Groups</Text>
          <Text style={styles.sectionLink}>Discover Groups</Text>
        </View>
        <View style={{ paddingHorizontal: spacing.lg, gap: spacing.md }}>
          {MY_GROUPS.map((g) => (
            <Pressable key={g.id} style={styles.groupRow}>
              <View style={styles.avatarWrap}>
                <Image source={{ uri: g.image }} style={styles.avatar} />
                <View style={[styles.dot, { backgroundColor: g.online ? colors.success : colors.slate300 }]} />
              </View>
              <View style={styles.groupBody}>
                <View style={styles.groupTopRow}>
                  <Text style={styles.groupName} numberOfLines={1}>{g.name}</Text>
                  <Text style={styles.groupTime}>{g.time}</Text>
                </View>
                <Text style={styles.groupMeta}>{g.members}</Text>
                <Text style={styles.groupLast} numberOfLines={1}>{g.last}</Text>
              </View>
            </Pressable>
          ))}
        </View>
        <View style={[styles.sectionHead, { marginTop: spacing.xl }]}>
          <Text style={styles.sectionTitle}>Discover Groups</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.discoverRow}>
          {DISCOVER.map((g) => (
            <View key={g.id} style={styles.discoverCard}>
              <View style={styles.discoverImgWrap}>
                <Image source={{ uri: g.image }} style={styles.discoverImg} />
                <View style={styles.discoverBadge}>
                  <Users size={14} color="#fff" strokeWidth={2} />
                  <Text style={styles.discoverBadgeText}>{g.members}</Text>
                </View>
              </View>
              <View style={{ padding: 14, flex: 1 }}>
                <Text style={styles.discoverTitle}>{g.name}</Text>
                <Text style={styles.discoverDesc} numberOfLines={2}>{g.desc}</Text>
                <Pressable style={styles.joinBtn}>
                  <Text style={styles.joinLabel}>Join Group</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  headerTitle: { fontFamily: fonts.headline, fontSize: 18, color: colors.onSurface },
  iconBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surfaceContainerLow,
    margin: spacing.lg,
    paddingHorizontal: 14,
    borderRadius: 14,
    height: 44,
  },
  searchInput: { flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.onSurface },
  pillsRow: { paddingHorizontal: spacing.lg, gap: 8, paddingBottom: spacing.md },
  pill: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 999, backgroundColor: colors.surfaceContainer },
  pillActive: { backgroundColor: colors.primary },
  pillLabel: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.slate600 },
  pillLabelActive: { color: '#fff' },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: { fontFamily: fonts.headline, fontSize: 18, color: colors.onSurface },
  sectionLink: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.primary },
  groupRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatarWrap: { width: 56, height: 56, position: 'relative' },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  dot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#fff',
  },
  groupBody: { flex: 1, borderBottomWidth: 1, borderBottomColor: colors.slate50, paddingBottom: spacing.md, gap: 2 },
  groupTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  groupName: { fontFamily: fonts.bodySemi, fontSize: 14, color: colors.onSurface },
  groupTime: { fontFamily: fonts.body, fontSize: 10, color: colors.slate400 },
  groupMeta: { fontFamily: fonts.body, fontSize: 12, color: colors.slate500 },
  groupLast: { fontFamily: fonts.body, fontSize: 13, color: colors.slate600 },
  discoverRow: { paddingHorizontal: spacing.lg, gap: spacing.md, paddingBottom: spacing.lg },
  discoverCard: {
    width: 260,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    overflow: 'hidden',
  },
  discoverImgWrap: { height: 128, width: '100%' },
  discoverImg: { width: '100%', height: '100%' },
  discoverBadge: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  discoverBadgeText: { fontFamily: fonts.bodySemi, fontSize: 11, color: '#fff' },
  discoverTitle: { fontFamily: fonts.headline, fontSize: 15, color: colors.onSurface, marginBottom: 4 },
  discoverDesc: { fontFamily: fonts.body, fontSize: 12, color: colors.slate500, lineHeight: 18, marginBottom: 12 },
  joinBtn: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 10, alignItems: 'center', marginTop: 'auto' },
  joinLabel: { fontFamily: fonts.label, fontSize: 12, color: '#fff' },
});
