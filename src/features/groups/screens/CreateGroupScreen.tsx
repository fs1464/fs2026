import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

const CATEGORIES = ['Activities', 'Events', 'Parenting', 'Food', 'Fitness', 'Volunteering', 'Local'];

export default function CreateGroupScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set(['Activities']));

  const toggle = (c: string) => {
    setSelected((s) => {
      const n = new Set(s);
      n.has(c) ? n.delete(c) : n.add(c);
      return n;
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.slate700} strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Create Group</Text>
        <Pressable style={styles.nextBtn} onPress={() => router.push('/groups/members' as never)}>
          <Text style={styles.nextLabel}>Next</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.coverWrap}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.cover}
          />
          <Pressable style={styles.coverBtn}>
            <Camera size={18} color="#fff" strokeWidth={2} />
            <Text style={styles.coverBtnLabel}>Change cover</Text>
          </Pressable>
        </View>
        <Text style={styles.sectionLabel}>Basic info</Text>
        <View style={{ gap: spacing.md }}>
          <TextInput
            placeholder="Group name"
            placeholderTextColor={colors.slate400}
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Describe your group"
            placeholderTextColor={colors.slate400}
            value={description}
            onChangeText={setDescription}
            multiline
            style={[styles.input, { minHeight: 96, textAlignVertical: 'top', paddingTop: 14 }]}
          />
        </View>
        <Text style={styles.sectionLabel}>Categorize your pulse</Text>
        <View style={styles.chipWrap}>
          {CATEGORIES.map((c) => {
            const on = selected.has(c);
            return (
              <Pressable key={c} onPress={() => toggle(c)} style={[styles.chip, on && styles.chipActive]}>
                <Text style={[styles.chipLabel, on && styles.chipLabelActive]}>{c}</Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.sectionLabel}>Pin to neighborhood</Text>
        <View style={styles.pinCard}>
          <Text style={styles.pinName}>Indiranagar, Bengaluru</Text>
          <Text style={styles.pinMeta}>Group will appear to 4,200+ nearby residents</Text>
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
  nextBtn: { paddingHorizontal: 16, height: 40, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  nextLabel: { fontFamily: fonts.label, fontSize: 13, color: '#fff' },
  body: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 120 },
  coverWrap: { position: 'relative', borderRadius: 16, overflow: 'hidden' },
  cover: { width: '100%', height: 140 },
  coverBtn: {
    position: 'absolute', bottom: 12, right: 12,
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999,
  },
  coverBtnLabel: { fontFamily: fonts.bodySemi, fontSize: 12, color: '#fff' },
  sectionLabel: { fontFamily: fonts.bodySemi, fontSize: 11, color: colors.primary, textTransform: 'uppercase', letterSpacing: 1.1 },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 14, fontFamily: fonts.body, fontSize: 14, color: colors.onSurface },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: colors.surfaceContainer },
  chipActive: { backgroundColor: colors.primaryContainer, borderWidth: 1, borderColor: colors.primary },
  chipLabel: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.slate600 },
  chipLabelActive: { color: colors.onPrimaryContainer },
  pinCard: { backgroundColor: colors.surfaceContainerLow, borderRadius: 14, padding: 14, gap: 4 },
  pinName: { fontFamily: fonts.bodySemi, fontSize: 13, color: colors.onSurface },
  pinMeta: { fontFamily: fonts.body, fontSize: 12, color: colors.slate500 },
});
