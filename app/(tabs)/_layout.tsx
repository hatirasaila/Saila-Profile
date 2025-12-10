
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  // Define the tabs configuration
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'house.fill',
      label: 'Home',
    },
    {
      name: 'about',
      route: '/(tabs)/about',
      icon: 'person.fill',
      label: 'About',
    },
    {
      name: 'experience',
      route: '/(tabs)/experience',
      icon: 'doc.text.fill',
      label: 'Experience',
    },
    {
      name: 'skills',
      route: '/(tabs)/skills',
      icon: 'star.fill',
      label: 'Skills',
    },
      {
      name: 'Projects',
      route: '/(tabs)/projects',
      icon: 'folder.fill',
      label: 'Projects',
    },
  
  ];

  // Use NativeTabs for iOS, custom FloatingTabBar for Android and Web
  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="house.fill" drawable="ic_home" />
          <Label>Home</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="about">
          <Icon sf="person.fill" drawable="ic_about" />
          <Label>About</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="experience">
          <Icon sf="doc.text.fill" drawable="ic_experience" />
          <Label>Experience</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="skills">
          <Icon sf="star.fill" drawable="ic_skills" />
          <Label>Skills</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="projects">
          <Icon sf="folder.fill" drawable="ic_projects" />
          <Label>Projects</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // For Android and Web, use Stack navigation with custom floating tab bar
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="about" />
        <Stack.Screen name="experience" />
        <Stack.Screen name="skills" />
        <Stack.Screen name="projects" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
