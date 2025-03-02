--- 
+++ 
@@ -1,319 +1,57 @@
-import { StatusBar } from 'expo-status-bar';
-import { Text, View, StyleSheet, TouchableOpacity, Platform, Image, ViewStyle, TextStyle } from 'react-native';
-import { useState } from 'react';
-import * as ImagePicker from 'expo-image-picker';
-import './global.css';
-
-type ViewName = 'main' | 'instructions' | 'camera';
-type PlatformType = 'ios' | 'android';
-
-interface ButtonProps {
-  text: string;
-  onPress: () => void;
-  style?: ViewStyle | ViewStyle[];
-}
-
-export default function App(): JSX.Element {
-  const [currentView, setCurrentView] = useState<ViewName>('main');
-  const [platform, setPlatform] = useState<PlatformType>('ios');
-  const [image, setImage] = useState<string | null>(null);
-
-  // const [showInstallButton, setShowInstallButton] = useState(false);
-  // const [deferredPrompt, setDeferredPrompt] = useState(null);
-
-  // window.addEventListener('beforeinstallprompt', (e) => {
-  //   console.log('beforeinstallprompt');
-
-  //   // Prevent the mini-infobar from appearing on mobile
-  //   e.preventDefault();
-  //   // Stash the event so it can be triggered later.
-  //   setDeferredPrompt(e);
-
-  //   // Show the install button
-  //   setShowInstallButton(true);
-
-  //   // Check if "install" parameter is in URL
-  //   const urlParams = new URLSearchParams(window.location.search);
-  //   if (urlParams.has('install')) {
-  //     // Trigger install prompt automatically
-  //     handleInstallClick();
-  //   }
-
-  //   // Update UI notify the user they can install the PWA
-  //   console.log(`'beforeinstallprompt' event was fired.`);
-  // });
-
-    
-  // window.addEventListener('appinstalled', () => {
-  //   // Clear the deferredPrompt so it can be garbage collected
-  //   setDeferredPrompt(null);
-
-  //   // Optionally, send analytics event to indicate successful install
-  //   console.log('PWA was installed');
-  // });
-
-    
-  // const handleInstallClick = async () => {
-  //   if (!deferredPrompt) return;
-    
-  //   // Show the install prompt
-  //   deferredPrompt.prompt();
-  //   // Wait for the user to respond to the prompt
-  //   const { outcome } = await deferredPrompt.userChoice;
-    
-  //   if (outcome === 'accepted') {
-  //     console.log('User accepted the install prompt');
-  //   }
-  //   // Clear the deferredPrompt
-  //   setDeferredPrompt(null);
-  // };
-
-  const isWeb = Platform.OS === 'web';
-  const photoButtonText = isWeb ? 'Upload Photo' : 'Take Photo';
-
-  const openCamera = async (): Promise<void> => {
-    try {
-      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
-      if (!granted) {
-        alert('Camera permission is required');
-        return;
-      }
-      const result = await ImagePicker.launchCameraAsync({
-        allowsEditing: true,
-        quality: 1,
-      });
-      if (!result.canceled) {
-        setImage(result.assets[0].uri);
-        setCurrentView('camera');
-      }
-    } catch (error) {
-      console.error(error);
-      alert('Error accessing camera');
-    }
-  };
-
-  const renderButton = ({ text, onPress, style }: ButtonProps): JSX.Element => (
-    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
-      <Text style={styles.buttonText}>{text}</Text>
-    </TouchableOpacity>
-  );
-
-  const views: Record<ViewName, JSX.Element> = {
-    main: (
-      <View style={styles.content}>
-        <Image source={require('/public/icosahedron.svg')} style={{maxWidth: "8em", maxHeight: "8em"}} />
-        <Text style={styles.title}>Welcome to Natively!</Text>
-        {/* {showInstallButton && renderButton({text: 'Install App', onPress: handleInstallClick, style: styles.installButton})} */}
-        {renderButton({ text: 'View Instructions', onPress: () => setCurrentView('instructions'), style: styles.instructionsButton})}
-        {renderButton({ text: photoButtonText, onPress: openCamera, style: styles.cameraButton })}
-      </View>
-    ),
-    instructions: (
-      <View style={styles.content}>
-        <Text style={styles.title}>{platform === 'ios' ? 'iOS' : 'Android'} Instructions</Text>
-        <View style={styles.section}>
-          {platform === 'ios' ? (
-            <>
-              <Text style={styles.text}>1. Open your iPhone's camera</Text>
-              <Text style={styles.text}>2. Scan the QR code</Text>
-            </>
-          ) : (
-            <>
-              <Text style={styles.text}>1. Download Expo Go from the Play Store</Text>
-              <Text style={styles.text}>2. Open Expo Go on your device</Text>
-              <Text style={styles.text}>3. Tap "Scan QR Code" in Expo Go</Text>
-              <Text style={styles.text}>4. Scan the QR code</Text>
-            </>
-          )}
-        </View>
-        <View style={styles.buttonContainer}>
-          {renderButton({
-            text: `Switch to ${platform === 'ios' ? 'Android' : 'iOS'}`,
-            onPress: () => setPlatform(p => p === 'ios' ? 'android' : 'ios'),
-            style: styles.platformButton
-          })}
-          {renderButton({
-            text: 'Back to Main',
-            onPress: () => setCurrentView('main'),
-            style: styles.backButton
-          })}
-        </View>
-      </View>
-    ),
-    camera: (
-      <View style={styles.cameraContainer}>
-        {image ? (
-          <>
-            <Image source={{ uri: image }} style={styles.previewImage} />
-            <View style={styles.cameraControls}>
-              {renderButton({
-                text: 'Back',
-                onPress: () => {
-                  setCurrentView('main');
-                  setImage(null);
-                },
-                style: [styles.backButton, styles.cameraBackButton]
-              })}
-              {renderButton({
-                text: isWeb ? 'Upload New Photo' : 'Take New Photo',
-                onPress: openCamera,
-                style: [styles.cameraButton, styles.cameraBackButton]
-              })}
-            </View>
-          </>
-        ) : (
-          <View style={styles.content}>
-            <Text style={styles.text}>No photo taken yet</Text>
-            {renderButton({ text: photoButtonText, onPress: openCamera })}
-          </View>
-        )}
-      </View>
-    )
-  };
-
-  return (
-    <View style={styles.container}>
-      <StatusBar style="auto" />
-      {views[currentView]}
-    </View>
-  );
-}
-
-interface Styles {
-  container: ViewStyle;
-  content: ViewStyle;
-  title: TextStyle;
-  section: ViewStyle;
-  heading: TextStyle;
-  text: TextStyle;
-  buttonContainer: ViewStyle;
-  button: ViewStyle;
-  buttonText: TextStyle;
-  platformButton: ViewStyle;
-  backButton: ViewStyle;
-  spacing: ViewStyle;
-  shadow: ViewStyle;
-  flexColumn: ViewStyle;
-  cameraButton: ViewStyle;
-  cameraContainer: ViewStyle;
-  previewImage: ViewStyle;
-  cameraControls: ViewStyle;
-  cameraBackButton: ViewStyle;
-  message: TextStyle;
-}
-
-const styles = StyleSheet.create<Styles>({
-  container: {
-    flex: 1,
-    backgroundColor: '0 0 7%',
-    padding: 20,
-  },
-  content: {
-    alignItems: 'center',
-    justifyContent: 'center',
-  },
-  title: {
-    fontSize: "1.7em",
-    fontWeight: '800',
-    textAlign: 'center',
-    marginBottom: ".8em",
-    color: 'white',
-    marginTop: ".8em",
-    fontFamily: 'system-ui, sans-serif',
-  },
-  section: {
-    marginBottom: "1em",
-    width: '100%',
-    alignItems: 'center',
-  },
-  heading: {
-    fontSize: "2em",
-    fontWeight: '700',
-    marginBottom: "1em",
-    color: '#333',
-    textAlign: 'center',
-  },
-  text: {
-    fontSize: 16,
-    fontWeight: '700',
-    color: 'white',
-    marginBottom: 8,
-    lineHeight: 24,
-    textAlign: 'center',
-    fontFamily: 'system-ui, sans-serif',
-  },
-  instructionsButton: {
-    backgroundColor: '#52A549',
-  },
-  installButton: {
-    backgroundColor: '#083D77',
-  },
-  cameraButton: {
-    backgroundColor: '#F95738',
-  },
-  platformButton: {
-    backgroundColor: '#52A549',
-  },
-  backButton: {
-    backgroundColor: '#666',
-  },
-  button: {
-    backgroundColor: '#67ab32',
-    padding: ".7em",
-    borderRadius: 8,
-    marginBottom: ".5em",
-    width: '80%',
-    shadowColor: '#000',
-    shadowOffset: {
-      width: 0,
-      height: 2,
-    },
-    shadowOpacity: 0.25,
-    shadowRadius: 3.84,
-    elevation: 5,
-  },
-  buttonText: {
-    color: '#fff',
-    fontSize: "1em",
-    fontWeight: 'bold',
-    textAlign: 'center',
-  },
-  shadow: {
-    shadowColor: '#000',
-    shadowOffset: { width: 0, height: 2 },
-    shadowOpacity: 0.2,
-    shadowRadius: 4,
-    elevation: 4,
-  },
-  flexColumn: {
-    flex: 1,
-    flexDirection: 'column',
-  },
-  cameraContainer: {
-    flex: 1,
-    width: '100%',
-    height: '100%',
-    justifyContent: 'space-between',
-  },
-  previewImage: {
-    width: '100%',
-    height: '80%',
-    resizeMode: 'contain',
-  },
-  cameraControls: {
-    flexDirection: 'row',
-    justifyContent: 'space-around',
-    padding: 20,
-    backgroundColor: 'transparent',
-  },
-  cameraBackButton: {
-    width: '40%',
-    marginBottom: 0,
-  },
-  message: {
-    fontSize: 16,
-    color: '#666',
-    marginBottom: 20,
-    textAlign: 'center',
-  },
-}); +import { NavigationContainer } from '@react-navigation/native';
+import { createNativeStackNavigator } from '@react-navigation/native-stack';
+import { StatusBar } from 'expo-status-bar';
+import { useEffect } from 'react';
+import { LogBox } from 'react-native';
+import { GestureHandlerRootView } from 'react-native-gesture-handler';
+import Home from './screens/Home';
+import WorkoutDetail from './screens/WorkoutDetail';
+import ExerciseLibrary from './screens/ExerciseLibrary';
+import CreateWorkout from './screens/CreateWorkout';
+
+LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
+LogBox.ignoreAllLogs(); // Ignore all log notifications
+
+const Stack = createNativeStackNavigator();
+
+export default function App() {
+  return (
+    <GestureHandlerRootView style={{ flex: 1 }}>
+      <NavigationContainer>
+        <Stack.Navigator
+          screenOptions={{
+            headerStyle: {
+              backgroundColor: '#1A237E',
+            },
+            headerTintColor: '#fff',
+            headerTitleStyle: {
+              fontWeight: 'bold',
+            },
+          }}
+        >
+          <Stack.Screen 
+            name="Home" 
+            component={Home} 
+            options={{ title: 'Workout Tracker' }} 
+          />
+          <Stack.Screen 
+            name="WorkoutDetail" 
+            component={WorkoutDetail} 
+            options={{ title: 'Workout' }} 
+          />
+          <Stack.Screen 
+            name="ExerciseLibrary" 
+            component={ExerciseLibrary} 
+            options={{ title: 'Exercise Library' }} 
+          />
+          <Stack.Screen 
+            name="CreateWorkout" 
+            component={CreateWorkout} 
+            options={{ title: 'Create Workout' }} 
+          />
+        </Stack.Navigator>
+        <StatusBar style="light" />
+      </NavigationContainer>
+    </GestureHandlerRootView>
+  );
+}