import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./src/screens/Home";
import Notes from "./src/screens/Notes";
import { RoomStorage } from './src/contexts/RoomContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RoomStorage>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Notes" component={Notes}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    </RoomStorage>
  );
}

