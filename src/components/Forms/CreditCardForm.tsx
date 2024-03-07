import React from "react";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Buffer } from "buffer";
import { yupResolver } from "@hookform/resolvers/yup";

/* Lib */
import { addCardKeychain, retrieveDataKeychain } from "@/lib/keychain";

/* Validators */
import CardInputValidationSchema from "@/validators/CardInputValidator";

/* Components */
import { Button } from "@/components/Buttons/Button";
import TextField from "@/components/Forms/FormInputs/TextField";
import CardInput from "@/components/Forms/FormInputs/CardInput";
import CardExpiryDateInput from "./FormInputs/ExpireDateInput";

/* Assets */
import SecurePaymentSvg from "@/assets/svg/secure_payment.svg";

async function createCustomerAndCard() {
  const apiUrl = "https://api.omise.co/customers";
  const publicKey = "skey_test_5wvisdjjoqmfof5npzw"; // Replace with your Omise public key

  const requestBody = {
    card: "tokn_test_5z06r3cxa51tf6ul3sa",
    description: "Test 1",
    email: "test@gmail.com",
    metadata: {},
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + Buffer.from(publicKey + ":").toString("base64"),
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();
    console.log("Response:", responseData.cards.data);
    // Handle the response data as needed
  } catch (error) {
    console.error("Error:", error);
    // Handle errors
  }
}

async function createCustomer(
  cardToken: string,
  description: string,
  email: string,
  metadata: object
) {
  try {
    const response = await fetch("https://api.omise.co/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("YOUR_OMISE_SECRET_KEY" + ":"), // replace 'YOUR_OMISE_SECRET_KEY' with your actual secret key
      },
      body: JSON.stringify({
        card: "tokn_test_5z06nf00vujyflsohma",
        description: "Test 1",
        email: "test@gmail.com",
        metadata: {},
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      Alert.alert("Error", responseData.message);
      return;
    }

    console.log("Customer created:", responseData);
    // Handle the response data as needed
  } catch (error) {
    console.error("Error:", error);
    // Handle errors
  }
}

const CreditCardForm: React.FC = () => {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    cardNumber: string;
    name: string;
    expiration: string;
    cvv: string;
  }>({
    defaultValues: {
      cardNumber: "",
      name: "",
      expiration: "",
      cvv: "",
    },
    resolver: yupResolver(CardInputValidationSchema()),
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: {
    cardNumber: string;
    name: string;
    expiration: string;
    cvv: string;
  }) => {
    addCardKeychain(process.env.APP_KEYCHAIN_SECRET as string, {
      name: data.name,
      cardNumber: data.cardNumber,
      expiry: data.expiration,
      cvv: data.cvv,
    });
  };

  return (
    <View className="w-full h-full flex-1 flex flex-col justify-between pb-10">
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CardInput
              style={styles.textField}
              label="ATM/Debit/Credit card number"
              placeholder="0000 0000 0000 0000"
              value={value}
              onChangeText={onChange}
              errorText={errors.cardNumber?.message}
            />
          )}
          name="cardNumber"
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              style={styles.textField}
              label="Name on Card"
              placeholder="Ty Lee"
              value={value}
              onChangeText={onChange}
              errorText={errors.name?.message}
            />
          )}
          name="name"
          defaultValue=""
        />

        <View className="flex flex-row mb-10">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CardExpiryDateInput
                style={[
                  styles.textField,
                  {
                    marginRight: 24,
                  },
                ]}
                label="Expiry date"
                placeholder="MM/YY"
                value={value}
                keyboardType="numeric"
                onChangeText={onChange}
                errorText={errors.expiration?.message}
              />
            )}
            name="expiration"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                style={styles.textField}
                label="CVV"
                value={value}
                keyboardType="numeric"
                onChangeText={onChange}
                errorText={errors.cvv?.message}
                maxLength={3}
              />
            )}
            name="cvv"
            defaultValue=""
          />
        </View>
        <View className="flex items-center justify-center">
          <SecurePaymentSvg />
        </View>
      </View>

      <Button
        title="Add Card"
        onPress={handleSubmit(onSubmit)}
        containerClassName="w-full bg-primary-default"
        textClassName="text-white font-bold"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textField: {
    flex: 1,
    marginTop: 24,
  },
});
export default CreditCardForm;
