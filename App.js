import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screen/Login';
import Home from './screen/Home';
import HomeTab from './screen/HomeTab';
import Register from './screen/Register';
import Info from './screen/Info';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Info'>
        {/* <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='SignUp' component={Register} options={{headerShown: false}}/>
        <Stack.Screen name='HomeTab' component={HomeTab} options={{headerShown: false}}/> */}
        <Stack.Screen name='Info' component={Info}/>
      </Stack.Navigator>
    </NavigationContainer>

    
  );
}
