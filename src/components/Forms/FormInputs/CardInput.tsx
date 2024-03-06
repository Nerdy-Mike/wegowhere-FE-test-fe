import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

/* Assets */
import JCBSvg from "@/assets/svg/jcb.svg";
import VisaSvg from "@/assets/svg/visa.svg";
import MastercardSvg from "@/assets/svg/mastercard.svg";

type CardInputProps = React.ComponentProps<typeof TextInput> & {
  label: string;
  errorText?: string;
};

const CardInput: React.FC<CardInputProps> = (props) => {
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
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    // If the last character is a space, remove it
    if (formattedText.endsWith(" ")) {
      formattedText = formattedText.slice(0, formattedText.length - 1);
    }
    setValue(formattedText);
    onChangeText && onChangeText(formattedText ? formattedText : "");
  };

  return (
    <View style={style}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.searchSection}>
        <TextInput
          style={[
            styles.input,
            isFocused ? styles.focusedInput : styles.blurredInput,
          ]}
          {...restOfProps}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          placeholder={placeholder}
          value={value}
          onChangeText={handleChange}
          keyboardType="numeric"
          maxLength={19} // 16 digits + 3 spaces
        />
        <View style={styles.icon}>
          <VisaSvg width={24} height={24} />
          <MastercardSvg width={24} height={24} />
          <JCBSvg width={24} height={24} />
        </View>
      </View>
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: 24,
    borderColor: "#E6E3E6",
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
  labelContainer: {
    backgroundColor: "white",
  },
  label: {
    fontFamily: "Regular",
    fontSize: 15,
    fontWeight: "500",
    paddingBottom: 8,
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  icon: {
    position: "absolute",
    right: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});
export default CardInput;
