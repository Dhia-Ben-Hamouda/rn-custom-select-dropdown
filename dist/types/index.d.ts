import { ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from "react-native";
export interface ISelectItem<T> {
    label: string;
    value: T;
    picture?: ImageSourcePropType;
}
export interface ISelect<T> {
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
