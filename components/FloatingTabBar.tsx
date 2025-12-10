
import { useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, shadows } from '@/styles/commonStyles';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

// Individual tab component with enhanced animations
function TabButton({ 
  tab, 
  active, 
  onPress,
  index,
  totalTabs,
}: { 
  tab: TabBarItem; 
  active: boolean; 
  onPress: () => void;
  index: number;
  totalTabs: number;
}) {
  const scale = useSharedValue(active ? 1 : 0.85);
  const translateY = useSharedValue(active ? -8 : 0);
  const iconScale = useSharedValue(active ? 1.2 : 1);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(scale.value, { damping: 15, stiffness: 150 }) },
        { translateY: withSpring(translateY.value, { damping: 15, stiffness: 150 }) },
      ],
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(iconScale.value, { damping: 12, stiffness: 200 }) },
        { 
          rotateZ: active 
            ? withSpring('0deg', { damping: 15 }) 
            : withSpring('0deg', { damping: 15 })
        },
      ],
    };
  });

  const animatedLabelStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.6, { duration: 200 }),
      transform: [
        { scale: withSpring(active ? 1 : 0.9, { damping: 15 }) },
      ],
    };
  });

  React.useEffect(() => {
    scale.value = active ? 1 : 0.85;
    translateY.value = active ? -8 : 0;
    iconScale.value = active ? 1.2 : 1;
  }, [active, scale, translateY, iconScale]);

  return (
    <TouchableOpacity
      style={styles.tab}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Animated.View style={[styles.tabContent, animatedContainerStyle]}>
        {active && (
          <View style={styles.activeIndicator}>
            <LinearGradient
              colors={['rgba(102, 126, 234, 0.3)', 'rgba(118, 75, 162, 0.2)']}
              style={styles.activeGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          </View>
        )}
        <Animated.View style={animatedIconStyle}>
          <IconSymbol
            name={tab.icon as any}
            size={26}
            color={active ? colors.primary : colors.textSecondary}
          />
        </Animated.View>
        <Animated.Text
          style={[
            styles.tabLabel,
            animatedLabelStyle,
            {
              color: active ? colors.text : colors.textSecondary,
              fontWeight: active ? '700' : '500',
            },
          ]}
        >
          {tab.label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 40,
  borderRadius = 28,
  bottomMargin = 20,
}: FloatingTabBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();

  const handleTabPress = (route: string) => {
    console.log('Tab pressed:', route);
    router.push(route as any);
  };

  const isActive = (route: string) => {
    return pathname.includes(route.replace('/(tabs)', ''));
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { marginBottom: bottomMargin }]}
      edges={['bottom']}
    >
      <View style={[styles.container, { width: containerWidth }]}>
        <View style={[styles.shadowContainer, { borderRadius }]}>
          <LinearGradient
            colors={['rgba(102, 126, 234, 0.15)', 'rgba(118, 75, 162, 0.1)']}
            style={[styles.gradientBorder, { borderRadius }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <BlurView
              intensity={100}
              tint="dark"
              style={[styles.blurContainer, { borderRadius: borderRadius - 2 }]}
            >
              <View style={styles.innerContainer}>
                <View style={styles.tabsContainer}>
                  {tabs.map((tab, index) => (
                    <TabButton
                      key={tab.name}
                      tab={tab}
                      active={isActive(tab.route)}
                      onPress={() => handleTabPress(tab.route)}
                      index={index}
                      totalTabs={tabs.length}
                    />
                  ))}
                </View>
              </View>
            </BlurView>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'box-none',
  },
  shadowContainer: {
    width: '100%',
    ...shadows.glow,
  },
  gradientBorder: {
    padding: 2,
  },
  blurContainer: {
    overflow: 'hidden',
    backgroundColor: 'rgba(10, 14, 39, 0.7)',
  },
  innerContainer: {
    backgroundColor: 'rgba(10, 14, 39, 0.3)',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    overflow: 'hidden',
  },
  activeGradient: {
    flex: 1,
    borderRadius: 16,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 6,
    letterSpacing: 0.3,
  },
});
