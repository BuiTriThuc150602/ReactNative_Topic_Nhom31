import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screen/Login/Login';
import Register from './screen/Login/Register';
import HomeTab from './screen/Home/HomeTab';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='SignUp' component={Register} options={{headerShown: false}}/>
        <Stack.Screen name='HomeTab' component={HomeTab} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>

    
  );
}
