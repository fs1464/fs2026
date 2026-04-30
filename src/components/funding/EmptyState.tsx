import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Plus } from 'lucide-react-native';
import { colors, fonts } from '@/constants/theme';

interface Props {
  title: string;
  body: string;
  ctaLabel?: string;
  onCta?: () => void;
}

export function EmptyState({ title, body, ctaLabel, onCta }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconWrap}>
        <Plus size={28} color={colors.primary} strokeWidth={2.25} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {ctaLabel && onCta && (
        <Pressable onPress={onCta} style={styles.cta}>
          <Text style={styles.ctaLabel}>{ctaLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', padding: 32, gap: 8 },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: { fontFamily: fonts.headline, fontSize: 16, color: colors.onSurface },
  body: { fontFamily: fonts.body, fontSize: 13, color: colors.onSurfaceVariant, textAlign: 'center', lineHeight: 19 },
  cta: {
    marginTop: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  ctaLabel: { fontFamily: fonts.label, fontSize: 13, color: colors.onPrimary },
});
