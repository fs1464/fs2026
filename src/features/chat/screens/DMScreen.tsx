import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { DetailHeader } from '@/components/features/funding/DetailHeader';
import { EmptyState } from '@/components/features/funding/EmptyState';
import { colors } from '@/constants/theme';

export default function DMScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <DetailHeader title={`DM ${userId ?? ''}`} />
      <View style={styles.body}>
        <EmptyState title="Direct message" body={`Conversation with user ${userId ?? ''}`} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  body: { flex: 1, justifyContent: 'center' },
});
