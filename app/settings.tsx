import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft, Bell, ChevronRight, Globe, Lock, LogOut, Moon, ShieldCheck, CircleUser as UserCircle2 } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

interface Row {
  id: string;
  label: string;
  icon: any;
  toggle?: boolean;
}

const SECTIONS: { title: string; rows: Row[] }[] = [
  { title: 'Account', rows: [
    { id: 'profile', label: 'Profile & personal info', icon: UserCircle2 },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'security', label: 'Security', icon: ShieldCheck },
  ]},
  { title: 'Preferences', rows: [
    { id: 'notifs', label: 'Notifications', icon: Bell, toggle: true },
    { id: 'dark', label: 'Dark mode', icon: Moon, toggle: true },
    { id: 'lang', label: 'Language . English', icon: Globe },
  ]},
];

export default function SettingsScreen() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({ notifs: true, dark: false });
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.slate700} strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.iconBtn} />
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        {SECTIONS.map((section) => (
          <View key={section.title} style={{ gap: 10 }}>
            <Text style={styles.sectionLabel}>{section.title}</Text>
            <View style={styles.card}>
              {section.rows.map((r, idx) => {
                const Icon = r.icon;
                return (
                  <View key={r.id}>
                    <Pressable style={styles.row}>
                      <View style={styles.rowIcon}><Icon size={18} color={colors.slate700} strokeWidth={2} /></View>
                      <Text style={styles.rowLabel}>{r.label}</Text>
                      {r.toggle ? (
                        <Switch
                          value={!!toggles[r.id]}
                          onValueChange={(v) => setToggles((t) => ({ ...t, [r.id]: v }))}
                          trackColor={{ true: colors.primary, false: colors.slate300 }}
                          thumbColor="#fff"
                        />
                      ) : (
                        <ChevronRight size={16} color={colors.slate400} strokeWidth={2} />
                      )}
                    </Pressable>
                    {idx < section.rows.length - 1 && <View style={styles.divider} />}
                  </View>
                );
              })}
            </View>
          </View>
        ))}
        <Pressable style={styles.logoutBtn}>
          <LogOut size={18} color={colors.error} strokeWidth={2} />
          <Text style={styles.logoutLabel}>Log out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
  },
  headerTitle: { fontFamily: fonts.headline, fontSize: 17, color: colors.onSurface },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  body: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 120 },
  sectionLabel: { fontFamily: fonts.bodySemi, fontSize: 11, color: colors.primary, textTransform: 'uppercase', letterSpacing: 1.1 },
  card: { backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.outlineVariant, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 14 },
  rowIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { flex: 1, fontFamily: fonts.body, fontSize: 14, color: colors.onSurface },
  divider: { height: 1, backgroundColor: colors.outlineVariant, marginLeft: 60 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center', paddingVertical: 14, marginTop: spacing.md },
  logoutLabel: { fontFamily: fonts.bodySemi, fontSize: 13, color: colors.error },
});
