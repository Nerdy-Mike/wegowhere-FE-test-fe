import { useFonts } from "expo-font";

import { RootNavigator } from "@/navigation";
import Omise from "omise-react-native";
import { EventProvider } from "react-native-outside-press";

import GlobalDialog from "@/components/Dialog/GlobalDialog";

Omise.config(process.env.OMISE_PUBLIC_KEY, "2015-11-17");

export default function App() {
  const [fontsLoaded] = useFonts({
    Regular: require("./assets/fonts/FCSubjectRounded-Regular.ttf"),
    Bold: require("./assets/fonts/FCSubjectRounded-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <EventProvider>
      <RootNavigator />
      <GlobalDialog />
    </EventProvider>
  );
}
