import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CadastroScreen from "../screens/CadastroScreen";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

type AuthRoutes = {
  cadastroScreen: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="cadastroScreen" component={CadastroScreen} />
    </Navigator>
  );
}
