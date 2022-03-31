import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/screens/Home';
import Notes from './src/screens/Notes';
import { RoomStorage } from './src/contexts/RoomContext';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import SignIn from './src/screens/SignIn';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './data/firebase';
import { useEffect } from 'react';
import Groups from './src/screens/Groups';
import User from './src/screens/User';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    console.log(user, user);
  }, [user]);

  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded || loading) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
        <RoomStorage>
      <Stack.Navigator>

        {user ?
          (
          // <Stack.Screen name="Groups" component={Groups} options={{headerShown: false}}/>
           <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
          )
          : <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
        }
        <Stack.Screen name="User" component={User} options={{headerShown: false}}/>
        <Stack.Screen name="Notes" component={Notes} options={{headerShown: false}}/>

      </Stack.Navigator>
      <StatusBar style="auto" />
    </RoomStorage>
    </NavigationContainer>
  );
}

