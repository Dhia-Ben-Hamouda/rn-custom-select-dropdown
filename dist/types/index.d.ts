import { ImageSourcePropType } from "react-native";
export interface ISelectItem<T> {
    label: string;
    value: T;
    picture?: ImageSourcePropType;
}
