import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import Feed from '../pages/Feed';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='login' component={Login}></Stack.Screen>
            <Stack.Screen name='feed' component={Feed}></Stack.Screen>
        </Stack.Navigator>
    );
}
