import { useFonts } from "expo-font";

import { RootNavigator } from "@/navigation";

export default function App() {
  const [fontsLoaded] = useFonts({
    Regular: require("./assets/fonts/FCSubjectRounded-Regular.ttf"),
    Bold: require("./assets/fonts/FCSubjectRounded-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <RootNavigator />;
}
