import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bookmark, TrendingUp } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

const CATEGORIES = ['For You', 'Local', 'Politics', 'Business', 'Tech', 'Sports'];

const ARTICLES = [
  {
    id: 'n1',
    title: 'Metro Phase-4 line to open ahead of schedule',
    source: 'Delhi Times',
    time: '2h ago',
    image: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'Local',
  },
  {
    id: 'n2',
    title: 'Startup funding in India rebounds as investor confidence returns',
    source: 'Mint',
    time: '4h ago',
    image: 'https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'Business',
  },
  {
    id: 'n3',
    title: 'Neighbourhood clean-up drive draws 500+ volunteers',
    source: 'The Hindu',
    time: '6h ago',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'Local',
  },
  {
    id: 'n4',
    title: 'New co-working hubs spring up in tier-2 cities',
    source: 'Economic Times',
    time: '12h ago',
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: 'Tech',
  },
];

export default function NewsTab() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>Today</Text>
          <Text style={styles.title}>News around you</Text>
        </View>
        <View style={styles.iconBtn}>
          <TrendingUp size={20} color={colors.primary} strokeWidth={2} />
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsRow}>
        {CATEGORIES.map((c, i) => (
          <Pressable key={c} style={[styles.pill, i === 0 && styles.pillActive]}>
            <Text style={[styles.pillLabel, i === 0 && styles.pillLabelActive]}>{c}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {ARTICLES.map((a) => (
          <Pressable key={a.id} style={styles.card}>
            <Image source={{ uri: a.image }} style={styles.cardImg} />
            <View style={styles.cardBody}>
              <Text style={styles.cardTag}>{a.tag}</Text>
              <Text style={styles.cardTitle} numberOfLines={2}>{a.title}</Text>
              <View style={styles.cardMetaRow}>
                <Text style={styles.cardMeta}>{a.source} . {a.time}</Text>
                <Bookmark size={16} color={colors.slate400} strokeWidth={2} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  kicker: {
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  title: { fontFamily: fonts.headline, fontSize: 22, color: colors.onSurface, marginTop: 2 },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
  },
  pillsRow: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: 8 },
  pill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999, backgroundColor: colors.surfaceContainer },
  pillActive: { backgroundColor: colors.primary },
  pillLabel: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.slate600 },
  pillLabelActive: { color: '#fff' },
  list: { padding: spacing.lg, gap: spacing.md, paddingBottom: 120 },
  card: { flexDirection: 'row', gap: 12, backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.outlineVariant, padding: 12 },
  cardImg: { width: 96, height: 96, borderRadius: 12 },
  cardBody: { flex: 1, justifyContent: 'space-between' },
  cardTag: { fontFamily: fonts.bodySemi, fontSize: 10, color: colors.primary, textTransform: 'uppercase', letterSpacing: 0.8 },
  cardTitle: { fontFamily: fonts.headline, fontSize: 15, color: colors.onSurface, lineHeight: 20, marginTop: 4 },
  cardMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  cardMeta: { fontFamily: fonts.body, fontSize: 11, color: colors.slate500 },
});
