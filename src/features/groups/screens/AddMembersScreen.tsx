import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Check, Search, X } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

const PEOPLE = [
  { id: 'p1', name: 'Priya Mehra', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'p2', name: 'Arjun Singh', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'p3', name: 'Neha Kapoor', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'p4', name: 'Kabir Verma', avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'p5', name: 'Sneha Patel', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 'p6', name: 'Rohit Shah', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

export default function AddMembersScreen() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['p1', 'p2', 'p3', 'p4']));
  const toggle = (id: string) =>
    setSelected((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const selectedList = PEOPLE.filter((p) => selected.has(p.id));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.slate700} strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Add Members</Text>
        <Pressable style={styles.createBtn} onPress={() => router.replace('/groups/success' as never)}>
          <Text style={styles.createLabel}>Create</Text>
        </Pressable>
      </View>
      <View style={styles.searchWrap}>
        <Search size={18} color={colors.slate400} strokeWidth={2} />
        <TextInput placeholder="Search people..." placeholderTextColor={colors.slate400} style={styles.searchInput} />
      </View>
      <View style={{ paddingHorizontal: spacing.lg }}>
        <Text style={styles.sectionLabel}>Selected Members ({selectedList.length})</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.selectedRow}>
          {selectedList.map((p) => (
            <View key={p.id} style={styles.selectedChip}>
              <Image source={{ uri: p.avatar }} style={styles.chipAvatar} />
              <Text style={styles.chipName}>{p.name.split(' ')[0]}</Text>
              <Pressable onPress={() => toggle(p.id)}>
                <X size={14} color={colors.slate500} strokeWidth={2} />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {PEOPLE.map((p) => {
          const on = selected.has(p.id);
          return (
            <Pressable key={p.id} onPress={() => toggle(p.id)} style={styles.row}>
              <Image source={{ uri: p.avatar }} style={styles.avatar} />
              <Text style={styles.personName}>{p.name}</Text>
              <View style={[styles.check, on && styles.checkOn]}>
                {on && <Check size={14} color="#fff" strokeWidth={3} />}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  headerTitle: { fontFamily: fonts.headline, fontSize: 17, color: colors.primary },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  createBtn: { paddingHorizontal: 16, height: 40, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  createLabel: { fontFamily: fonts.label, fontSize: 13, color: '#fff' },
  searchWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surfaceContainerLow, marginHorizontal: spacing.lg, paddingHorizontal: 14, borderRadius: 14, height: 44 },
  searchInput: { flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.onSurface },
  sectionLabel: { fontFamily: fonts.bodySemi, fontSize: 11, color: colors.slate400, textTransform: 'uppercase', letterSpacing: 1.1, marginTop: spacing.md, marginBottom: spacing.sm },
  selectedRow: { gap: 8, paddingBottom: spacing.md },
  selectedChip: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingLeft: 4, paddingRight: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: colors.surfaceContainer },
  chipAvatar: { width: 24, height: 24, borderRadius: 12 },
  chipName: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.onSurface },
  list: { padding: spacing.lg, gap: spacing.md, paddingBottom: 120 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  personName: { flex: 1, fontFamily: fonts.bodySemi, fontSize: 14, color: colors.onSurface },
  check: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.slate300, alignItems: 'center', justifyContent: 'center' },
  checkOn: { backgroundColor: colors.primary, borderColor: colors.primary },
});
