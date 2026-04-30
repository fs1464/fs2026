import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Calendar, Clock, MapPin, Users } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

export default function RecreateActivity() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={colors.slate700} strokeWidth={2} />
        </Pressable>
        <Text style={styles.headerTitle}>Recreate Activity</Text>
        <View style={styles.iconBtn} />
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800' }}
          style={styles.hero}
        />
        <Text style={styles.title}>Morning Cricket Match</Text>
        <Text style={styles.subtitle}>Bring it back for Sunday, same spot same time.</Text>
        <View style={styles.infoGrid}>
          <InfoCell icon={<Calendar size={16} color={colors.primary} strokeWidth={2} />} label="Date" value="Sun, 5 May" />
          <InfoCell icon={<Clock size={16} color={colors.primary} strokeWidth={2} />} label="Time" value="06:00 AM" />
          <InfoCell icon={<MapPin size={16} color={colors.primary} strokeWidth={2} />} label="Location" value="Sec 12 Ground" />
          <InfoCell icon={<Users size={16} color={colors.primary} strokeWidth={2} />} label="Going" value="8 / 14" />
        </View>
        <Text style={styles.section}>Highlights from last time</Text>
        <View style={styles.card}>
          <Text style={styles.bullet}>. 11 players, 22 overs, 4 sixes</Text>
          <Text style={styles.bullet}>. Team A won by 6 wickets</Text>
          <Text style={styles.bullet}>. Post-match chai at Raju's tapri</Text>
        </View>
        <Pressable style={styles.primaryBtn}>
          <Text style={styles.primaryLabel}>Recreate & notify members</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoCell({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <View style={styles.infoCell}>
      <View style={styles.infoIcon}>{icon}</View>
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  headerTitle: { fontFamily: fonts.headline, fontSize: 17, color: colors.onSurface },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  body: { padding: spacing.lg, gap: spacing.md, paddingBottom: 120 },
  hero: { width: '100%', height: 180, borderRadius: 16 },
  title: { fontFamily: fonts.headline, fontSize: 22, color: colors.onSurface, marginTop: spacing.sm },
  subtitle: { fontFamily: fonts.body, fontSize: 13, color: colors.onSurfaceVariant, lineHeight: 20 },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: spacing.sm },
  infoCell: { width: '48%', flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.outlineVariant, padding: 12 },
  infoIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: colors.primaryContainer, alignItems: 'center', justifyContent: 'center' },
  infoLabel: { fontFamily: fonts.body, fontSize: 10, color: colors.slate500, textTransform: 'uppercase', letterSpacing: 0.5 },
  infoValue: { fontFamily: fonts.bodySemi, fontSize: 13, color: colors.onSurface },
  section: { fontFamily: fonts.bodySemi, fontSize: 11, color: colors.primary, textTransform: 'uppercase', letterSpacing: 1.1, marginTop: spacing.md },
  card: { backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.outlineVariant, padding: 14, gap: 6 },
  bullet: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: colors.onSurfaceVariant },
  primaryBtn: { marginTop: spacing.md, backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  primaryLabel: { fontFamily: fonts.label, fontSize: 14, color: '#fff' },
});
