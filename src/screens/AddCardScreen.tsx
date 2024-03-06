import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

/* Components */
import ScrollContainer from "@/components/ScrollContainer";
import CreditCardForm from "@/components/Forms/CreditCardForm";

const AddCardScreen = () => {


  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={60}
        style={{ flex: 1 }} // Add bottom padding here
      >
        <ScrollContainer>
          <CreditCardForm />
        </ScrollContainer>
      </KeyboardAvoidingView>
    </KeyboardAwareScrollView>
  );
};
export default AddCardScreen;
