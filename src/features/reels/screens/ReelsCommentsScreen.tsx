import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Heart, Send } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

const COMMENTS = [
  { id: 'c1', author: 'Neha K.', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200', text: 'Absolutely stunning shot!', time: '2m', likes: 24 },
  { id: 'c2', author: 'Arjun S.', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200', text: 'Love the vibe. Where exactly is this?', time: '8m', likes: 12 },
  { id: 'c3', author: 'Priya M.', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200', text: 'Early morning CP has a magic of its own.', time: '20m', likes: 48 },
  { id: 'c4', author: 'Kabir V.', avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=200', text: 'Adding this to my weekend walk list!', time: '1h', likes: 6 },
];

export default function ReelComments() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.slate700} strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Comments</Text>
        <View style={styles.iconBtn} />
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.list}>
          {COMMENTS.map((c) => (
            <View key={c.id} style={styles.row}>
              <Image source={{ uri: c.avatar }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <View style={styles.topLine}>
                  <Text style={styles.author}>{c.author}</Text>
                  <Text style={styles.time}>{c.time}</Text>
                </View>
                <Text style={styles.text}>{c.text}</Text>
                <View style={styles.metaRow}>
                  <Pressable style={styles.likeBtn}>
                    <Heart size={13} color={colors.slate500} strokeWidth={2} />
                    <Text style={styles.likeLabel}>{c.likes}</Text>
                  </Pressable>
                  <Text style={styles.reply}>Reply</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.composer}>
          <TextInput placeholder="Add a comment..." placeholderTextColor={colors.slate400} style={styles.composerInput} />
          <Pressable style={styles.sendBtn}>
            <Send size={16} color="#fff" strokeWidth={2} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
    borderBottomWidth: 1, borderBottomColor: colors.outlineVariant,
  },
  headerTitle: { fontFamily: fonts.headline, fontSize: 17, color: colors.onSurface },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  list: { padding: spacing.lg, gap: spacing.lg },
  row: { flexDirection: 'row', gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  topLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  author: { fontFamily: fonts.bodySemi, fontSize: 13, color: colors.onSurface },
  time: { fontFamily: fonts.body, fontSize: 11, color: colors.slate400 },
  text: { fontFamily: fonts.body, fontSize: 13, color: colors.onSurface, marginTop: 2, lineHeight: 19 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 18, marginTop: 8 },
  likeBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  likeLabel: { fontFamily: fonts.body, fontSize: 11, color: colors.slate500 },
  reply: { fontFamily: fonts.bodySemi, fontSize: 11, color: colors.slate500 },
  composer: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.outlineVariant,
    backgroundColor: colors.surface,
  },
  composerInput: { flex: 1, backgroundColor: colors.surfaceContainerLow, borderRadius: 999, paddingHorizontal: 16, height: 42, fontFamily: fonts.body, fontSize: 13, color: colors.onSurface },
  sendBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
});
