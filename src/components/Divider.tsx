import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface IDivider {
  dividerStyle?: StyleProp<ViewStyle>;
}

export default function Divider({ dividerStyle }: IDivider) {
  return <View style={[styles.divider, dividerStyle]} />;
}

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "rgba(0,0,0,.15)",
  },
});
