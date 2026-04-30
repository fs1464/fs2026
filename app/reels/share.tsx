import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Copy, Link, Mail, MessageCircle } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

const RECENT = [
  { id: 'u1', name: 'Priya', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'u2', name: 'Arjun', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'u3', name: 'Neha', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'u4', name: 'Kabir', avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

const GROUPS = [
  { id: 'g1', name: 'Sector 12 Parents', image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'g2', name: 'Morning Yoga', image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

export default function ShareReelScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.slate700} strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Share Reel</Text>
        <View style={styles.iconBtn} />
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.sectionLabel}>Recent</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hRow}>
          {RECENT.map((u) => (
            <View key={u.id} style={{ alignItems: 'center', gap: 6 }}>
              <Image source={{ uri: u.avatar }} style={styles.avatarLg} />
              <Text style={styles.avatarName}>{u.name}</Text>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.sectionLabel}>Share to Groups</Text>
        <View style={styles.card}>
          {GROUPS.map((g, i) => (
            <View key={g.id}>
              <View style={styles.row}>
                <Image source={{ uri: g.image }} style={styles.rowImg} />
                <Text style={styles.rowLabel}>{g.name}</Text>
                <Pressable style={styles.sendBtn}>
                  <Text style={styles.sendLabel}>Send</Text>
                </Pressable>
              </View>
              {i < GROUPS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
        <Text style={styles.sectionLabel}>External Share</Text>
        <View style={styles.externalGrid}>
          {[
            { icon: Copy, label: 'Copy link' },
            { icon: Link, label: 'Share link' },
            { icon: MessageCircle, label: 'Message' },
            { icon: Mail, label: 'Email' },
          ].map((o, i) => {
            const Icon = o.icon;
            return (
              <Pressable key={i} style={styles.extCell}>
                <View style={styles.extIcon}><Icon size={20} color={colors.slate700} strokeWidth={2} /></View>
                <Text style={styles.extLabel}>{o.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  headerTitle: { fontFamily: fonts.headline, fontSize: 17, color: colors.onSurface },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  body: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 120 },
  sectionLabel: { fontFamily: fonts.bodySemi, fontSize: 11, color: colors.primary, textTransform: 'uppercase', letterSpacing: 1.1 },
  hRow: { gap: 18, paddingVertical: 4 },
  avatarLg: { width: 56, height: 56, borderRadius: 28 },
  avatarName: { fontFamily: fonts.body, fontSize: 11, color: colors.slate700 },
  card: { backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.outlineVariant, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  rowImg: { width: 40, height: 40, borderRadius: 12 },
  rowLabel: { flex: 1, fontFamily: fonts.bodySemi, fontSize: 13, color: colors.onSurface },
  sendBtn: { backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999 },
  sendLabel: { fontFamily: fonts.label, fontSize: 12, color: '#fff' },
  divider: { height: 1, backgroundColor: colors.outlineVariant, marginLeft: 64 },
  externalGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  extCell: { width: '48%', flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: 14 },
  extIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  extLabel: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.onSurface },
});
