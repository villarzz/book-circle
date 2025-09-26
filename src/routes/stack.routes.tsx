import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import Feed from '../pages/Feed';

export type RootStackParamList = {
  login: undefined;
  feed: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="feed" component={Feed} />
    </Stack.Navigator>
  );
}