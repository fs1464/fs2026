import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { DetailHeader } from '@/components/features/funding/DetailHeader';
import { colors, fonts, spacing } from '@/constants/theme';

export default function EventDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <DetailHeader title="Event" />
      <View style={styles.body}>
        <Text style={styles.text}>Details for {id}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  text: { fontFamily: fonts.body, fontSize: 14, color: colors.onSurface },
});
