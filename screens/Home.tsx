import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const workouts = [
    { id: 1, name: 'Full Body Workout', duration: '45 min', exercises: 8 },
    { id: 2, name: 'Upper Body Focus', duration: '30 min', exercises: 6 },
    { id: 3, name: 'Core Strength', duration: '20 min', exercises: 5 },
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1A237E', '#3949AB']}
        style={styles.header}
      >
        <Text style={styles.headerText}>Welcome Back!</Text>
        <Text style={styles.subHeaderText}>Let's crush today's workout</Text>
      </LinearGradient>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('CreateWorkout')}
        >
          <Ionicons name="add-circle" size={24} color="#1A237E" />
          <Text style={styles.actionText}>Create Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('ExerciseLibrary')}
        >
          <Ionicons name="library" size={24} color="#1A237E" />
          <Text style={styles.actionText}>Exercise Library</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Your Workouts</Text>
      
      {workouts.map((workout, index) => (
        <Animated.View
          key={workout.id}
          entering={FadeInUp.delay(index * 200)}
        >
          <TouchableOpacity
            style={styles.workoutCard}
            onPress={() => navigation.navigate('WorkoutDetail', { workout })}
          >
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutName}>{workout.name}</Text>
              <Text style={styles.workoutDetails}>
                {workout.duration} • {workout.exercises} exercises
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#1A237E" />
          </TouchableOpacity>
        </Animated.View>
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
    padding: 20,
    paddingTop: 40,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subHeaderText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: width * 0.4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionText: {
    marginTop: 8,
    color: '#1A237E',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    color: '#1A237E',
  },
  workoutCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A237E',
  },
  workoutDetails: {
    color: '#666',
    marginTop: 5,
  },
});

export default Home;