
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { colors, shadows, gradients } from "@/styles/commonStyles";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/IconSymbol";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    title: 'Technical Support Specialist',
    company: 'Web Hosting Canada.',
    period: '2024 - Present',
    description: 'Delivered high-quality technical support for e-commerce clients, resolving hosting and website issues efficiently and maintaining a 90%+ customer satisfaction rate.',
    achievements: ['Provided timely and efficient customer support via live chat, email, and phone, addressing issues related toweb hosting, domain management, and website functionality for e-commerce clients',
      'Resolved complex technical issues quickly by troubleshooting server configurations, DNS settings, and softwarecompatibility, minimizing downtime for e-commerce businesses',
      'Consistently received positive feedback with a customer satisfaction score of 90%+ across all customer support channels',
    ],
    technologies: ['CPanel', 'WHM', 'Wordpress', 'SSH'],
  },
  {
    title: 'Mobile Development Intern',
    company: 'Elite2Com',
    period: 'July 2024 – Aug 2024',
    description: 'Optimized the students mobile app’s UI and features to improve user experience, engagement, and satisfaction. ',
    achievements: [
      'Optimized the user interface of the mobile application, enhancing user experience for customers and sellers in an e-commerce environment, ensuring seamless navigation and increased engagement',
      'Integrated key features such as product management, order tracking, and real-time communication tools, improving satisfaction and retention for users',
      'Collaborated with the development and customer support teams to address user feedback, ensuring quick solution of issues and delivering an enhanced customer experience.',
    ],
    technologies: ['Flutter', 'Symfony', 'MongoDB'],
  },
  {
    title: 'Web Development Intern',
    company: 'Nexym Monastir',
    period: 'Jan 2023 - May 2023',
    description: 'Developed a secure, multi-role e-commerce system with dashboards, order management, real-time inventory updates, and customizable UI features. ',
    achievements: [
      'Developed RESTful APIs serving 100K+ daily requests',
      'Implemented responsive UI components used across multiple projects',
      'Developed features for browsing products, managing shopping carts, placing orders, tracking deliveries, and viewing order history',
    ],
    technologies: ['Flutter', 'Firebase', 'Nodejs', 'Git'],
  },
];

export default function ExperienceScreen() {
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
          <Text style={styles.headerTitle}>Work Experience</Text>
          <Text style={styles.headerSubtitle}>
            My professional journey
          </Text>
        </View>

        {/* Timeline */}
        <View style={styles.timeline}>
          {experiences.map((exp, index) => (
            <View key={index} style={styles.timelineItem}>
              {/* Timeline connector */}
              <View style={styles.timelineConnector}>
                <View style={styles.timelineDot}>
                  <LinearGradient
                    colors={
                      index === 0 ? gradients.primary :
                      index === 1 ? gradients.accent :
                      gradients.secondary
                    }
                    style={styles.timelineDotGradient}
                  />
                </View>
                {index < experiences.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>

              {/* Experience card */}
              <View style={styles.experienceCard}>
                <LinearGradient
                  colors={['rgba(30, 36, 66, 0.95)', 'rgba(47, 54, 88, 0.8)']}
                  style={styles.cardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  {/* Header */}
                  <View style={styles.experienceHeader}>
                    <View style={styles.companyIcon}>
                      <LinearGradient
                        colors={
                          index === 0 ? gradients.primary :
                          index === 1 ? gradients.accent :
                          gradients.secondary
                        }
                        style={styles.companyIconGradient}
                      >
                        <IconSymbol name="building.2.fill" size={24} color={colors.text} />
                      </LinearGradient>
                    </View>
                    <View style={styles.experienceHeaderText}>
                      <Text style={styles.experienceTitle}>{exp.title}</Text>
                      <Text style={styles.experienceCompany}>{exp.company}</Text>
                    </View>
                  </View>

                  {/* Period */}
                  <View style={styles.periodBadge}>
                    <IconSymbol name="calendar" size={14} color={colors.primary} />
                    <Text style={styles.periodText}>{exp.period}</Text>
                  </View>

                  {/* Description */}
                  <Text style={styles.experienceDescription}>{exp.description}</Text>

                  {/* Achievements */}
                  <View style={styles.achievementsSection}>
                    <Text style={styles.achievementsTitle}>Key Achievements:</Text>
                    {exp.achievements.map((achievement, i) => (
                      <View key={i} style={styles.achievementItem}>
                        <View style={styles.achievementBullet}>
                          <LinearGradient
                            colors={gradients.primary}
                            style={styles.achievementBulletGradient}
                          />
                        </View>
                        <Text style={styles.achievementText}>{achievement}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Technologies */}
                  <View style={styles.technologiesSection}>
                    <Text style={styles.technologiesTitle}>Technologies:</Text>
                    <View style={styles.technologiesGrid}>
                      {exp.technologies.map((tech, i) => (
                        <View key={i} style={styles.techBadge}>
                          <LinearGradient
                            colors={
                              i % 3 === 0 ? gradients.primary :
                              i % 3 === 1 ? gradients.accent :
                              gradients.secondary
                            }
                            style={styles.techBadgeGradient}
                          >
                            <Text style={styles.techText}>{tech}</Text>
                          </LinearGradient>
                        </View>
                      ))}
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          ))}
        </View>

        {/* Summary Stats */}
        <View style={[styles.summaryCard, styles.lastCard]}>
          <LinearGradient
            colors={['rgba(30, 36, 66, 0.95)', 'rgba(47, 54, 88, 0.8)']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={gradients.blue}
                  style={styles.iconGradient}
                >
                  <IconSymbol name="chart.line.uptrend.xyaxis" size={24} color={colors.text} />
                </LinearGradient>
              </View>
              <Text style={styles.cardTitle}>Career Summary</Text>
            </View>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>2+</Text>
                <Text style={styles.summaryLabel}>Years Experience</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>3</Text>
                <Text style={styles.summaryLabel}>Companies</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>20+</Text>
                <Text style={styles.summaryLabel}>Projects</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>20+</Text>
                <Text style={styles.summaryLabel}>Technologies</Text>
              </View>
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
  timeline: {
    marginBottom: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  timelineConnector: {
    width: 40,
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    ...shadows.medium,
  },
  timelineDotGradient: {
    width: '100%',
    height: '100%',
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: colors.border,
    marginTop: 8,
  },
  experienceCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    ...shadows.large,
  },
  cardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  experienceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  companyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    ...shadows.small,
  },
  companyIconGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  experienceHeaderText: {
    flex: 1,
  },
  experienceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  experienceCompany: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  periodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.highlight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  periodText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  experienceDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  achievementsSection: {
    marginBottom: 20,
  },
  achievementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
  },
  achievementBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    overflow: 'hidden',
  },
  achievementBulletGradient: {
    width: '100%',
    height: '100%',
  },
  achievementText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  technologiesSection: {
    marginTop: 4,
  },
  technologiesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  technologiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techBadge: {
    borderRadius: 16,
    overflow: 'hidden',
    ...shadows.small,
  },
  techBadgeGradient: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  techText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  summaryCard: {
    borderRadius: 20,
    overflow: 'hidden',
    ...shadows.large,
  },
  lastCard: {
    marginBottom: 40,
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
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  summaryItem: {
    width: '47%',
    backgroundColor: colors.highlight,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
