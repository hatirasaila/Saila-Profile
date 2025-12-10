
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { colors, shadows, gradients } from "@/styles/commonStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';

import { IconSymbol } from "@/components/IconSymbol";

interface Project {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  icon: string;
  status: 'completed' | 'in-progress' | 'planned';
  year: string;
}


const projects: Project[] = [
  {
    title: 'E-Commerce Application (Quick Delivery and Electronic Service)',
    description: 'Developed three mobile applications for Quick-Commerce and Electronic Service (client, supplier, delivery), along with an admin panel web app to visualize and manage all features, including user profiles, product inventory, and order tracking.',
    category: 'Mobile',
    technologies: ['Flutter', 'Node.js', 'Firebase'],
    icon: 'cart', // Ionicons
    status: 'completed',
    year: '2023',
  },
  {
    title: 'Face Recognition System with Security Integration',
    description: 'Developed a Python-based face recognition system for secure access, using machine learning and computer vision. The system included feature extraction by storing facial vectors for comparison, enabled access based on facial data matching, and provided real-time recognition using a webcam for immediate authentication',
    category: 'Web',
    technologies: ['Python', 'OpenCV', 'numpy', 'Dlib', 'SQLite'],
    icon: 'person-circle', // Ionicons
    status: 'completed',
    year: '2025',
  },
  {
    title: 'School Mobile Application',
    description: 'Enhanced a School Application for students and teachers by optimizing the UI, improving performance, and adding real-time notifications, assignment submission, and grade tracking features.',
    category: 'Mobile',
    technologies: ['flutter', 'Symfony', 'MongoDB'],
    icon: 'school', // Ionicons
    status: 'completed',
    year: '2024',
  },
  {
    title: 'SOC Architecture for Banking System',
    description: 'Designed and implemented a SOC architecture for enhanced security using Wazuh for intrusion detection, SOAR for automation, MISP for threat intelligence management, The Hive for incident management, and Cortex for analysis. This comprehensive approach enabled efficient security monitoring and response.',
    category: 'Web',
    technologies: ['Wazuh', 'SOAR', 'MISP', 'The Hive', 'Cortex', 'Python'],
    icon: 'shield-checkmark', // Ionicons
    status: 'completed',
    year: '2022',
  },
  {
    title: 'Web Hosting Company',
    description: 'A modern and responsive landing page for a web hosting company, built with React.js to deliver a fast, elegant, and engaging user experience.',
    category: 'Web',
    technologies: ['React Native'],
    icon: 'server', // Ionicons
    status: 'in-progress',
    year: '2024',
  },
  {
    title: 'AI Chatbot Platform',
    description: 'Intelligent chatbot builder with natural language processing and multi-channel support.',
    category: 'AI/ML',
    technologies: ['Python', 'TensorFlow', 'React', 'Docker'],
    icon: 'chatbubbles', // Ionicons
    status: 'planned',
    year: '2026',
  },
  {
    title: 'Camping Website',
    description: 'Developed a user-centric web application for camping services, focusing on intuitive navigation, ease of use, and responsiveness across all devices. Ensured that users could easily find and book camping services, enhancing their overall experience.',
    category: 'Web',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    icon: 'leaf', // Ionicons (tent not available in Ionicons)
    status: 'completed',
    year: '2021',
  },
  {
    title: 'Travel Agency',
    description: 'A platform that allows users to search and book travel packages online. Features include destination browsing, tour details, pricing, online reservations',
    category: 'Web',
    technologies: ['HTML', 'Twig', 'Bootstrap', 'Symfony', 'MySQL'],
    icon: 'airplane', // Ionicons
    status: 'completed',
    year: '2025',
  },
];


export default function ProjectsScreen() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return colors.secondary;
      case 'in-progress':
        return colors.accent;
      case 'planned':
        return colors.textTertiary;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'planned':
        return 'Planned';
      default:
        return status;
    }
  };

  const getGradientForCategory = (category: string) => {
    switch (category) {
      case 'Mobile':
        return gradients.primary;
      case 'Web':
        return gradients.secondary;
      case 'AI/ML':
        return gradients.accent;
      default:
        return gradients.blue;
    }
  };

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
          <Text style={styles.headerTitle}>Featured Projects</Text>
          <Text style={styles.headerSubtitle}>
            Showcasing my best work
          </Text>
        </View>

        {/* Projects Grid */}
        <View style={styles.projectsGrid}>
          {projects.map((project, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.projectCard}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(30, 36, 66, 0.95)', 'rgba(47, 54, 88, 0.8)']}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
  {/* Project Icon */}
<View style={styles.projectIconContainer}>
  <LinearGradient
    colors={getGradientForCategory(project.category)}
    style={styles.projectIconGradient}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <Ionicons name={project.icon} size={32} color={colors.text} />
  </LinearGradient>
</View>


                {/* Status and Year */}
                <View style={styles.projectMeta}>
                  <View style={[styles.statusBadge, { borderColor: getStatusColor(project.status) }]}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(project.status) }]} />
                    <Text style={[styles.statusText, { color: getStatusColor(project.status) }]}>
                      {getStatusLabel(project.status)}
                    </Text>
                  </View>
                  <Text style={styles.yearText}>{project.year}</Text>
                </View>

                {/* Project Title */}
                <Text style={styles.projectTitle}>{project.title}</Text>

                {/* Category */}
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{project.category}</Text>
                </View>

                {/* Description */}
                <Text style={styles.projectDescription}>{project.description}</Text>

                {/* Technologies */}
                <View style={styles.technologiesSection}>
                  <Text style={styles.technologiesLabel}>Tech Stack:</Text>
                  <View style={styles.technologiesGrid}>
                    {project.technologies.map((tech, i) => (
                      <View key={i} style={styles.techPill}>
                        <Text style={styles.techPillText}>{tech}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* View Details Button */}
              
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Summary */}
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
                  <IconSymbol name="chart.pie.fill" size={24} color={colors.text} />
                </LinearGradient>
              </View>
              <Text style={styles.cardTitle}>Project Statistics</Text>
            </View>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{projects.length}</Text>
                <Text style={styles.statLabel}>Total Projects</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {projects.filter(p => p.status === 'completed').length}
                </Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {projects.filter(p => p.status === 'in-progress').length}
                </Text>
                <Text style={styles.statLabel}>In Progress</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {new Set(projects.flatMap(p => p.technologies)).size}
                </Text>
                <Text style={styles.statLabel}>Technologies</Text>
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
  projectsGrid: {
    gap: 20,
  },
  projectCard: {
    borderRadius: 20,
    overflow: 'hidden',
    ...shadows.large,
  },
  cardGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  projectIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    marginBottom: 16,
    ...shadows.medium,
  },
  projectIconGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  yearText: {
    fontSize: 14,
    color: colors.textTertiary,
    fontWeight: '600',
  },
  projectTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.highlight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
  },
  projectDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  technologiesSection: {
    marginBottom: 16,
  },
  technologiesLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 10,
    fontWeight: '600',
  },
  technologiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techPill: {
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  techPillText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
  },
  viewButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
    ...shadows.small,
  },
  viewButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  viewButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  summaryCard: {
    borderRadius: 20,
    overflow: 'hidden',
    ...shadows.large,
    marginTop: 10,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    width: '47%',
    backgroundColor: colors.highlight,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
