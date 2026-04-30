import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, spacing } from '@/constants/theme';

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.body}>
        <Text style={styles.title}>Welcome aboard</Text>
        <Text style={styles.body_}>Let's set up your neighborhood profile.</Text>
        <Pressable style={styles.cta}>
          <Text style={styles.ctaLabel}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.md },
  title: { fontFamily: fonts.headline, fontSize: 22, color: colors.onSurface },
  body_: { fontFamily: fonts.body, fontSize: 14, color: colors.onSurfaceVariant, textAlign: 'center' },
  cta: { backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, marginTop: spacing.lg },
  ctaLabel: { fontFamily: fonts.label, fontSize: 13, color: colors.onPrimary },
});
