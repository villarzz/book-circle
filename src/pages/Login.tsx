import '../../global.css';
import { RootStackParamList } from '../routes/stack.routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Image, TextInput, Text, TouchableOpacity } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'login'>;

export default function Login({ navigation }: Props) {
  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('../../assets/logo.png')}
        style={{ width: 250, height: 250 }}
      />

      <View>
        <Text style={{ fontSize: 34, fontWeight: '700', color: '#304e6b', letterSpacing: 0.3 }}>Login</Text>
      </View>
      <View style={{ width: '325px', marginTop: 24 }}>
        <TextInput
          style={{
            width: '100%',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#d4d4d8',
            padding: 12,
            color: '#000',
          }}
          placeholder="E-mail"
          placeholderTextColor={'#a1a1aa'}
        />
        <Text style={{ padding: 4, color: '#a1a1aa' }}>
          Por favor, insira um e-mail válido.
        </Text>
      </View>
      <View style={{ width: '325px', marginTop: 16 }}>
        <TextInput
          style={{
            width: '100%',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#d4d4d8',
            padding: 12,
            color: '#000',
          }}
          placeholder="Senha"
          placeholderTextColor={'#a1a1aa'}
          secureTextEntry={true}
        />
        <Text style={{ padding: 4, color: '#a1a1aa' }}>
          Por favor, insira uma senha válida.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('feed')}
        style={{
          backgroundColor: '#3d87bf',
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
          alignItems: 'center',
          width: '325px',
          marginTop: 24,
        }}>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
