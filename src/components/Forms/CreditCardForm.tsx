import React from "react";
import {
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

/* Validators */
import CardInputValidationSchema from "@/validators/CardInputValidator";

/* Components */
import { Button } from "@/components/Buttons/Button";
import TextField from "@/components/Forms/FormInputs/TextField";
import CardInput from "@/components/Forms/FormInputs/CardInput";
import CardExpiryDateInput from "./FormInputs/ExpireDateInput";

/* Assets */
import SecurePaymentSvg from "@/assets/svg/secure_payment.svg";

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

  const onSubmit = (data: any) => {
    console.log("form submitted", data);
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
