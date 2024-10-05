import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeartScreen from "../screens/HeartScreen";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

type AppRoutes = {
  heartScreen: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="heartScreen" component={HeartScreen} />
    </Navigator>
  );
}
