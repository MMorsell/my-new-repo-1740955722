import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './screens/Home';
import WorkoutDetail from './screens/WorkoutDetail';
import ExerciseLibrary from './screens/ExerciseLibrary';
import CreateWorkout from './screens/CreateWorkout';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1A237E',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ title: 'Workout Tracker' }} 
          />
          <Stack.Screen 
            name="WorkoutDetail" 
            component={WorkoutDetail} 
            options={{ title: 'Workout' }} 
          />
          <Stack.Screen 
            name="ExerciseLibrary" 
            component={ExerciseLibrary} 
            options={{ title: 'Exercise Library' }} 
          />
          <Stack.Screen 
            name="CreateWorkout" 
            component={CreateWorkout} 
            options={{ title: 'Create Workout' }} 
          />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}