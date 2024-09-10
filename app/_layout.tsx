import { Stack } from 'expo-router';
import { ThemeProvider } from 'styled-components';
import theme from '@/theme';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from '@/components/Loading';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function RootLayout() {
  const [loaded, error] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <View style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_600 }}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" />
        {loaded ? (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="new-group" />
            <Stack.Screen name="players" />
          </Stack>
        ) : (
          <Loading />
        )}
      </ThemeProvider>
    </View>
  );
}
