import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Search, SlidersHorizontal } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

const CATEGORIES = ['All', 'Homes', 'Electronics', 'Furniture', 'Fashion', 'Services'];

const LISTINGS = [
  { id: 'm1', title: 'Solid wood dining table', price: 'INR 14,500', location: 'Indiranagar', image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { id: 'm2', title: 'iPhone 14 Pro (256GB)', price: 'INR 68,000', location: 'Koramangala', image: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { id: 'm3', title: 'Royal Enfield Classic', price: 'INR 1.45L', location: 'HSR Layout', image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { id: 'm4', title: '2BHK flat for rent', price: 'INR 32,000/mo', location: 'Whitefield', image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { id: 'm5', title: 'Cycle (6-gear)', price: 'INR 7,200', location: 'BTM', image: 'https://images.pexels.com/photos/1149601/pexels-photo-1149601.jpeg?auto=compress&cs=tinysrgb&w=500' },
  { id: 'm6', title: 'Study desk with chair', price: 'INR 4,800', location: 'Jayanagar', image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=500' },
];

export default function MarketTab() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>Bazaar</Text>
          <Text style={styles.title}>Marketplace</Text>
        </View>
        <Pressable style={styles.iconBtn}>
          <SlidersHorizontal size={18} color={colors.slate700} strokeWidth={2} />
        </Pressable>
      </View>
      <View style={styles.searchWrap}>
        <Search size={18} color={colors.slate400} strokeWidth={2} />
        <TextInput placeholder="Search products, services..." placeholderTextColor={colors.slate400} style={styles.searchInput} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsRow}>
        {CATEGORIES.map((c, i) => (
          <Pressable key={c} style={[styles.pill, i === 0 && styles.pillActive]}>
            <Text style={[styles.pillLabel, i === 0 && styles.pillLabelActive]}>{c}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {LISTINGS.map((l) => (
          <Pressable key={l.id} style={styles.card}>
            <Image source={{ uri: l.image }} style={styles.cardImg} />
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle} numberOfLines={1}>{l.title}</Text>
              <Text style={styles.cardPrice}>{l.price}</Text>
              <View style={styles.locRow}>
                <MapPin size={12} color={colors.slate500} strokeWidth={2} />
                <Text style={styles.cardLoc}>{l.location}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingTop: spacing.md,
  },
  kicker: { fontFamily: fonts.bodySemi, fontSize: 11, color: colors.primary, textTransform: 'uppercase', letterSpacing: 1.2 },
  title: { fontFamily: fonts.headline, fontSize: 22, color: colors.onSurface, marginTop: 2 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceContainerLow, alignItems: 'center', justifyContent: 'center' },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.surfaceContainerLow,
    marginHorizontal: spacing.lg, marginTop: spacing.md,
    paddingHorizontal: 14, borderRadius: 14, height: 44,
  },
  searchInput: { flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.onSurface },
  pillsRow: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: 8 },
  pill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999, backgroundColor: colors.surfaceContainer },
  pillActive: { backgroundColor: colors.primary },
  pillLabel: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.slate600 },
  pillLabelActive: { color: '#fff' },
  grid: { padding: spacing.lg, flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingBottom: 120 },
  card: {
    width: '48%', backgroundColor: colors.surface, borderRadius: 16,
    borderWidth: 1, borderColor: colors.outlineVariant, overflow: 'hidden',
  },
  cardImg: { width: '100%', height: 130 },
  cardBody: { padding: 12, gap: 4 },
  cardTitle: { fontFamily: fonts.bodySemi, fontSize: 13, color: colors.onSurface },
  cardPrice: { fontFamily: fonts.headline, fontSize: 14, color: colors.primary },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  cardLoc: { fontFamily: fonts.body, fontSize: 11, color: colors.slate500 },
});
