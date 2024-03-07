import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import FlipCard from "react-native-flip-card";

import type { UserCard } from "@/types/UserCard";

/* Assets */
import DotSvg from "@/assets/svg/dots.svg";

/* Hooks */
import { useTypedNavigation } from "@/hooks/navigation";

interface CardProps {
  card: UserCard;
}

export const Card: React.FC<CardProps> = ({ card }) => {
  const navigation = useTypedNavigation();

  const handleCardPress = () => {
    navigation.navigate("PayModal", { cardInfo: card });
  };
  return (
    <TouchableOpacity onPress={handleCardPress} className="h-full w-full">
      <View style={[styles.card, styles.shadowProp]}>
        <View className="flex flex-row gap-6 justify-start items-center">
          <DotSvg />
          <DotSvg />
          <DotSvg />
          <Text style={styles.cardNumber}>{card.cardNumber.slice(-4)}</Text>
        </View>
        <View style={styles.cardDetailsContainer}>
          <View className="text-[#8F8F8F]">
            <Text>Name on Card</Text>
            <Text style={styles.cardDetails}>{card.name}</Text>
          </View>

          <View>
            <Text>Expires</Text>
            <Text style={styles.cardDetails}>{card.expiry}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 30,
    borderRadius: 10,
    width: "100%",
    height: 200,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    alignSelf: "center",
    margin: 10,
    color: "#000",
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.31,
    shadowRadius: 7.16,
    elevation: 20,
  },
  cardNumber: {
    color: "#808080",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 20,
  },
  cardDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    color: "#8F8F8F",
  },
  cardDetails: {
    color: "#000",
    fontSize: 20,
  },
});
