import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Check, Search, UserPlus, Users } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

const FILTERS = ['All', 'DMs', 'Groups', 'Activities', 'Events', 'Outings', 'Volunteers'];

type ChatItem = {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread?: number;
  verified?: boolean;
  group?: boolean;
  image?: string;
  previewAccent?: boolean;
  senderPrefix?: string;
};

const CHATS: ChatItem[] = [
  {
    id: 'c1',
    name: 'MigoMap',
    preview: 'New community event near you!',
    time: '10:45 AM',
    unread: 1,
    verified: true,
    previewAccent: true,
    image: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 'c2',
    name: 'Alex Rivera',
    preview: 'That sounds like a great plan for the weekend. Count me in!',
    time: '9:12 AM',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 'c3',
    name: 'Sarah Jenkins',
    preview: 'Did you see the new update for the community project?',
    time: 'Yesterday',
    unread: 3,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 'c4',
    name: 'Urban Hikers Society',
    preview: "Let's meet at the north gate at 7am sharp.",
    time: 'Tue',
    group: true,
    senderPrefix: 'Marco',
  },
  {
    id: 'c5',
    name: 'David Chen',
    preview: 'The documents are ready for your review.',
    time: 'Mon',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 'c6',
    name: 'Elena Rodriguez',
    preview: "I'll send the location pin in a bit.",
    time: 'Aug 12',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

export default function MessagesListScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Pressable style={styles.addBtn} onPress={() => router.push('/groups/create')}>
          <UserPlus size={20} color={colors.primary} strokeWidth={2} />
        </Pressable>
      </View>
      <View style={styles.divider} />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View style={styles.searchWrap}>
          <Search size={18} color={colors.outline} strokeWidth={2} />
          <TextInput
            placeholder="Search chats and groups"
            placeholderTextColor={colors.outline}
            style={styles.searchInput}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsRow}
        >
          {FILTERS.map((f, i) => (
            <Pressable key={f} style={[styles.pill, i === 0 && styles.pillActive]}>
              <Text style={[styles.pillLabel, i === 0 && styles.pillLabelActive]}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Text style={styles.sectionTitle}>Messages</Text>
        <View style={styles.list}>
          {CHATS.map((c) => (
            <Pressable
              key={c.id}
              style={styles.row}
              onPress={() => (c.group ? router.push('/groups/chat') : null)}
            >
              <View style={styles.avatarWrap}>
                {c.group ? (
                  <View style={styles.groupAvatar}>
                    <Users size={22} color={colors.primary} strokeWidth={2} />
                  </View>
                ) : (
                  <Image source={{ uri: c.image }} style={styles.avatar} />
                )}
                {c.verified && (
                  <View style={styles.verifyBadge}>
                    <Check size={10} color="#fff" strokeWidth={3} />
                  </View>
                )}
              </View>
              <View style={styles.body}>
                <View style={styles.bodyTop}>
                  <Text style={styles.name} numberOfLines={1}>
                    {c.name}
                  </Text>
                  <Text style={styles.time}>{c.time}</Text>
                </View>
                <Text
                  style={[
                    styles.preview,
                    c.previewAccent && styles.previewAccent,
                    !!c.unread && !c.previewAccent && styles.previewBold,
                  ]}
                  numberOfLines={1}
                >
                  {c.senderPrefix ? (
                    <Text style={styles.previewSender}>{c.senderPrefix}: </Text>
                  ) : null}
                  {c.preview}
                </Text>
              </View>
              {c.unread ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeLabel}>{c.unread}</Text>
                </View>
              ) : null}
            </Pressable>
          ))}
        </View>
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
  },
  title: { fontFamily: fonts.headline, fontSize: 18, color: colors.onSurface, letterSpacing: -0.3 },
  addBtn: { padding: 6 },
  divider: { height: 1, backgroundColor: colors.slate100 },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surfaceContainerLow,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    paddingHorizontal: 14,
    borderRadius: 14,
    height: 48,
  },
  searchInput: { flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.onSurface },
  pillsRow: { paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, gap: 8 },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.surfaceContainer,
  },
  pillActive: { backgroundColor: colors.primary },
  pillLabel: { fontFamily: fonts.bodySemi, fontSize: 13, color: colors.onSurfaceVariant },
  pillLabelActive: { color: '#fff' },
  sectionTitle: {
    fontFamily: fonts.headline,
    fontSize: 17,
    color: colors.onSurface,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  list: { paddingHorizontal: spacing.sm },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 12,
    borderRadius: 14,
  },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surfaceContainer,
  },
  groupAvatar: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, minWidth: 0, gap: 2 },
  bodyTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  name: { fontFamily: fonts.headline, fontSize: 15, color: colors.onSurface, flex: 1, marginRight: 8 },
  time: { fontFamily: fonts.label, fontSize: 11, color: colors.outline },
  preview: { fontFamily: fonts.body, fontSize: 13, color: colors.onSurfaceVariant },
  previewAccent: { color: colors.primary, fontFamily: fonts.bodySemi },
  previewBold: { color: colors.onSurface, fontFamily: fonts.bodySemi },
  previewSender: { fontFamily: fonts.bodySemi, color: colors.onSurface },
  badge: {
    backgroundColor: colors.primary,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: { fontFamily: fonts.bodySemi, fontSize: 10, color: '#fff' },
});
