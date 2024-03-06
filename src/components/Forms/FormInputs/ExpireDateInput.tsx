import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

type CardExpiryDateInputProps = React.ComponentProps<typeof TextInput> & {
  label: string;
  errorText?: string;
};

const CardExpiryDateInput: React.FC<CardExpiryDateInputProps> = (props) => {
  const {
    label,
    placeholder,
    errorText,
    style,
    onBlur,
    onFocus,
    onChangeText,
    ...restOfProps
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [value, setValue] = useState("");

  const handleChange = (text: string) => {
    let formattedText = text
      .replace(/\D/g, "")
      .replace(/(\d{2})/g, "$1/")
      .trim();
    // If the last character is a slash, remove it
    if (formattedText.endsWith("/")) {
      formattedText = formattedText.slice(0, formattedText.length - 1);
    }
    setValue(formattedText);
    onChangeText && onChangeText(formattedText ? formattedText : "");
  };

  const handleBlur = (event: any) => {
    setIsFocused(false);
    onBlur?.(event);

    const [month, year] = value.split("/");
    if (
      parseInt(month) > 12 ||
      parseInt(year) < new Date().getFullYear() % 100
    ) {
      // Set errorText to 'Invalid date' if the month is greater than 12 or the year is in the past
      props.errorText = "Invalid date";
    }
  };

  return (
    <View style={style}>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <TextInput
        style={[
          styles.input,
          isFocused ? styles.focusedInput : styles.blurredInput,
        ]}
        {...restOfProps}
        onBlur={handleBlur}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChange}
        keyboardType="numeric"
        maxLength={5} // Limit the maximum length of the input to 5 (MM/YY)
      />
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 20,
    borderWidth: 1.5,
    borderRadius: 5,
    fontSize: 16,
  },
  focusedInput: {
    borderColor: "#4AD8DA",
  },
  blurredInput: {
    borderColor: "#E6E3E6",
  },
  label: {
    fontFamily: "Regular",
    fontSize: 15,
    fontWeight: "500",
    paddingBottom: 8,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});
export default CardExpiryDateInput;
