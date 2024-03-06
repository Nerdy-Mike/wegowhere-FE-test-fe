import { FC } from "react";
import { Text, TouchableOpacity } from "react-native";
import clsx from "clsx";
import BackIcon from "@/assets/svg/back-icon.svg";

interface INavButtonProps {
  icon?: any;
  withIcon?: boolean;
  withBackIcon?: boolean;
  text?: string;
  textClassName?: string;
  onPress?: () => void;
  testID?: string;
}

const NavButton: FC<INavButtonProps> = ({
  icon,
  withIcon,
  withBackIcon,
  text,
  textClassName,
  onPress,
  testID,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={clsx("flex flex-row items-center")}
      onPress={onPress}
      testID={testID}
    >
      {withBackIcon && <BackIcon />}
      {withIcon && icon}
      <Text
        className={clsx(
          "pl-[5px] text-center text-lg font-normal text-black",
          textClassName
        )}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default NavButton;
