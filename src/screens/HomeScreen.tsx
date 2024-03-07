import { Button, StyleSheet, Text, View } from "react-native";

import ScrollContainer from "@/components/ScrollContainer";
import { useTypedNavigation } from "@/hooks/navigation";

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
