import React, { ReactNode } from "react";
import { ScrollView } from "react-native";

interface ScrollContainerProps {
  children: ReactNode;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({ children }) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#fff",
        padding: 20,
      }}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollContainer;
