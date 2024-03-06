import { Text } from "react-native";
import clsx from "clsx";

interface IAppTitleProps {
  title: string;
}

export const AppTitle = ({ title }: IAppTitleProps) => {
  return <Text className={clsx("text-title font-bold")}>{title}</Text>;
};

export default AppTitle;
