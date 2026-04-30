import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DetailHeader } from '@/components/features/funding/DetailHeader';
import { EmptyState } from '@/components/features/funding/EmptyState';
import { colors } from '@/constants/theme';

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <DetailHeader title="Notifications" />
      <View style={styles.body}>
        <EmptyState title="No notifications" body="You're all caught up. New activity will show up here." />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  body: { flex: 1, justifyContent: 'center' },
});
