import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors, fonts } from '@/constants/theme';

interface Props extends TextInputProps {
  label: string;
  error?: string | null;
  helper?: string;
}

export function Field({ label, error, helper, style, ...rest }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.slate400}
        style={[styles.input, error && styles.inputError, style]}
        {...rest}
      />
      {!!helper && !error && <Text style={styles.helper}>{helper}</Text>}
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  label: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.slate700 },
  input: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.onSurface,
  },
  inputError: { borderColor: colors.error },
  helper: { fontFamily: fonts.body, fontSize: 11, color: colors.slate500 },
  error: { fontFamily: fonts.body, fontSize: 11, color: colors.error },
});
