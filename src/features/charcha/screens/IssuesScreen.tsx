import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DetailHeader } from '@/components/features/funding/DetailHeader';
import { EmptyState } from '@/components/features/funding/EmptyState';
import { colors } from '@/constants/theme';

export default function IssuesScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <DetailHeader title="Issues" />
      <View style={styles.body}>
        <EmptyState
          title="No issues raised"
          body="Community issues and complaints will be tracked here."
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  body: { flex: 1, justifyContent: 'center' },
});
