import { NavigationProp, useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "@/navigation/navigation.type";

export const useTypedNavigation = () => {
  return useNavigation<NavigationProp<RootStackParamList>>();
};
