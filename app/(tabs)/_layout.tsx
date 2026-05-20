import { Stack, Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface TabProps {
  color: string;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}>
        <Tabs.Screen name="[uid]" options={{ href: null }} />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }: TabProps) => {
              return <IconSymbol size={28} name="house.fill" color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="camera"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }: TabProps) => <IconSymbol size={28} name="camera.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="logout"
          options={{
            title: 'Déconnexion',
            tabBarIcon: ({ color }: TabProps) => <IconSymbol size={28} name="person" color={color} />,
          }}
        />
      </Tabs>


  );
}
