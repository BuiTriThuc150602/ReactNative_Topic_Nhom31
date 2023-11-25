import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screen/Login';
import HomeTab from './screen/HomeTab';
import Register from './screen/Register';
import Detail from './screen/Detail';

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
