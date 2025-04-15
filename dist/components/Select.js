"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Select;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const react_native_svg_1 = __importStar(require("react-native-svg"));
const Divider_1 = __importDefault(require("./Divider"));
const ANIMATION_DURATION = 500;
const DEFAULT_SELECTED_ITEM_BACKGROUND_COLOR = "#eee";
const DEFAULT_ITEM_BACKGROUND_COLOR = "#fff";
const DEFAULT_SELECTED_ITEM_LABEL_COLOR = "#333";
const DEFAULT_ITEM_LABEL_COLOR = "#333";
const DEFAULT_ARROW_COLOR = "rgba(0,0,0,.75)";
const DEFAULT_CHECK_COLOR = "rgba(0,0,0,.75)";
const DEFAULT_ARROW_SIZE = 12;
const DEFAULT_CHECK_SIZE = 16;
function AngleDown({ size, color }) {
    return (<react_native_svg_1.default width={size} height={size} viewBox="0 0 448 512">
      <react_native_svg_1.Path fill={color} d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
    </react_native_svg_1.default>);
}
function Check({ size, color }) {
    return (<>
      <react_native_svg_1.default width={size} height={size} viewBox="0 0 448 512">
        <react_native_svg_1.Path fill={color} d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
      </react_native_svg_1.default>
    </>);
}
const AnimatedScrollView = react_native_reanimated_1.default.createAnimatedComponent(react_native_gesture_handler_1.ScrollView);
const AnimatedPressable = react_native_reanimated_1.default.createAnimatedComponent(react_native_1.Pressable);
function SelectItem({ onPress, item, value, picture, itemBackgroundColor = DEFAULT_ITEM_BACKGROUND_COLOR, selectedItemBackgroundColor = DEFAULT_SELECTED_ITEM_BACKGROUND_COLOR, itemLabelColor = DEFAULT_ITEM_LABEL_COLOR, selectedItemLabelColor = DEFAULT_SELECTED_ITEM_LABEL_COLOR, checkColor, checkSize, itemLabelStyle, selectedItemLabelStyle, }) {
    const isActive = (0, react_native_reanimated_1.useSharedValue)(0);
    const [isActiveItem, setIsActiveItem] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (value) {
            setIsActiveItem((item === null || item === void 0 ? void 0 : item.value) === (value === null || value === void 0 ? void 0 : value.value));
            isActive.value = (0, react_native_reanimated_1.withSpring)((item === null || item === void 0 ? void 0 : item.value) === (value === null || value === void 0 ? void 0 : value.value) ? 1 : 0, {
                duration: ANIMATION_DURATION,
            });
        }
    }, [item, value, isActive]);
    const animatedCheckStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const scale = (0, react_native_reanimated_1.interpolate)(isActive.value, [0, 1], [0, 1], react_native_reanimated_1.Extrapolation.CLAMP);
        return {
            transform: [
                {
                    scale,
                },
            ],
        };
    });
    const animatedContainerStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const backgroundColor = (0, react_native_reanimated_1.interpolateColor)(isActive.value, [0, 1], [itemBackgroundColor, selectedItemBackgroundColor]);
        return {
            backgroundColor,
        };
    });
    const animatedActiveLabelColor = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const color = (0, react_native_reanimated_1.interpolateColor)(isActive.value, [0, 1], [itemLabelColor, selectedItemLabelColor]);
        return {
            color,
        };
    });
    return (<>
      <AnimatedPressable onPress={onPress} style={[styles.dropdownItem, animatedContainerStyle]}>
        <react_native_1.View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          {picture && (<react_native_1.Image resizeMode="contain" style={{ width: 20, height: 20 }} source={picture}/>)}
          <react_native_reanimated_1.default.Text style={[
            styles.itemLabel,
            itemLabelStyle,
            isActiveItem && selectedItemLabelStyle,
            animatedActiveLabelColor,
        ]}>
            {item === null || item === void 0 ? void 0 : item.label}
          </react_native_reanimated_1.default.Text>
        </react_native_1.View>
        {item.label === (value === null || value === void 0 ? void 0 : value.label) && (<react_native_reanimated_1.default.View style={[animatedCheckStyle]}>
            <Check size={checkSize} color={checkColor}/>
          </react_native_reanimated_1.default.View>)}
      </AnimatedPressable>
    </>);
}
function Select({ containerStyle, inputContainerStyle, labelStyle, isRequired = false, isError, errorMessage, label, placeholder = "Select option", data = [], onChange, value, shouldCloseAfterSelection = false, isArrowShown = true, itemBackgroundColor, selectedItemBackgroundColor, itemLabelColor, selectedItemLabelColor, itemLabelStyle, selectedItemLabelStyle, checkColor = DEFAULT_CHECK_COLOR, checkSize = DEFAULT_CHECK_SIZE, arrowColor = DEFAULT_ARROW_COLOR, arrowSize = DEFAULT_ARROW_SIZE, placeholderStyle, arrowContainerStyle, customArrowIcon, onSelectClosed, onSelectOpened, }) {
    const isOpen = (0, react_native_reanimated_1.useSharedValue)(0);
    const dropdownRef = (0, react_native_reanimated_1.useAnimatedRef)();
    const animatedArrowStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const rotation = (0, react_native_reanimated_1.interpolate)(isOpen.value, [0, 1], [0, -180], react_native_reanimated_1.Extrapolation.CLAMP);
        return {
            transform: [
                {
                    rotate: `${rotation}deg`,
                },
            ],
        };
    });
    const animatedDropdownStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        var _a;
        const measuredDropdownHeight = (_a = (0, react_native_reanimated_1.measure)(dropdownRef)) === null || _a === void 0 ? void 0 : _a.height;
        if (!measuredDropdownHeight) {
            return {};
        }
        const height = (0, react_native_reanimated_1.interpolate)(isOpen.value, [0, 1], [0, measuredDropdownHeight], react_native_reanimated_1.Extrapolation.CLAMP);
        return {
            height,
            overflow: "hidden",
            position: "absolute",
            width: "100%",
            top: 56,
            zIndex: 99999,
        };
    });
    function handlePress() {
        if (isOpen.value) {
            onSelectClosed && onSelectClosed();
        }
        else {
            onSelectOpened && onSelectOpened();
        }
        isOpen.value = (0, react_native_reanimated_1.withTiming)(isOpen.value ? 0 : 1, {
            duration: ANIMATION_DURATION,
        });
    }
    return (<react_native_1.View style={[styles.container, containerStyle]}>
      {label && (<react_native_1.Text style={[styles.label, labelStyle]}>
          {label} {isRequired && <react_native_1.Text style={[styles.star]}>*</react_native_1.Text>}{" "}
        </react_native_1.Text>)}
      <react_native_1.TouchableOpacity onPress={handlePress} style={[
            styles.inputContainer,
            inputContainerStyle,
            isError && { borderColor: "red" },
        ]}>
        <react_native_1.View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          {(value === null || value === void 0 ? void 0 : value.picture) && (<react_native_1.Image resizeMode="contain" style={{ width: 20, height: 20 }} source={value === null || value === void 0 ? void 0 : value.picture}/>)}
          <react_native_1.Text style={[styles.label, placeholderStyle]}>
            {value ? value === null || value === void 0 ? void 0 : value.label : placeholder}
          </react_native_1.Text>
        </react_native_1.View>
        {isArrowShown && (<react_native_1.View style={[arrowContainerStyle]}>
            <react_native_reanimated_1.default.View style={[animatedArrowStyle]}>
              {customArrowIcon ? (customArrowIcon) : (<AngleDown size={arrowSize} color={arrowColor}/>)}
            </react_native_reanimated_1.default.View>
          </react_native_1.View>)}
      </react_native_1.TouchableOpacity>
      <react_native_reanimated_1.default.View style={[animatedDropdownStyle]}>
        <AnimatedScrollView style={[styles.dropdown]} ref={dropdownRef}>
          {data === null || data === void 0 ? void 0 : data.map((item, index) => (<react_native_1.View key={index}>
              <SelectItem value={value} item={item} picture={item === null || item === void 0 ? void 0 : item.picture} itemBackgroundColor={itemBackgroundColor} selectedItemBackgroundColor={selectedItemBackgroundColor} itemLabelColor={itemLabelColor} selectedItemLabelColor={selectedItemLabelColor} itemLabelStyle={itemLabelStyle} selectedItemLabelStyle={selectedItemLabelStyle} checkColor={checkColor} checkSize={checkSize} onPress={() => {
                onChange && onChange(item);
                if (shouldCloseAfterSelection) {
                    isOpen.value = (0, react_native_reanimated_1.withTiming)(0, {
                        duration: ANIMATION_DURATION,
                    });
                    setTimeout(() => {
                        var _a;
                        (_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({ y: 0 });
                    }, 750);
                }
            }}/>
              {index < (data === null || data === void 0 ? void 0 : data.length) - 1 && (<Divider_1.default dividerStyle={{ height: 1 }}/>)}
            </react_native_1.View>))}
        </AnimatedScrollView>
      </react_native_reanimated_1.default.View>
      {isError && <react_native_1.Text style={[styles.error]}>{errorMessage}</react_native_1.Text>}
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        gap: 8,
    },
    inputContainer: {
        borderRadius: 8,
        padding: 16,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 6,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,.25)",
        minHeight: 50,
    },
    label: {
        color: "rgba(0,0,0,.75)",
    },
    error: {
        color: "red",
        fontSize: 12,
        marginStart: 8,
    },
    star: {
        color: "red",
    },
    dropdown: {
        backgroundColor: "#fff",
        position: "absolute",
        width: "100%",
        top: 0,
        borderRadius: 7,
        borderColor: "rgba(0,0,0,.25)",
        borderWidth: 1,
        zIndex: 9999,
        maxHeight: 150,
    },
    dropdownItem: {
        backgroundColor: "#fff",
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemLabel: {
        color: "rgba(0,0,0,.75)",
    },
});
