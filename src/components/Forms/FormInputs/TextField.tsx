import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

type TextFieldProps = React.ComponentProps<typeof TextInput> & {
  label: string;
  errorText?: string;
};

const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    label,
    placeholder,
    errorText,
    style,
    onBlur,
    onFocus,
    ...restOfProps
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);

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
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        placeholder={placeholder}
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
export default TextField;
