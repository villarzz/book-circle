import { View, Text, Button } from "react-native";
import { RootStackParamList } from "../routes/stack.routes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "feed">;

export default function Feed({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Página do Feed</Text>
      <Button title="Voltar para Login" onPress={() => navigation.navigate("login")} />
    </View>
  );
}
