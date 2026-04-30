import { Stack } from 'expo-router';

export default function CharchaLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="ask" />
      <Stack.Screen name="issues" />
      <Stack.Screen name="news" />
    </Stack>
  );
}
