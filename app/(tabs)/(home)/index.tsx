
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { StyleSheet, View, Text, ScrollView, Platform, Dimensions, Image } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, shadows, gradients } from "@/styles/commonStyles";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
  useAnimatedScrollHandler,
  Extrapolation,
} from "react-native-reanimated";

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  // Animated values for 3D effects
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const floatY = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const particleRotation = useSharedValue(0);

  useEffect(() => {
    // Continuous rotation animation
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 25000,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    // Floating animation
    floatY.value = withRepeat(
      withSequence(
        withTiming(-30, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // Pulse scale animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // Particle rotation
    particleRotation.value = withRepeat(
      withTiming(360, {
        duration: 40000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [rotation, scale, floatY, particleRotation]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

const animatedSphereStyle = useAnimatedStyle(() => {
  const parallaxY = interpolate(
    scrollY.value,
    [0, 300],
    [0, -100],
    Extrapolation.CLAMP
  );

  return {
    transform: [
      { rotateY: `${rotation.value}deg` }, // Only rotate around Y-axis
      { scale: scale.value },
      { translateY: floatY.value + parallaxY },
    ],
  };
});

  // Animated styles for orbiting particles
  const createOrbitStyle = (offset: number, radius: number) => {
    return useAnimatedStyle(() => {
      const angle = ((rotation.value + offset) * Math.PI) / 180;
      const parallaxY = interpolate(
        scrollY.value,
        [0, 300],
        [0, -50],
        Extrapolation.CLAMP
      );
      
      return {
        transform: [
          { translateX: Math.cos(angle) * radius },
          { translateY: Math.sin(angle) * radius + parallaxY },
          { scale: interpolate(Math.sin(angle), [-1, 1], [0.6, 1]) },
        ],
        opacity: interpolate(Math.sin(angle), [-1, 1], [0.4, 1]),
      };
    });
  };

  // Parallax effect for background layers
  const backgroundLayer1Style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(scrollY.value, [0, 500], [0, -150], Extrapolation.CLAMP) },
      ],
    };
  });

  const backgroundLayer2Style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(scrollY.value, [0, 500], [0, -100], Extrapolation.CLAMP) },
      ],
    };
  });

  // Animated styles for floating particles
  const createParticleStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const angle = ((particleRotation.value + index * 45) * Math.PI) / 180;
      const radius = 150 + (index % 3) * 30;
      
      return {
        transform: [
          { translateX: Math.cos(angle) * radius },
          { translateY: Math.sin(angle) * radius },
          { scale: interpolate(Math.sin(angle), [-1, 1], [0.5, 1]) },
        ],
        opacity: interpolate(Math.sin(angle), [-1, 1], [0.2, 0.6]),
      };
    });
  };

  // Card entrance animations
  const createCardStyle = (index: number) => {
    return useAnimatedStyle(() => {
      const inputRange = [index * 100, (index + 1) * 100];
      const outputRange = [0, 1];
      
      const opacity = interpolate(
        scrollY.value,
        inputRange,
        outputRange,
        Extrapolation.CLAMP
      );

      const translateY = interpolate(
        scrollY.value,
        inputRange,
        [50, 0],
        Extrapolation.CLAMP
      );

      return {
        opacity,
        transform: [{ translateY }],
      };
    });
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Portfolio",
            headerShown: false,
          }}
        />
      )}
      
      {/* Animated Background Layers */}
      <View style={styles.backgroundContainer}>
        <Animated.View style={[styles.backgroundLayer, backgroundLayer1Style]}>
          <LinearGradient
            colors={['rgba(102, 126, 234, 0.1)', 'rgba(118, 75, 162, 0.05)']}
            style={styles.gradientLayer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>
        <Animated.View style={[styles.backgroundLayer, backgroundLayer2Style]}>
          <LinearGradient
            colors={['rgba(67, 233, 123, 0.05)', 'rgba(56, 249, 215, 0.03)']}
            style={styles.gradientLayer}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        </Animated.View>
      </View>

      <Animated.ScrollView 
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* 3D Hero Section with Particles */}
        <View style={styles.heroSection}>
          <View style={styles.animationContainer}>
            {/* Floating Particles */}
        {[...Array(30)].map((_, i) => {
  const colorOptions = ['#ffffff', '#a0c4ff', '#bdb2ff', '#ffadad', '#ffd6a5'];
  const size = Math.random() * 4 + 2; // small stars
  const backgroundColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
  return (
    <Animated.View
      key={`particle-${i}`}
      style={[
        styles.particle,
        createParticleStyle(i),
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          opacity: Math.random() * 0.6 + 0.2, // random twinkle effect
        }
      ]}
    />
  );
})}


            {/* Central 3D Sphere */}
            <Animated.View style={[styles.sphere, animatedSphereStyle]}>
              <LinearGradient
                colors={gradients.primary}
                style={styles.sphereGradient}
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
            </Animated.View>

            {/* Orbiting Elements with 3D depth */}
            <Animated.View style={[styles.orbitDot, createOrbitStyle(0, 100)]}>
              <LinearGradient
                colors={gradients.primary}
                style={styles.orbitGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            </Animated.View>
            <Animated.View style={[styles.orbitDot, createOrbitStyle(120, 100)]}>
              <LinearGradient
                colors={gradients.accent}
                style={styles.orbitGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            </Animated.View>
            <Animated.View style={[styles.orbitDot, createOrbitStyle(240, 100)]}>
              <LinearGradient
                colors={gradients.secondary}
                style={styles.orbitGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            </Animated.View>

            {/* Outer orbit ring */}
            <Animated.View style={[styles.orbitDot, styles.smallDot, createOrbitStyle(60, 130)]}>
              <View style={[styles.dotInner, { backgroundColor: colors.accentSecondary }]} />
            </Animated.View>
            <Animated.View style={[styles.orbitDot, styles.smallDot, createOrbitStyle(180, 130)]}>
              <View style={[styles.dotInner, { backgroundColor: colors.secondaryLight }]} />
            </Animated.View>
            <Animated.View style={[styles.orbitDot, styles.smallDot, createOrbitStyle(300, 130)]}>
              <View style={[styles.dotInner, { backgroundColor: colors.accent }]} />
            </Animated.View>
          </View>

          <Text style={styles.heroTitle}>Saila Hatira</Text>
          <Text style={styles.heroSubtitle}>Creative Developer & Cybersecurity engineer
          </Text>
          <View style={styles.heroDivider} />
        </View>

        {/* Glassmorphic Stats Cards */}
        <Animated.View style={[styles.statsContainer, createCardStyle(0)]}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={['rgba(102, 126, 234, 0.2)', 'rgba(118, 75, 162, 0.1)']}
              style={styles.statGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.statNumber}>2+</Text>
              <Text style={styles.statLabel}>Years</Text>
              <View style={styles.statIcon}>
                <IconSymbol name="clock.fill" size={20} color={colors.primary} />
              </View>
            </LinearGradient>
          </View>
          <View style={styles.statCard}>
            <LinearGradient
              colors={['rgba(67, 233, 123, 0.2)', 'rgba(56, 249, 215, 0.1)']}
              style={styles.statGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.statNumber}>30+</Text>
              <Text style={styles.statLabel}>Projects</Text>
              <View style={styles.statIcon}>
                <IconSymbol name="folder.fill" size={20} color={colors.secondary} />
              </View>
            </LinearGradient>
          </View>
          <View style={styles.statCard}>
            <LinearGradient
              colors={['rgba(240, 147, 251, 0.2)', 'rgba(245, 87, 108, 0.1)']}
              style={styles.statGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.statNumber}>10+</Text>
              <Text style={styles.statLabel}>Clients</Text>
              <View style={styles.statIcon}>
                <IconSymbol name="person.2.fill" size={20} color={colors.accent} />
              </View>
            </LinearGradient>
          </View>
        </Animated.View>

        {/* About Section with 3D Card */}
        <Animated.View style={[styles.sectionCard, createCardStyle(1)]}>
          <LinearGradient
            colors={['rgba(30, 36, 66, 0.95)', 'rgba(47, 54, 88, 0.8)']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={gradients.primary}
                  style={styles.iconGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <IconSymbol name="person.circle.fill" size={32} color={colors.text} />
                </LinearGradient>
              </View>
              <Text style={styles.sectionTitle}>About Me</Text>
            </View>
            <Text style={styles.sectionText}>
             A motivated and adaptable Customer Support Specialist with extensive experience in providing high-quality technical support in fast-paced environments. Known for creative problem-solving skills, excellent communication
abilities, and a deep understanding of e-commerce platforms, I am dedicated to swiftly resolving customer issues
while enhancing overall satisfaction. My background in web hosting and technical support at Web Hosting Canada
(WHC) has honed my skills in troubleshooting, user support, and collaboration with cross-functional teams.
            </Text>
            <View style={styles.tagContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>🎨 Creative</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>⚡ Fast</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>🚀 Innovative</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Skills Section with 3D Pills */}
        <Animated.View style={[styles.sectionCard, createCardStyle(2)]}>
          <LinearGradient
            colors={['rgba(30, 36, 66, 0.95)', 'rgba(47, 54, 88, 0.8)']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={gradients.accent}
                  style={styles.iconGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <IconSymbol name="star.fill" size={32} color={colors.text} />
                </LinearGradient>
              </View>
              <Text style={styles.sectionTitle}>Core Skills</Text>
            </View>
            <View style={styles.skillsGrid}>
              {['React Native', 'TypeScript', 'System Administration', 'Node.js', 'ReactJS', 'PHP', 'Python', 'AWS', 'Symfony', 'Angular', 'MySQl'].map((skill, index) => (
                <View key={skill} style={styles.skillBadge}>
                  <LinearGradient
                    colors={index % 2 === 0 ? gradients.primary : gradients.secondary}
                    style={styles.skillGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.skillText}>{skill}</Text>
                  </LinearGradient>
                </View>
              ))}
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Experience Timeline with 3D depth */}
        <Animated.View style={[styles.sectionCard, createCardStyle(3)]}>
          <LinearGradient
            colors={['rgba(30, 36, 66, 0.95)', 'rgba(47, 54, 88, 0.8)']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={gradients.blue}
                  style={styles.iconGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <IconSymbol name="briefcase.fill" size={32} color={colors.text} />
                </LinearGradient>
              </View>
              <Text style={styles.sectionTitle}>Experience</Text>
            </View>
            <View style={styles.timeline}>
              <View style={styles.timelineItem}>
                <View style={styles.timelineDot}>
                  <LinearGradient
                    colors={gradients.primary}
                    style={styles.timelineDotGradient}
                  />
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.experienceTitle}>Technical Support Specialist</Text>
                  <Text style={styles.experienceCompany}>Web Hosting Canada.</Text>
                  <Text style={styles.experienceDate}>2024 - Present</Text>
                  <Text style={styles.experienceDescription}>
                    Delivered high-quality technical support for e-commerce clients, resolving hosting and website issues efficiently and maintaining a 90%+ customer satisfaction rate.
                  </Text>
                </View>
              </View>
              <View style={styles.timelineItem}>
                <View style={styles.timelineDot}>
                  <LinearGradient
                    colors={gradients.secondary}
                    style={styles.timelineDotGradient}
                  />
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.experienceTitle}>Mobile Development Intern</Text>
                  <Text style={styles.experienceCompany}>Elite2com Nabeul</Text>
                  <Text style={styles.experienceDate}>July 2024 – Aug 2024</Text>
                  <Text style={styles.experienceDescription}>
Optimized the students mobile app’s UI and features to improve user experience, engagement, and satisfaction.                  </Text>
                </View>
              </View>
                <View style={styles.timelineItem}>
                <View style={styles.timelineDot}>
                  <LinearGradient
                    colors={gradients.sunset}
                    style={styles.timelineDotGradient}
                  />
                </View>
                <View style={styles.timelineContent}>
                  <Text style={styles.experienceTitle}>Web Development Intern</Text>
                  <Text style={styles.experienceCompany}>Nexym Monastir </Text>
                  <Text style={styles.experienceDate}>Jan 2023 – May 2023</Text>
                  <Text style={styles.experienceDescription}>
Developed a secure, multi-role e-commerce system with dashboards, order management, real-time inventory updates, and customizable UI features.                  </Text>
                </View>
              </View>

            </View>
          </LinearGradient>
        </Animated.View>

        {/* Featured Projects with 3D Cards */}
        <Animated.View style={[styles.sectionCard, createCardStyle(4)]}>
          <LinearGradient
            colors={['rgba(30, 36, 66, 0.95)', 'rgba(47, 54, 88, 0.8)']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={gradients.accent}
                  style={styles.iconGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <IconSymbol name="folder.fill" size={32} color={colors.text} />
                </LinearGradient>
              </View>
              <Text style={styles.sectionTitle}>Featured Projects</Text>
            </View>
            <View style={styles.projectCard}>
              <LinearGradient
                colors={['rgba(102, 126, 234, 0.2)', 'rgba(118, 75, 162, 0.1)']}
                style={styles.projectGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.projectIcon}>
                  <IconSymbol name="app.fill" size={28} color={colors.primary} />
                </View>
                <View style={styles.projectContent}>
                  <Text style={styles.projectTitle}>E-Commerce Platform</Text>
                  <Text style={styles.projectDescription}>
                    Full-stack mobile app with payment integration and real-time inventory
                  </Text>
                  <View style={styles.projectTags}>
                    <Text style={styles.projectTag}>Flutter</Text>
                    <Text style={styles.projectTag}>Firebase</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.projectCard}>
              <LinearGradient
                colors={['rgba(67, 233, 123, 0.2)', 'rgba(56, 249, 215, 0.1)']}
                style={styles.projectGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.projectIcon}>
                  <IconSymbol name="chart.bar.fill" size={28} color={colors.secondary} />
                </View>
                <View style={styles.projectContent}>
                  <Text style={styles.projectTitle}>Web Hosting Dashboard</Text>
                  <Text style={styles.projectDescription}>
              A modern and responsive landing page for a web hosting company, built with React.js to deliver a fast, elegant, and engaging user experience.                  </Text>
                  <View style={styles.projectTags}>
                    <Text style={styles.projectTag}>React</Text>
        
                  </View>
                </View>
              </LinearGradient>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Contact Section with Glassmorphism */}
        <Animated.View style={[styles.sectionCard, createCardStyle(5), styles.lastCard]}>
          <LinearGradient
            colors={['rgba(30, 36, 66, 0.95)', 'rgba(47, 54, 88, 0.8)']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={gradients.blue}
                  style={styles.iconGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <IconSymbol name="envelope.fill" size={32} color={colors.text} />
                </LinearGradient>
              </View>
              <Text style={styles.sectionTitle}>Get In Touch</Text>
            </View>
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <IconSymbol name="envelope.fill" size={20} color={colors.primary} />
              </View>
              <Text style={styles.contactText}>Hatirasaila88@gmail.com</Text>
            </View>
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <IconSymbol name="phone.fill" size={20} color={colors.secondary} />
              </View>
              <Text style={styles.contactText}>+216 94 082 031</Text>
            </View>
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <IconSymbol name="location.fill" size={20} color={colors.accent} />
              </View>
              <Text style={styles.contactText}>Ariana, Tunisia</Text>
            </View>
          </LinearGradient>
        </Animated.View>
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  backgroundLayer: {
    position: 'absolute',
    top: -100,
    left: -100,
    right: -100,
    bottom: -100,
  },
  gradientLayer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 120,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 60,
    marginBottom: 30,
  },
  animationContainer: {
    width: width * 0.9,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.4,
  },
  sphere: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sphereGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.glow,
  },
  sphereInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(10, 14, 39, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  orbitDot: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  orbitGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    ...shadows.medium,
  },
  smallDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotInner: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    ...shadows.small,
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1,
  },
  heroSubtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  heroDivider: {
    width: 60,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.medium,
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  statIcon: {
    marginTop: 4,
  },
  particle: {
  position: 'absolute',
  top: 0,
  left: 0,
},
  sectionCard: {
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
    borderRadius: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    ...shadows.medium,
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  sectionText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 26,
    marginBottom: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    backgroundColor: colors.highlight,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillBadge: {
    borderRadius: 24,
    overflow: 'hidden',
    ...shadows.small,
  },
  skillGradient: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
  },
  skillText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  timeline: {
    gap: 24,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 16,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginTop: 4,
    overflow: 'hidden',
    ...shadows.small,
  },
  timelineDotGradient: {
    width: '100%',
    height: '100%',
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 8,
  },
  experienceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  experienceCompany: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  experienceDate: {
    fontSize: 13,
    color: colors.textTertiary,
    marginBottom: 8,
  },
  experienceDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  projectCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    ...shadows.medium,
  },
  projectGradient: {
    padding: 16,
    flexDirection: 'row',
    gap: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  projectIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.small,
  },
  projectContent: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  projectDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 10,
  },
  projectTags: {
    flexDirection: 'row',
    gap: 8,
  },
  projectTag: {
    fontSize: 12,
    color: colors.textTertiary,
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
    backgroundColor: colors.highlight,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
    avatarImage: {
  width: 100,
  height: 100,
  borderRadius: 60, // makes it circular
  resizeMode: "cover",
},
});
