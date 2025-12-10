
import { View, Text, StyleSheet, ScrollView, Platform ,  TouchableOpacity, Linking, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { colors, shadows, gradients } from "@/styles/commonStyles";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/IconSymbol";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from "react-native-reanimated";

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

const skills: Skill[] = [
  { name: 'React Native', level: 95, category: 'Mobile', icon: 'app.fill' },
  { name: 'TypeScript', level: 90, category: 'Languages', icon: 'chevron.left.forwardslash.chevron.right' },
  { name: 'React JS', level: 92, category: 'Web', icon: 'globe' },
  { name: 'Bootstrap', level: 88, category: 'Web', icon: 'paintbrush.fill' },
  { name: 'Node.js', level: 80, category: 'Backend', icon: 'server.rack' },
  { name: 'PHP', level: 88, category: 'Backend', icon: 'paintbrush.fill' },
  { name: 'MySQL', level: 90, category: 'Backend', icon: 'arrow.triangle.branch' },
  { name: 'Python', level: 93, category: 'Languages', icon: 'terminal.fill' },
  { name: 'AWS', level: 96, category: 'Cloud', icon: 'cloud.fill' },
  { name: 'Docker', level: 82, category: 'DevOps', icon: 'cube.fill' },
  { name: 'Git', level: 90, category: 'Tools', icon: 'arrow.triangle.merge' },
];

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withDelay(
      index * 100,
      withSpring(skill.level / 100, {
        damping: 15,
        stiffness: 80,
      })
    );
  }, [skill.level, index, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  const getGradientForCategory = (category: string) => {
    switch (category) {
      case 'Mobile':
      case 'Web':
        return gradients.primary;
      case 'Backend':
      case 'Cloud':
        return gradients.secondary;
      case 'Design':
        return gradients.accent;
      case 'Languages':
      case 'Tools':
        return gradients.blue;
      default:
        return gradients.primary;
    }
  };

  return (
    <View style={styles.skillItem}>
      <View style={styles.skillHeader}>
        <View style={styles.skillInfo}>
          <IconSymbol name={skill.icon as any} size={20} color={colors.primary} />
          <Text style={styles.skillName}>{skill.name}</Text>
        </View>
        <Text style={styles.skillLevel}>{skill.level}%</Text>
      </View>
      <View style={styles.skillBarContainer}>
        <Animated.View style={[styles.skillBarFill, animatedStyle]}>
          <LinearGradient
            colors={getGradientForCategory(skill.category)}
            style={styles.skillBarGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </Animated.View>
      </View>
      <Text style={styles.skillCategory}>{skill.category}</Text>
    </View>
  );
}

export default function SkillsScreen() {
  const categories = Array.from(new Set(skills.map(s => s.category)));

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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Technical Skills</Text>
          <Text style={styles.headerSubtitle}>
            Expertise across multiple domains
          </Text>
        </View>

        {/* Skills Overview */}
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
                  <IconSymbol name="chart.bar.fill" size={24} color={colors.text} />
                </LinearGradient>
              </View>
              <Text style={styles.cardTitle}>Skill Proficiency</Text>
            </View>
            <View style={styles.skillsList}>
              {skills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </View>
          </LinearGradient>
        </View>

       

        {/* Certifications */}
{/* Certifications */}
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
          <IconSymbol name="rosette" size={24} color={colors.text} />
        </LinearGradient>
      </View>
      <Text style={styles.cardTitle}>Certifications</Text>
    </View>

    <View style={styles.certificationsList}>
      {[
        {
          name: 'Red Hat Certified System Administrator (RHCSA)',
          image: require("@/assets/rhcsa.png"),
          link: 'https://www.credly.com/badges/5fd53b26-bab1-400b-9391-c3f1793750c7/public_url',
        },
        {
          name: 'Certified Associate Python Programmer (PCAP)',
          image: require("@/assets/pcap.png"),
          link: 'https://www.credly.com/badges/89d61232-f225-4e37-946a-f14331c98e42/public_url',
        },
        {
          name: 'cPanel & WHM System Administrator I',
          image: require("@/assets/cli.png"),
          link: 'https://university.cpanel.net/certificate/f5355f63-dbca-4ef5-af09-d8fa549fc71d/',
        },
        {
          name: 'cPanel & WHM System Administrator II',
          image: require("@/assets/cli2.jpg"),
          link: 'https://university.cpanel.net/certificate/6754bbba-eb27-4345-a0e9-1f55bafab5ed/',
        },
        {
          name: 'cPanel Certified Partner Accreditation (CPCP)',
          image: require("@/assets/cp.png"),
          link: 'https://university.cpanel.net/certificate/4839924d-d293-4707-b44e-1bd19885972c/',
        },
        {
          name: 'AWS Certified Cloud Practitioner (AWS CCP)',
          image: require("@/assets/aws.jpg"),
          link: 'https://www.credly.com/badges/972fce34-f73a-4890-a308-4e65f6abebff/public_url',
        },
        {
          name: 'Red Hat Certified Engineer (RHCE)',
          image: require("@/assets/rhcsa.png"),
          link: 'https://www.credly.com/badges/892f37de-b4db-4404-89b8-f78f5294ee84',
        },
        {
          name: 'WHM Administration',
          image: require("@/assets/whm.jpg"),
          link: 'https://university.cpanel.net/certificate/259356cd-e4c1-4699-958f-0b2cbbd74725/',
        },
        {
          name: 'Imunify360',
          image: require("@/assets/imunifyLogo.jpg"),
          link: 'https://university.cpanel.net/certificate/0fe2d539-aeaf-42f2-8d99-e48e3c987aa7/',
        },
      ].map((cert, index) => (
        <TouchableOpacity
          key={cert.name}
          onPress={() => Linking.openURL(cert.link)}
          style={styles.certificationItem}
        >
          <View style={styles.certIcon}>
            {cert.image ? (
              <Image
                source={cert.image}
                style={styles.certImage}
                resizeMode="contain"
              />
            ) : (
              <LinearGradient
                colors={
                  index === 0
                    ? gradients.primary
                    : index === 1
                    ? gradients.accent
                    : gradients.secondary
                }
                style={styles.certIconGradient}
              >
                <IconSymbol name={cert.icon as any} size={20} color={colors.text} />
              </LinearGradient>
            )}
          </View>
          <View style={styles.certContent}>
            <Text style={styles.certName}>{cert.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
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
    marginBottom: 30,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
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
    marginBottom: 24,
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
  skillsList: {
    gap: 24,
  },
  skillItem: {
    gap: 8,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  certIcon: {
  marginRight: 12,
  width: 50,
  height: 50,
  borderRadius: 8,
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
},

certImage: {
  width: '100%',
  height: '100%',
},
  skillName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  skillLevel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  skillBarContainer: {
    height: 8,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  skillBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  skillBarGradient: {
    flex: 1,
    ...shadows.small,
  },
  skillCategory: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '47%',
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.medium,
  },
  categoryGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  categoryCount: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.8,
    marginBottom: 4,
  },
  categoryAvg: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.8,
  },
  certificationsList: {
    gap: 16,
  },
  certificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.highlight,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  certIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    ...shadows.small,
  },
  certIconGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  certContent: {
    flex: 1,
  },
  certName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  certYear: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
