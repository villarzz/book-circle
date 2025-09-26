import '../../global.css';
import { RootStackParamList } from '../routes/stack.routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Image, TextInput, Text, TouchableOpacity } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'login'>;

export default function Login({ navigation }: Props) {
  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
      <Image
        source={require('../../assets/logo.png')}
        style={{ width: 200, height: 200, marginTop: 55 }}
      />
      <View>
        <Text style={{ marginBottom: 4 }}>Usuário</Text>
        <TextInput
          style={{
            width: '100%',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#d4d4d8',
            padding: 12,
            color: '#000',
          }}
          placeholder="Enter your e-mail"
          placeholderTextColor="#a1a1aa"
        />
        <Text style={{ padding: 4, color: '#a1a1aa' }}>
          Please enter a valid e-mail. e.g.: user@example.com
        </Text>
      </View>
      <View>
        <Text style={{ marginBottom: 4 }}>Senha</Text>
        <TextInput
          style={{
            width: '100%',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#d4d4d8',
            padding: 12,
            color: '#000',
          }}
          placeholder="Enter your e-mail"
          placeholderTextColor="#a1a1aa"
        />
        <Text style={{ padding: 4, color: '#a1a1aa' }}>
          Please enter a valid e-mail. e.g.: user@example.com
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('feed')}
        style={{
          backgroundColor: '#007AFF',
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
          alignItems: 'center',
          width: '325px',
        }}>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
