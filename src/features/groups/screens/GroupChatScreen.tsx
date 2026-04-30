import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Calendar, Info, Paperclip, Send, Smile } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

const MSGS = [
  { id: 'm1', from: 'Priya', text: 'Anyone up for cricket this Sunday 6am?', mine: false, time: '09:12', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'm2', from: 'me', text: 'I am in! Same spot as last time?', mine: true, time: '09:14' },
  { id: 'm3', from: 'Arjun', text: 'Count me in. Bringing the new bat.', mine: false, time: '09:17', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'm4', from: 'me', text: 'Great. I will bring water bottles and a first aid.', mine: true, time: '09:18' },
];

export default function GroupChatScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.slate700} strokeWidth={2} />
        </Pressable>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Sector 12 Cricket Toli</Text>
          <Text style={styles.subtitle}>14 members . 4 online</Text>
        </View>
        <Pressable style={styles.iconBtn} onPress={() => router.push('/groups/details' as never)}>
          <Info size={18} color={colors.slate700} strokeWidth={2} />
        </Pressable>
      </View>
      <Pressable style={styles.activityBanner} onPress={() => router.push('/groups/recreate' as never)}>
        <View style={styles.bannerIcon}><Calendar size={18} color={colors.primary} strokeWidth={2} /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>Recreate last activity</Text>
          <Text style={styles.bannerSub}>Morning Cricket Match . Sunday 6am</Text>
        </View>
        <Text style={styles.bannerCta}>Plan</Text>
      </Pressable>
      <ScrollView contentContainerStyle={styles.messages}>
        {MSGS.map((m) => (
          <View key={m.id} style={[styles.msgRow, m.mine && { justifyContent: 'flex-end' }]}>
            {!m.mine && <Image source={{ uri: m.avatar }} style={styles.msgAvatar} />}
            <View style={[styles.bubble, m.mine ? styles.bubbleMine : styles.bubbleTheirs]}>
              {!m.mine && <Text style={styles.bubbleName}>{m.from}</Text>}
              <Text style={[styles.bubbleText, m.mine && { color: '#fff' }]}>{m.text}</Text>
              <Text style={[styles.bubbleTime, m.mine && { color: 'rgba(255,255,255,0.7)' }]}>{m.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.composer}>
        <Pressable style={styles.composerIcon}><Paperclip size={18} color={colors.slate500} strokeWidth={2} /></Pressable>
        <TextInput placeholder="Message..." placeholderTextColor={colors.slate400} style={styles.input} />
        <Pressable style={styles.composerIcon}><Smile size={18} color={colors.slate500} strokeWidth={2} /></Pressable>
        <Pressable style={styles.sendBtn}>
          <Send size={16} color="#fff" strokeWidth={2} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.outlineVariant, gap: 10 },
  title: { fontFamily: fonts.headline, fontSize: 16, color: colors.onSurface },
  subtitle: { fontFamily: fonts.body, fontSize: 11, color: colors.slate500, marginTop: 1 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  activityBanner: { flexDirection: 'row', alignItems: 'center', gap: 12, margin: spacing.lg, padding: 12, backgroundColor: colors.primaryContainer, borderRadius: 14 },
  bannerIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  bannerTitle: { fontFamily: fonts.bodySemi, fontSize: 13, color: colors.onPrimaryContainer },
  bannerSub: { fontFamily: fonts.body, fontSize: 11, color: colors.onPrimaryContainer, opacity: 0.85 },
  bannerCta: { fontFamily: fonts.label, fontSize: 12, color: colors.primary, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#fff', borderRadius: 999 },
  messages: { padding: spacing.lg, gap: 12, paddingBottom: 100 },
  msgRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-end' },
  msgAvatar: { width: 28, height: 28, borderRadius: 14 },
  bubble: { maxWidth: '78%', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 14, gap: 2 },
  bubbleTheirs: { backgroundColor: colors.surfaceContainer, borderBottomLeftRadius: 4 },
  bubbleMine: { backgroundColor: colors.primary, borderBottomRightRadius: 4 },
  bubbleName: { fontFamily: fonts.bodySemi, fontSize: 11, color: colors.primary },
  bubbleText: { fontFamily: fonts.body, fontSize: 13, color: colors.onSurface, lineHeight: 19 },
  bubbleTime: { fontFamily: fonts.body, fontSize: 10, color: colors.slate400, alignSelf: 'flex-end', marginTop: 2 },
  composer: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, borderTopWidth: 1, borderTopColor: colors.outlineVariant, backgroundColor: colors.surface },
  composerIcon: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  input: { flex: 1, backgroundColor: colors.surfaceContainerLow, borderRadius: 999, paddingHorizontal: 14, height: 40, fontFamily: fonts.body, fontSize: 13, color: colors.onSurface },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
});
