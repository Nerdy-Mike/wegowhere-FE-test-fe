import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

import { Button } from "@/components/Buttons/Button";

/* Hooks */
import { useTypedNavigation } from "@/hooks/navigation";

const NoCardFound = () => {
  const navigation = useTypedNavigation();

  return (
    <View className="w-full h-full flex items-center justify-center gap-y-4 px-[20%]">
      <Image source={require("assets/card.png")} />
      <Text className="text-lg text-center">No Cards Found</Text>
      <Text className="text-lg text-center">
        We recommend adding a card for easy payment
      </Text>
      <Button
        title="Add New Card"
        containerClassName="w-full"
        textClassName="text-primary-default text-lg"
        onPress={() => {
          navigation.navigate("AddCardScreen");
        }}
      />
    </View>
  );
};

const CardScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <NoCardFound />
    </ScrollView>
  );
};

export default CardScreen;
