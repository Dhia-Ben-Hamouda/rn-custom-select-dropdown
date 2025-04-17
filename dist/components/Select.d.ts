import React from "react";
import { ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from "react-native";
export interface ISelectItem<T> {
    label: string;
    value: T;
    picture?: ImageSourcePropType;
}
interface ISelect<T> {
    labelStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    isRequired?: boolean;
    isError?: boolean;
    errorMessage?: string;
    label?: string;
    placeholder?: string;
    data: Array<ISelectItem<T>>;
    value: null | ISelectItem<T>;
    onChange?: (newValue: ISelectItem<T>) => void;
    shouldCloseAfterSelection?: boolean;
    isArrowShown?: boolean;
    itemBackgroundColor?: string;
    selectedItemBackgroundColor?: string;
    itemLabelColor?: string;
    selectedItemLabelColor?: string;
    itemLabelStyle?: StyleProp<TextStyle>;
    selectedItemLabelStyle?: StyleProp<TextStyle>;
    placeholderStyle?: StyleProp<TextStyle>;
    checkColor?: string;
    checkSize?: number;
    arrowColor?: string;
    arrowSize?: number;
    arrowContainerStyle?: StyleProp<ViewStyle>;
    customArrowIcon?: React.ReactNode;
    onSelectOpened?: () => void;
    onSelectClosed?: () => void;
}
export default function Select<T>({ containerStyle, inputContainerStyle, labelStyle, isRequired, isError, errorMessage, label, placeholder, data, onChange, value, shouldCloseAfterSelection, isArrowShown, itemBackgroundColor, selectedItemBackgroundColor, itemLabelColor, selectedItemLabelColor, itemLabelStyle, selectedItemLabelStyle, checkColor, checkSize, arrowColor, arrowSize, placeholderStyle, arrowContainerStyle, customArrowIcon, onSelectClosed, onSelectOpened, }: ISelect<T>): React.JSX.Element;
export {};
