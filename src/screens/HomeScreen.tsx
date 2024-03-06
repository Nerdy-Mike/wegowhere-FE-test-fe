import { Button, StyleSheet, Text, View } from "react-native";

import { useTypedNavigation } from "@/hooks/navigation";
import ScrollContainer from "@/components/ScrollContainer";

export default function HomeScreen() {
  const navigation = useTypedNavigation();

  return (
    <ScrollContainer>
      <View style={styles.container}>
        <Text>Let's pay for some thing</Text>
        <Button
          title="Go to Cards"
          onPress={() => navigation.navigate("CardScreen")}
        ></Button>
      </View>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
