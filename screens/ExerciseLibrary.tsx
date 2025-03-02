import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const exercises = [
  {
    id: 1,
    name: 'Push-ups',
    muscle: 'Chest',
    difficulty: 'Beginner',
    animation: 'https://example.com/pushup-animation.gif',
  },
  {
    id: 2,
    name: 'Squats',
    muscle: 'Legs',
    difficulty: 'Beginner',
    animation: 'https://example.com/squat-animation.gif',
  },
  {
    id: 3,
    name: 'Pull-ups',
    muscle: 'Back',
    difficulty: 'Intermediate',
    animation: 'https://example.com/pullup-animation.gif',
  },
];

const ExerciseLibrary = () => {
  const webViewRef = useRef(null);

  const ExerciseCard = ({ exercise, index }) => (
    <Animated.View
      entering={FadeInUp.delay(index * 200)}
      style={styles.exerciseCard}
    >
      <View style={styles.exerciseContent}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <View style={styles.exerciseDetails}>
          <Text style={styles.detailText}>{exercise.muscle}</Text>
          <Text style={styles.detailText}>•</Text>
          <Text style={styles.detailText}>{exercise.difficulty}</Text>
        </View>
        <View style={styles.animationContainer}>
          <WebView
            ref={webViewRef}
            source={{ uri: exercise.animation }}
            style={styles.animation}
          />
        </View>
      </View>
    </Animated.View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Exercise Library</Text>
      <Text style={styles.subHeader}>Learn proper form with 3D animations</Text>
      
      {exercises.map((exercise, index) => (
        <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A237E',
    padding: 20,
    paddingBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  exerciseCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exerciseContent: {
    padding: 20,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A237E',
  },
  exerciseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  detailText: {
    color: '#666',
    marginRight: 8,
  },
  animationContainer: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  animation: {
    flex: 1,
  },
});

export default ExerciseLibrary;