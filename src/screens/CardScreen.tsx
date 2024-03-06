import React from "react";
import { View, Text, Image } from "react-native";

import { Button } from "@/components/Buttons/Button";

/* Hooks */
import { useTypedNavigation } from "@/hooks/navigation";
import ScrollContainer from "@/components/ScrollContainer";

const NoCardFound = () => {
  const navigation = useTypedNavigation();

  return (
    <View className="w-full h-full flex items-center justify-center gap-y-4 px-[20%]">
      <Image source={require("assets/card.png")} />
      <Text className="text-lg text-center font-[Regular]">No Cards Found</Text>
      <Text className="text-lg text-center font-[Regular]">
        We recommend adding a card for easy payment
      </Text>
      <Button
        title="Add New Card"
        containerClassName="w-full"
        textClassName="text-primary-default text-lg font-[Regular]"
        onPress={() => {
          navigation.navigate("AddCardScreen");
        }}
      />
    </View>
  );
};

const CardScreen = () => {
  return (
    <ScrollContainer>
      <NoCardFound />
    </ScrollContainer>
  );
};

export default CardScreen;
