import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Login from '../pages/Login';
import TabNavigator from '../navigation/TabNavigator';
import AddBookScreen from '../screens/AddBookScreen';

export type RootStackParamList = {
  login: undefined;
  main: undefined;
  addBook: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackRoutes() {
  return (
    <PaperProvider>
      <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="main" component={TabNavigator} />
        <Stack.Screen
          name="addBook"
          component={AddBookScreen}
          options={{
            headerShown: true,
            title: 'Adicionar Livro',
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTintColor: '#304e6b',
          }}
        />
      </Stack.Navigator>
    </PaperProvider>
  );
}
