import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* Types */
import { RootStackParamList } from "@/navigation/navigation.type";

/* Import Screens */
import HomeScreen from "@/screens/HomeScreen";
import CardScreen from "@/screens/CardScreen";
import AddCardScreen from "@/screens/AddCardScreen";

/* Import Modals */
import PayModal from "@/components/Modals/PayModal";

/* Import Components */
import NavButton from "@/components/TopNav/NavButton";
import ScreenTitle from "@/components/TopNav/ScreenTitle";

/*Assets */
import AddIcon from "@/assets/svg/add-icon.svg";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerBackVisible: false,
          headerShown: false,
        }}
      >
        <RootStack.Group screenOptions={{ presentation: "modal" }}>
          <RootStack.Screen
            name="PayModal"
            component={PayModal}
            options={({ navigation }) => ({
              headerShown: true,
              headerTitle: () => <ScreenTitle title="Pay" />,
              headerLeft: () => (
                <NavButton
                  text="Close"
                  onPress={() => navigation.goBack()}
                  withBackIcon
                />
              ),
            })}
          />
        </RootStack.Group>

        <RootStack.Group>
          <RootStack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: true,
              headerTitle: () => <ScreenTitle title="Home" />,
            }}
          />
          <RootStack.Screen
            name="CardScreen"
            component={CardScreen}
            options={({ navigation }) => ({
              headerShown: true,
              headerTitle: () => <ScreenTitle title="Cards" />,
              headerLeft: () => (
                <NavButton
                  text="Back"
                  onPress={() => navigation.goBack()}
                  withBackIcon
                />
              ),
              headerRight: () => (
                <NavButton
                  onPress={() => navigation.navigate("AddCardScreen")}
                  withIcon
                  icon={<AddIcon />}
                />
              ),
            })}
          />
          <RootStack.Screen
            name="AddCardScreen"
            component={AddCardScreen}
            options={({ navigation }) => ({
              headerShown: true,
              headerTitle: () => <ScreenTitle title="" />,
              headerLeft: () => (
                <NavButton
                  text="Back"
                  onPress={() => navigation.goBack()}
                  withBackIcon
                />
              ),
            })}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
