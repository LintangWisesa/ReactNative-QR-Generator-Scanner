import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home'
import QRgenerator from './screens/QRgenerator'
import QRscanner from './screens/QRscanner'
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'React Native QR Code' }}/>
        <Stack.Screen name="QR Generator" component={QRgenerator} />
        <Stack.Screen name="QR Scanner" component={QRscanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;