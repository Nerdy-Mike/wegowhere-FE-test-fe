import { Button, StyleSheet, Text, View } from "react-native";

import { useTypedNavigation } from "@/hooks/navigation";

export default function HomeScreen() {
  const navigation = useTypedNavigation();

  return (
    <View style={styles.container}>
      <Text>Let's pay for some thing</Text>

      <Button
        title="Go to Cards"
        onPress={() => navigation.navigate("CardScreen")}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
