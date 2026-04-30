import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Share2 } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';

interface Props {
  title: string;
}

export function DetailHeader({ title }: Props) {
  return (
    <View style={styles.header}>
      <Pressable style={styles.iconBtn} hitSlop={8} onPress={() => router.back()}>
        <ArrowLeft size={20} color={colors.slate700} strokeWidth={2} />
      </Pressable>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Pressable style={styles.iconBtn} hitSlop={8}>
        <Share2 size={18} color={colors.slate700} strokeWidth={2} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    backgroundColor: colors.surface,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { flex: 1, textAlign: 'center', fontFamily: fonts.headline, fontSize: 16, color: colors.onSurface, marginHorizontal: spacing.md },
});
