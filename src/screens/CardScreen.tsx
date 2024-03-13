import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

/* Lib */
import { retrieveDataKeychain } from "@/lib/keychain";

/* Type */
import type { UserCard } from "@/types/UserCard";

/* Components */
import { Card } from "@/components/Cards/Card";
import { Button } from "@/components/Buttons/Button";

/* Hooks */
import ScrollContainer from "@/components/ScrollContainer";
import { useTypedNavigation } from "@/hooks/navigation";
import { useFocusEffect } from "@react-navigation/native";

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
  const [userCards, setUserCards] = useState<UserCard[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const getUserCards = async () => {
        const cards = await retrieveDataKeychain(
          process.env.APP_KEYCHAIN_SECRET as string
        );
        if (cards) {
          setUserCards(cards);
        }
      };

      getUserCards();

      return () => {
        setUserCards([]);
      };
    }, [])
  );

  if (userCards === null) {
    return <Text>Loading...</Text>;
  } else if (userCards === undefined) {
    return (
      <ScrollContainer>
        <NoCardFound />
      </ScrollContainer>
    );
  } else {
    return (
      <ScrollContainer>
        <View className="flex-1 flex flex-col ">
          {userCards.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </View>
      </ScrollContainer>
    );
  }
};

export default CardScreen;
