import { RouteProp } from "@react-navigation/native";

import { UserCard } from "@/types/UserCard";

export type RootStackParamList = {
  HomeScreen: undefined;
  CardScreen: undefined;
  AddCardScreen: undefined;

  PayModal: {
    cardInfo: UserCard;
  };
};

export type NavigationRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
