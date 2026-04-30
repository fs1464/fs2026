import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Bell, LogOut, MapPin, Trophy, Users } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

const MEMBERS = [
  { id: 'p1', name: 'Priya', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'p2', name: 'Arjun', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'p3', name: 'Neha', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'p4', name: 'Kabir', avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'p5', name: 'Sneha', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

export default function GroupDetailsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.slate700} strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Group Details</Text>
        <View style={styles.iconBtn} />
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.hero}>
          <Image source={{ uri: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=600' }} style={styles.cover} />
          <View style={{ alignItems: 'center', marginTop: -40 }}>
            <View style={styles.avatarOuter}>
              <Image source={{ uri: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400' }} style={styles.avatar} />
            </View>
            <Text style={styles.name}>Sector 12 Cricket Toli</Text>
            <View style={styles.metaRow}>
              <MapPin size={12} color={colors.slate500} strokeWidth={2} />
              <Text style={styles.metaText}>Indiranagar, Bengaluru</Text>
              <Text style={styles.metaDot}>.</Text>
              <Users size={12} color={colors.slate500} strokeWidth={2} />
              <Text style={styles.metaText}>14 members</Text>
            </View>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statCell}>
            <Trophy size={16} color={colors.primary} strokeWidth={2} />
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Activities</Text>
          </View>
          <View style={styles.statCell}>
            <Bell size={16} color={colors.tertiary} strokeWidth={2} />
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
          <View style={styles.statCell}>
            <Users size={16} color={colors.success} strokeWidth={2} />
            <Text style={styles.statValue}>14</Text>
            <Text style={styles.statLabel}>Members</Text>
          </View>
        </View>
        <Text style={styles.section}>About</Text>
        <View style={styles.card}>
          <Text style={styles.desc}>
            Weekly cricket meetups every Sunday morning for residents of Sector 12. All skill
            levels welcome . we love the game and the company more than the score.
          </Text>
        </View>
        <Text style={styles.section}>Members</Text>
        <ScrollView horizontal contentContainerStyle={styles.memberRow} showsHorizontalScrollIndicator={false}>
          {MEMBERS.map((m) => (
            <View key={m.id} style={{ alignItems: 'center', gap: 6 }}>
              <Image source={{ uri: m.avatar }} style={styles.memberAvatar} />
              <Text style={styles.memberName}>{m.name}</Text>
            </View>
          ))}
        </ScrollView>
        <Pressable style={styles.leaveBtn}>
          <LogOut size={18} color={colors.error} strokeWidth={2} />
          <Text style={styles.leaveLabel}>Leave group</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  headerTitle: { fontFamily: fonts.headline, fontSize: 17, color: colors.onSurface },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  body: { paddingBottom: 120 },
  hero: { paddingBottom: spacing.lg, alignItems: 'center' },
  cover: { width: '100%', height: 140 },
  avatarOuter: { width: 88, height: 88, borderRadius: 44, padding: 3, backgroundColor: '#fff' },
  avatar: { width: 82, height: 82, borderRadius: 41 },
  name: { fontFamily: fonts.headline, fontSize: 22, color: colors.onSurface, marginTop: 10 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  metaText: { fontFamily: fonts.body, fontSize: 12, color: colors.slate500 },
  metaDot: { fontFamily: fonts.body, color: colors.slate400, marginHorizontal: 4 },
  statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: spacing.lg },
  statCell: { flex: 1, alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: 14, paddingVertical: 14, gap: 4 },
  statValue: { fontFamily: fonts.headline, fontSize: 17, color: colors.onSurface },
  statLabel: { fontFamily: fonts.body, fontSize: 11, color: colors.slate500 },
  section: { fontFamily: fonts.bodySemi, fontSize: 11, color: colors.primary, textTransform: 'uppercase', letterSpacing: 1.1, paddingHorizontal: spacing.lg, marginTop: spacing.xl, marginBottom: 10 },
  card: { backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.outlineVariant, padding: 14, marginHorizontal: spacing.lg },
  desc: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.onSurfaceVariant },
  memberRow: { paddingHorizontal: spacing.lg, gap: 16 },
  memberAvatar: { width: 56, height: 56, borderRadius: 28 },
  memberName: { fontFamily: fonts.body, fontSize: 11, color: colors.slate700 },
  leaveBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 16, marginTop: spacing.lg },
  leaveLabel: { fontFamily: fonts.bodySemi, fontSize: 13, color: colors.error },
});
