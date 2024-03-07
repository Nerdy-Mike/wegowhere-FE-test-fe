import * as SecureStore from "expo-secure-store";
import type { UserCard } from "@/types/UserCard";

// Function to save data
export async function saveDataKeychain(key: string, data: string) {
  try {
    const dataJson = JSON.stringify(data);
    await SecureStore.setItemAsync(key, dataJson);
    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

// Function to add a new card
export async function addCardKeychain(key: string, newCard: UserCard) {
  try {
    // Retrieve the existing cards
    const cardsJson = await SecureStore.getItemAsync(key);
    let cards = [];
    if (cardsJson) {
      cards = JSON.parse(cardsJson);
    }

    // Add the new card to the existing cards
    cards.push(newCard);

    // Save the updated cards back to the SecureStore
    await SecureStore.setItemAsync(key, JSON.stringify(cards));
    console.log("Card added successfully");
  } catch (error) {
    console.error("Error adding card:", error);
  }
}

// Function to retrieve data
export async function retrieveDataKeychain(key: string) {
  try {
    const dataJson = await SecureStore.getItemAsync(key);
    if (dataJson) {
      const data = JSON.parse(dataJson);
      return data;
    } else {
      console.log("No data found with the given key");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
}
