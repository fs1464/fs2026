import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Hash, MapPin, Music } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

export default function PostReelScreen() {
  const [caption, setCaption] = useState('');
  const [allowComments, setAllowComments] = useState(true);
  const [saveLocal, setSaveLocal] = useState(false);
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.slate700} strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Post Reel</Text>
        <Pressable style={styles.postBtn}>
          <Text style={styles.postLabel}>Post</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.composerRow}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300' }}
            style={styles.thumb}
          />
          <TextInput
            placeholder="Write a caption..."
            placeholderTextColor={colors.slate400}
            multiline
            value={caption}
            onChangeText={setCaption}
            style={styles.captionInput}
          />
        </View>
        <View style={styles.metaCard}>
          <Row icon={<Hash size={18} color={colors.slate700} strokeWidth={2} />} label="Add hashtags" />
          <Divider />
          <Row icon={<MapPin size={18} color={colors.slate700} strokeWidth={2} />} label="Tag location" />
          <Divider />
          <Row icon={<Music size={18} color={colors.slate700} strokeWidth={2} />} label="Add music" />
        </View>
        <Text style={styles.sectionLabel}>Sharing</Text>
        <View style={styles.metaCard}>
          <ToggleRow label="Allow comments" value={allowComments} onChange={setAllowComments} />
          <Divider />
          <ToggleRow label="Save to device" value={saveLocal} onChange={setSaveLocal} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Pressable style={styles.row}>
      <View style={styles.rowIcon}>{icon}</View>
      <Text style={styles.rowLabel}>{label}</Text>
    </Pressable>
  );
}
function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, { marginLeft: 0 }]}>{label}</Text>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: colors.primary, false: colors.slate300 }} thumbColor="#fff" />
    </View>
  );
}
function Divider() { return <View style={styles.divider} />; }

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
    borderBottomWidth: 1, borderBottomColor: colors.outlineVariant,
  },
  headerTitle: { fontFamily: fonts.headline, fontSize: 17, color: colors.onSurface },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  postBtn: { paddingHorizontal: 16, height: 40, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  postLabel: { fontFamily: fonts.label, fontSize: 13, color: '#fff' },
  body: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 120 },
  composerRow: { flexDirection: 'row', gap: 12 },
  thumb: { width: 84, height: 112, borderRadius: 12 },
  captionInput: {
    flex: 1, minHeight: 112, fontFamily: fonts.body, fontSize: 14, color: colors.onSurface,
    backgroundColor: colors.surfaceContainerLow, borderRadius: 12, padding: 12, textAlignVertical: 'top',
  },
  metaCard: { backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.outlineVariant, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 14 },
  rowIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { flex: 1, fontFamily: fonts.body, fontSize: 14, color: colors.onSurface, marginLeft: 0 },
  divider: { height: 1, backgroundColor: colors.outlineVariant },
  sectionLabel: { fontFamily: fonts.bodySemi, fontSize: 11, color: colors.primary, textTransform: 'uppercase', letterSpacing: 1.1 },
});
