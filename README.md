# rn-custom-select-dropdown

A customizable dropdown select component for React Native, powered by **React Native Reanimated**, **React Native Gesture Handler**, and **React Native SVG** .

![Alt text](https://github.com/Dhia-Ben-Hamouda/rn-custom-select-dropdown/blob/main/src/assets/preview.gif)

## ✨ Features

- Smooth animations using `react-native-reanimated`
- Gesture support with `react-native-gesture-handler`
- SVG icons and via `react-native-svg`
- Full customization of style and behavior
- TypeScript support out of the box

## 📦 Installation

```bash
npm install rn-custom-select-dropdown
# or
yarn add rn-custom-select-dropdown
```

Then install the required peer dependencies:

```bash
npm install react-native-reanimated react-native-gesture-handler react-native-svg
```

Make sure you’ve properly configured:

- `react-native-reanimated` ([installation guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/))
- `react-native-gesture-handler` ([installation guide](https://docs.swmansion.com/react-native-gesture-handler/docs/))
- `react-native-svg` ([installation guide](https://github.com/software-mansion/react-native-svg))

---

## 🚀 Usage

```tsx
import React, { useState } from "react";
import { View } from "react-native";
import Select, { ISelectItem } from "rn-custom-select-dropdown";
import { england, france, spain } from "./assets";

const countries: Array<ISelectItem<string>> = [
  {
    label: "France",
    value: "France",
    picture: france,
  },
  {
    label: "England",
    value: "England",
    picture: england,
  },
  {
    label: "Spain",
    value: "Spain",
    picture: spain,
  },
];

export default function App() {
  const [selectedValue, setSelectedValue] =
    useState<ISelectItem<string> | null>(null);

  return (
    <View>
      <Select
        data={countries}
        selectedValue={selectedValue}
        onChange={setSelectedValue}
      />
    </View>
  );
}
```

---

## 🔧 Props

| Prop                          | Type                                 | Default           | Description                                            |
| ----------------------------- | ------------------------------------ | ----------------- | ------------------------------------------------------ |
| `data`                        | `ISelectItem<T>[]`                   | **required**      | List of items to show in the dropdown                  |
| `value`                       | `ISelectItem<T> \| null`             | `null`            | The currently selected item                            |
| `onChange`                    | `(newValue: ISelectItem<T>) => void` | `undefined`       | Callback when an item is selected                      |
| `placeholder`                 | `string`                             | `"Select option"` | Placeholder text when no value is selected             |
| `label`                       | `string`                             | `undefined`       | Optional label displayed above the select field        |
| `isRequired`                  | `boolean`                            | `false`           | Whether the field is required                          |
| `isError`                     | `boolean`                            | `false`           | Indicates error state                                  |
| `errorMessage`                | `string`                             | `undefined`       | Error message displayed when `isError` is true         |
| `labelStyle`                  | `StyleProp<TextStyle>`               | `undefined`       | Style for the label text                               |
| `containerStyle`              | `StyleProp<ViewStyle>`               | `undefined`       | Style for the outer container                          |
| `inputContainerStyle`         | `StyleProp<ViewStyle>`               | `undefined`       | Style for the input wrapper                            |
| `itemBackgroundColor`         | `string`                             | `undefined`       | Background color for each item                         |
| `selectedItemBackgroundColor` | `string`                             | `undefined`       | Background color for the selected item                 |
| `itemLabelColor`              | `string`                             | `undefined`       | Text color for unselected items                        |
| `selectedItemLabelColor`      | `string`                             | `undefined`       | Text color for the selected item                       |
| `itemLabelStyle`              | `StyleProp<TextStyle>`               | `undefined`       | Custom text style for item labels                      |
| `selectedItemLabelStyle`      | `StyleProp<TextStyle>`               | `undefined`       | Custom text style for the selected item label          |
| `placeholderStyle`            | `StyleProp<TextStyle>`               | `undefined`       | Style for the placeholder text                         |
| `checkColor`                  | `string`                             | `undefined`       | Color of the check icon shown for selected item        |
| `checkSize`                   | `number`                             | `undefined`       | Size of the check icon                                 |
| `arrowColor`                  | `string`                             | `undefined`       | Color of the dropdown arrow                            |
| `arrowSize`                   | `number`                             | `undefined`       | Size of the dropdown arrow                             |
| `arrowContainerStyle`         | `StyleProp<ViewStyle>`               | `undefined`       | Style for the arrow container                          |
| `customArrowIcon`             | `React.ReactNode`                    | `undefined`       | Custom arrow icon component                            |
| `shouldCloseAfterSelection`   | `boolean`                            | `true`            | Determines whether the dropdown closes after selection |
| `isArrowShown`                | `boolean`                            | `true`            | Show or hide the arrow icon                            |
| `onSelectOpened`              | `() => void`                         | `undefined`       | Callback triggered when the dropdown opens             |
| `onSelectClosed`              | `() => void`                         | `undefined`       | Callback triggered when the dropdown closes            |

## 📦 `ISelectItem<T>`

| Prop      | Type                  | Default      | Description                          |
| --------- | --------------------- | ------------ | ------------------------------------ |
| `label`   | `string`              | **required** | Text to display for the option       |
| `value`   | `T`                   | **required** | Value associated with the option     |
| `picture` | `ImageSourcePropType` | `undefined`  | Optional image shown with the option |

---

## 📚 Contributing

Issues and pull requests are welcome! Please open an issue first to discuss major changes.

Made with ❤️ by Dhia Ben Hamouda
