import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, ListFilter as Filter, Search, Users } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

const CATEGORIES = ['All', 'Food', 'Fitness', 'Parenting', 'Outdoors', 'Volunteering'];

const FEATURED = [
  {
    id: 'f1',
    name: 'Indore Foodies',
    members: '2.4k members',
    desc: 'Discovering the hidden culinary gems of the city. Join our weekly food crawls!',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'f2',
    name: 'Weekend Walkers',
    members: '1.1k members',
    desc: 'Exploring local trails and parks. Every Saturday morning at 7:00 AM sharp.',
    image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const NEARBY = [
  {
    id: 'n1',
    name: 'Green Thumbs',
    members: '850 members',
    desc: 'Community for gardening enthusiasts. Share tips, seeds, and plant care advice.',
    image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'n2',
    name: 'Cycle Pack',
    members: '320 members',
    desc: 'Weekend cycling rides around the city and outer trails.',
    image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'n3',
    name: 'Book Club',
    members: '178 members',
    desc: 'Monthly meetups to discuss a new book. Hot chai, quiet evenings.',
    image: 'https://images.pexels.com/photos/264635/pexels-photo-264635.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function DiscoverGroupsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.slate700} strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Discover Groups</Text>
        <Pressable style={styles.iconBtn}>
          <Filter size={18} color={colors.slate700} strokeWidth={2} />
        </Pressable>
      </View>
      <View style={styles.searchWrap}>
        <Search size={18} color={colors.slate400} strokeWidth={2} />
        <TextInput placeholder="Search by name, topic, locality..." placeholderTextColor={colors.slate400} style={styles.searchInput} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsRow}>
        {CATEGORIES.map((c, i) => (
          <Pressable key={c} style={[styles.pill, i === 0 && styles.pillActive]}>
            <Text style={[styles.pillLabel, i === 0 && styles.pillLabelActive]}>{c}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.section}>Featured this week</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredRow}>
          {FEATURED.map((g) => (
            <View key={g.id} style={styles.featuredCard}>
              <Image source={{ uri: g.image }} style={styles.featuredImg} />
              <View style={styles.featuredScrim} />
              <View style={styles.featuredBody}>
                <Text style={styles.featuredTitle}>{g.name}</Text>
                <View style={styles.membersRow}>
                  <Users size={12} color="#fff" strokeWidth={2} />
                  <Text style={styles.featuredMembers}>{g.members}</Text>
                </View>
                <Pressable style={styles.joinBtn}>
                  <Text style={styles.joinLabel}>Join</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.section}>Nearby you</Text>
        <View style={{ paddingHorizontal: spacing.lg, gap: spacing.md }}>
          {NEARBY.map((g) => (
            <Pressable key={g.id} style={styles.nearbyCard}>
              <Image source={{ uri: g.image }} style={styles.nearbyImg} />
              <View style={styles.nearbyBody}>
                <Text style={styles.nearbyTitle}>{g.name}</Text>
                <Text style={styles.nearbyDesc} numberOfLines={2}>{g.desc}</Text>
                <View style={styles.nearbyFooter}>
                  <Text style={styles.nearbyMeta}>{g.members}</Text>
                  <Pressable style={styles.joinSmall}>
                    <Text style={styles.joinSmallLabel}>Join</Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  headerTitle: { fontFamily: fonts.headline, fontSize: 17, color: colors.primary },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  searchWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surfaceContainerLow, marginHorizontal: spacing.lg, paddingHorizontal: 14, borderRadius: 14, height: 44 },
  searchInput: { flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.onSurface },
  pillsRow: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: 8 },
  pill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999, backgroundColor: colors.surfaceContainer },
  pillActive: { backgroundColor: colors.primary },
  pillLabel: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.slate600 },
  pillLabelActive: { color: '#fff' },
  section: { fontFamily: fonts.bodySemi, fontSize: 11, color: colors.primary, textTransform: 'uppercase', letterSpacing: 1.1, paddingHorizontal: spacing.lg, marginTop: spacing.md, marginBottom: spacing.sm },
  featuredRow: { paddingHorizontal: spacing.lg, gap: spacing.md, paddingBottom: spacing.md },
  featuredCard: { width: 280, height: 180, borderRadius: 18, overflow: 'hidden' },
  featuredImg: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  featuredScrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.35)' },
  featuredBody: { flex: 1, padding: 16, justifyContent: 'flex-end', gap: 6 },
  featuredTitle: { fontFamily: fonts.headline, fontSize: 18, color: '#fff' },
  membersRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  featuredMembers: { fontFamily: fonts.bodySemi, fontSize: 11, color: 'rgba(255,255,255,0.92)' },
  joinBtn: { alignSelf: 'flex-start', backgroundColor: colors.primary, paddingHorizontal: 18, paddingVertical: 8, borderRadius: 999, marginTop: 8 },
  joinLabel: { fontFamily: fonts.label, fontSize: 12, color: '#fff' },
  nearbyCard: { flexDirection: 'row', gap: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: 16, padding: 12 },
  nearbyImg: { width: 96, height: 96, borderRadius: 12 },
  nearbyBody: { flex: 1, justifyContent: 'space-between', gap: 4 },
  nearbyTitle: { fontFamily: fonts.headline, fontSize: 15, color: colors.onSurface },
  nearbyDesc: { fontFamily: fonts.body, fontSize: 12, color: colors.slate500, lineHeight: 18 },
  nearbyFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  nearbyMeta: { fontFamily: fonts.body, fontSize: 11, color: colors.slate500 },
  joinSmall: { backgroundColor: colors.primaryContainer, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999 },
  joinSmallLabel: { fontFamily: fonts.label, fontSize: 11, color: colors.onPrimaryContainer },
});
