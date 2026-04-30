import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { CircleCheck as CheckCircle2 } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

export default function GroupCreatedSuccess() {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.center}>
        <View style={styles.iconWrap}>
          <CheckCircle2 size={64} color={colors.primary} strokeWidth={2} />
        </View>
        <Text style={styles.bigTitle}>Group created!</Text>
        <Text style={styles.sub}>Your new community is live. Invite people and start the first chat.</Text>
        <View style={styles.preview}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=400' }}
            style={styles.previewImg}
          />
          <Text style={styles.previewTitle}>The Creative Collective</Text>
          <Text style={styles.previewMeta}>4 members . Indiranagar</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable style={[styles.btn, styles.btnPrimary]} onPress={() => router.replace('/groups/chat' as never)}>
          <Text style={styles.btnPrimaryLabel}>Open Chat</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.btnGhost]} onPress={() => router.replace('/(tabs)/charcha' as never)}>
          <Text style={styles.btnGhostLabel}>Back to Charcha</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: 10 },
  iconWrap: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.primaryContainer, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  bigTitle: { fontFamily: fonts.headline, fontSize: 24, color: colors.onSurface, textAlign: 'center' },
  sub: { fontFamily: fonts.body, fontSize: 14, color: colors.onSurfaceVariant, textAlign: 'center', lineHeight: 21 },
  preview: { marginTop: spacing.xl, alignItems: 'center', gap: 6 },
  previewImg: { width: 96, height: 96, borderRadius: 24 },
  previewTitle: { fontFamily: fonts.headline, fontSize: 17, color: colors.onSurface },
  previewMeta: { fontFamily: fonts.body, fontSize: 12, color: colors.slate500 },
  footer: { padding: spacing.lg, gap: 10 },
  btn: { paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  btnPrimary: { backgroundColor: colors.primary },
  btnPrimaryLabel: { fontFamily: fonts.label, fontSize: 14, color: '#fff' },
  btnGhost: { backgroundColor: colors.surfaceContainerLow },
  btnGhostLabel: { fontFamily: fonts.label, fontSize: 14, color: colors.slate700 },
});
