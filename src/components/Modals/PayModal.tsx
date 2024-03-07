import axios from "axios";
import * as yup from "yup";
import React, { useState } from "react";

import { View, Text, StyleSheet } from "react-native";
import { Route } from "@react-navigation/native";
import Omise from "omise-react-native";

import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useTypedNavigation } from "@/hooks/navigation";

import { UserCard } from "@/types/UserCard";

import { Button } from "@/components/Buttons/Button";
import TextField from "../Forms/FormInputs/TextField";
import GlobalDialogController from "../Dialog/GlobalDialogController";

interface IPayModalProps {
  route: Route<
    "PayModal",
    {
      cardInfo: UserCard;
    }
  >;
}

const PayModal = ({ route }: IPayModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useTypedNavigation();
  const { cardInfo } = route.params;

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    amount: number;
  }>({
    defaultValues: {
      amount: 0,
    },
    resolver: yupResolver(
      yup.object().shape({
        amount: yup
          .number()
          .required("Amount is required")
          .min(20, "Amount must be greater than 20"),
      })
    ),

    reValidateMode: "onSubmit",
  });

  const handlePay = async (data: any) => {
    setLoading(true);
    try {
      const token = await Omise.createToken({
        card: {
          name: cardInfo.name,
          number: cardInfo.cardNumber,
          expiration_month: cardInfo.expiry.split("/")[0],
          expiration_year: cardInfo.expiry.split("/")[1],
          security_code: cardInfo.cvv,
        },
      });

      let tokenId = token.id;
      const response = await axios.post(
        `${process.env.APP_BACKEND_URL}/omise/charges`,
        {
          amount: data.amount,
          tokenID: tokenId,
        }
      );

      if (response.data.status === "successful") {
        navigation.goBack();
        GlobalDialogController.showModal({
          title: "Payment Successful",
          button: "OK",
        });
      } else if (response.data.status === "pending") {
        GlobalDialogController.showModal({
          title: "Payment Pending",
          message: "Please check your email for payment confirmation",
          button: "OK",
        });
      }
    } catch (error) {
      GlobalDialogController.showModal({
        title: "Payment Failed",
        message: "Please try again later",
        button: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!cardInfo) {
    return <Text>Card not found</Text>;
  }

  return (
    <View className="h-full w-full bg-white p-6">
      <View>
        <Text style={styles.cardNumber}>
          You are about to pay with the card ending with:{" "}
          {cardInfo.cardNumber.slice(-4)}
        </Text>
      </View>
      <View className="flex flex-row mb-10">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              style={styles.textField}
              label="Pay Amount (THB)"
              value={`${value}`}
              keyboardType="numeric"
              onChangeText={onChange}
              errorText={errors.amount?.message}
            />
          )}
          name="amount"
          defaultValue={0}
        />
      </View>

      <Button
        title={loading ? "Processing..." : "Pay"}
        onPress={handleSubmit(handlePay)}
        containerClassName="w-full bg-primary-default"
        textClassName="text-white font-bold"
      />
    </View>
  );
};

export default PayModal;

const styles = StyleSheet.create({
  textField: {
    flex: 1,
    marginTop: 24,
  },
  cardNumber: {
    color: "#808080",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 20,
  },
});
