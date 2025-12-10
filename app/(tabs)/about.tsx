
import { View, Text, StyleSheet, ScrollView, Platform,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { colors, shadows, gradients } from "@/styles/commonStyles";

import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/IconSymbol";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";

export default function AboutScreen() {
  const floatY = useSharedValue(0);

  React.useEffect(() => {
    floatY.value = withRepeat(
      withSequence(
        withTiming(-15, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, [floatY]);

  const floatingStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: floatY.value }],
    };
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with floating animation */}
        <Animated.View style={[styles.header, floatingStyle]}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={gradients.primary}
              style={styles.avatarGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
             <View style={styles.avatar}>
  <Image
    source={require("@/assets/saila.jpg")} // 👈 put your image in assets folder
    style={styles.avatarImage}
  />
</View>

            </LinearGradient>
          </View>
          <Text style={styles.name}>Saila Hatira</Text>
          <Text style={styles.title}>Creative Developer & Cybersecurity engineer</Text>
        </Animated.View>

        {/* Bio Section */}
        <View style={styles.card}>
          <LinearGradient
            colors={['rgba(30, 36, 66, 0.95)', 'rgba(47, 54, 88, 0.8)']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={gradients.primary}
                  style={styles.iconGradient}
                >
                  <IconSymbol name="doc.text.fill" size={24} color={colors.text} />
                </LinearGradient>
              </View>
              <Text style={styles.cardTitle}>About Me</Text>
            </View>
            <Text style={styles.bioText}>
              I&apos;m a passionate developer with a love for creating beautiful and functional digital experiences. 
              With over 5 years of experience in the industry, I specialize in mobile and web development, 
              focusing on user-centric design and clean, maintainable code.
            </Text>
            <Text style={styles.bioText}>
              My journey in tech started with a curiosity about how things work, and it has evolved into 
              a career dedicated to building innovative solutions that make a difference.
            </Text>
          </LinearGradient>
        </View>


        {/* Values Section */}
        <View style={styles.card}>
          <LinearGradient
            colors={['rgba(30, 36, 66, 0.95)', 'rgba(47, 54, 88, 0.8)']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={gradients.accent}
                  style={styles.iconGradient}
                >
                  <IconSymbol name="heart.fill" size={24} color={colors.text} />
                </LinearGradient>
              </View>
              <Text style={styles.cardTitle}>Core Values</Text>
            </View>
            <View style={styles.valuesList}>
              <View style={styles.valueItem}>
                <View style={styles.valueDot}>
                  <LinearGradient
                    colors={gradients.primary}
                    style={styles.valueDotGradient}
                  />
                </View>
                <View style={styles.valueContent}>
                  <Text style={styles.valueTitle}>Innovation</Text>
                  <Text style={styles.valueDescription}>
                    Always exploring new technologies and approaches
                  </Text>
                </View>
              </View>
              <View style={styles.valueItem}>
                <View style={styles.valueDot}>
                  <LinearGradient
                    colors={gradients.secondary}
                    style={styles.valueDotGradient}
                  />
                </View>
                <View style={styles.valueContent}>
                  <Text style={styles.valueTitle}>Quality</Text>
                  <Text style={styles.valueDescription}>
                    Committed to delivering excellence in every project
                  </Text>
                </View>
              </View>
              <View style={styles.valueItem}>
                <View style={styles.valueDot}>
                  <LinearGradient
                    colors={gradients.accent}
                    style={styles.valueDotGradient}
                  />
                </View>
                <View style={styles.valueContent}>
                  <Text style={styles.valueTitle}>Collaboration</Text>
                  <Text style={styles.valueDescription}>
                    Working together to achieve amazing results
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        
        {/* Education Section */}
        <View style={[styles.card, styles.lastCard]}>
          <LinearGradient
            colors={['rgba(30, 36, 66, 0.95)', 'rgba(47, 54, 88, 0.8)']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={gradients.secondary}
                  style={styles.iconGradient}
                >
                  <IconSymbol name="graduationcap.fill" size={24} color={colors.text} />
                </LinearGradient>
              </View>
              <Text style={styles.cardTitle}>Education</Text>
            </View>
            <View style={styles.educationItem}>
              <Text style={styles.degree}>Bachelor’s Degree in Software Engineering and Information Systems

</Text>
              <Text style={styles.school}>Higher Institute of Computer Science and Mathematics of Monastir</Text>
              <Text style={styles.year}>Graduated: 2023</Text>
            </View>
            <View style={styles.educationItem}>
              <Text style={styles.degree}>Engineering degree in Network and Cybersecurity
</Text>
              <Text style={styles.school}>TEK-UP university</Text>
              <Text style={styles.year}>Graduation in : 2026</Text>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatarGradient: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.glow,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(10, 14, 39, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  card: {
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    ...shadows.large,
  },
  lastCard: {
    marginBottom: 40,
  },
  cardGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    ...shadows.medium,
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  bioText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 26,
    marginBottom: 16,
  },
  valuesList: {
    gap: 20,
  },
  valueItem: {
    flexDirection: 'row',
    gap: 16,
  },
  valueDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 4,
    overflow: 'hidden',
  },
  valueDotGradient: {
    width: '100%',
    height: '100%',
  },
  valueContent: {
    flex: 1,
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  valueDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  interestCard: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.medium,
  },
  interestGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  interestLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  educationItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  degree: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  school: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  year: {
    fontSize: 14,
    color: colors.textTertiary,
  },
  avatarImage: {
  width: 100,
  height: 100,
  borderRadius: 60, // makes it circular
  resizeMode: "cover",
},

});
