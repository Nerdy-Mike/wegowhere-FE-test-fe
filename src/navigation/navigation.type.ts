import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  HomeScreen: undefined;
  CardScreen: undefined;
  AddCardScreen: undefined;
};

export type NavigationRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
