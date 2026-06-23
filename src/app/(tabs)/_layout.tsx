import { BarnagardColors } from '@/constants/barnagard';
import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: BarnagardColors.screenBackground,
        },
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
