"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Divider;
const react_native_1 = require("react-native");
function Divider({ dividerStyle }) {
    return <react_native_1.View style={[styles.divider, dividerStyle]}/>;
}
const styles = react_native_1.StyleSheet.create({
    divider: {
        width: "100%",
        height: 2,
        backgroundColor: "rgba(0,0,0,.15)",
    },
});
