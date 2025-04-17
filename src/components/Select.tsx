import React, { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import Divider from "./Divider";
import { ISelectItem } from "../types";

const ANIMATION_DURATION = 500;
const DEFAULT_SELECTED_ITEM_BACKGROUND_COLOR = "#eee";
const DEFAULT_ITEM_BACKGROUND_COLOR = "#fff";
const DEFAULT_SELECTED_ITEM_LABEL_COLOR = "#333";
const DEFAULT_ITEM_LABEL_COLOR = "#333";
const DEFAULT_ARROW_COLOR = "rgba(0,0,0,.75)";
const DEFAULT_CHECK_COLOR = "rgba(0,0,0,.75)";
const DEFAULT_ARROW_SIZE = 12;
const DEFAULT_CHECK_SIZE = 16;

function AngleDown({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 448 512">
      <Path
        fill={color}
        d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
      />
    </Svg>
  );
}

function Check({ size, color }: { size: number; color: string }) {
  return (
    <>
      <Svg width={size} height={size} viewBox="0 0 448 512">
        <Path
          fill={color}
          d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
        />
      </Svg>
    </>
  );
}

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function SelectItem<T>({
  onPress,
  item,
  value,
  picture,
  itemBackgroundColor = DEFAULT_ITEM_BACKGROUND_COLOR,
  selectedItemBackgroundColor = DEFAULT_SELECTED_ITEM_BACKGROUND_COLOR,
  itemLabelColor = DEFAULT_ITEM_LABEL_COLOR,
  selectedItemLabelColor = DEFAULT_SELECTED_ITEM_LABEL_COLOR,
  checkColor,
  checkSize,
  itemLabelStyle,
  selectedItemLabelStyle,
}: {
  onPress: () => void;
  item: ISelectItem<T>;
  value: ISelectItem<T> | null;
  picture?: ImageSourcePropType;
  itemBackgroundColor?: string;
  selectedItemBackgroundColor?: string;
  itemLabelColor?: string;
  selectedItemLabelColor?: string;
  checkColor: string;
  checkSize: number;
  itemLabelStyle?: StyleProp<TextStyle>;
  selectedItemLabelStyle?: StyleProp<TextStyle>;
}) {
  const isActive = useSharedValue(0);
  const [isActiveItem, setIsActiveItem] = useState(false);

  useEffect(() => {
    if (value) {
      setIsActiveItem(item?.value === value?.value);
      isActive.value = withSpring(item?.value === value?.value ? 1 : 0, {
        duration: ANIMATION_DURATION,
      });
    }
  }, [item, value, isActive]);

  const animatedCheckStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      isActive.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {
          scale,
        },
      ],
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      isActive.value,
      [0, 1],
      [itemBackgroundColor, selectedItemBackgroundColor]
    );

    return {
      backgroundColor,
    };
  });

  const animatedActiveLabelColor = useAnimatedStyle(() => {
    const color = interpolateColor(
      isActive.value,
      [0, 1],
      [itemLabelColor, selectedItemLabelColor]
    );

    return {
      color,
    };
  });

  return (
    <>
      <AnimatedPressable
        onPress={onPress}
        style={[styles.dropdownItem, animatedContainerStyle]}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          {picture && (
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={picture}
            />
          )}
          <Animated.Text
            style={[
              styles.itemLabel,
              itemLabelStyle,
              isActiveItem && selectedItemLabelStyle,
              animatedActiveLabelColor,
            ]}
          >
            {item?.label}
          </Animated.Text>
        </View>
        {item.label === value?.label && (
          <Animated.View style={[animatedCheckStyle]}>
            <Check size={checkSize} color={checkColor} />
          </Animated.View>
        )}
      </AnimatedPressable>
    </>
  );
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

export default function Select<T>({
  containerStyle,
  inputContainerStyle,
  labelStyle,
  isRequired = false,
  isError,
  errorMessage,
  label,
  placeholder = "Select option",
  data = [],
  onChange,
  value,
  shouldCloseAfterSelection = false,
  isArrowShown = true,
  itemBackgroundColor,
  selectedItemBackgroundColor,
  itemLabelColor,
  selectedItemLabelColor,
  itemLabelStyle,
  selectedItemLabelStyle,
  checkColor = DEFAULT_CHECK_COLOR,
  checkSize = DEFAULT_CHECK_SIZE,
  arrowColor = DEFAULT_ARROW_COLOR,
  arrowSize = DEFAULT_ARROW_SIZE,
  placeholderStyle,
  arrowContainerStyle,
  customArrowIcon,
  onSelectClosed,
  onSelectOpened,
}: ISelect<T>) {
  const isOpen = useSharedValue(0);
  const dropdownRef = useAnimatedRef<Animated.ScrollView>();

  const animatedArrowStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      isOpen.value,
      [0, 1],
      [0, -180],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {
          rotate: `${rotation}deg`,
        },
      ],
    };
  });

  const animatedDropdownStyle = useAnimatedStyle(() => {
    const measuredDropdownHeight = measure(dropdownRef)?.height;
    if (!measuredDropdownHeight) {
      return {};
    }

    const height = interpolate(
      isOpen.value,
      [0, 1],
      [0, measuredDropdownHeight],
      Extrapolation.CLAMP
    );

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
    } else {
      onSelectOpened && onSelectOpened();
    }

    isOpen.value = withTiming(isOpen.value ? 0 : 1, {
      duration: ANIMATION_DURATION,
    });
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label} {isRequired && <Text style={[styles.star]}>*</Text>}{" "}
        </Text>
      )}
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.inputContainer,
          inputContainerStyle,
          isError && { borderColor: "red" },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          {value?.picture && (
            <Image
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              source={value?.picture}
            />
          )}
          <Text style={[styles.label, placeholderStyle]}>
            {value ? value?.label : placeholder}
          </Text>
        </View>
        {isArrowShown && (
          <View style={[arrowContainerStyle]}>
            <Animated.View style={[animatedArrowStyle]}>
              {customArrowIcon ? (
                customArrowIcon
              ) : (
                <AngleDown size={arrowSize} color={arrowColor} />
              )}
            </Animated.View>
          </View>
        )}
      </TouchableOpacity>
      <Animated.View style={[animatedDropdownStyle]}>
        <AnimatedScrollView style={[styles.dropdown]} ref={dropdownRef}>
          {data?.map((item, index) => (
            <View key={index}>
              <SelectItem
                value={value}
                item={item}
                picture={item?.picture}
                itemBackgroundColor={itemBackgroundColor}
                selectedItemBackgroundColor={selectedItemBackgroundColor}
                itemLabelColor={itemLabelColor}
                selectedItemLabelColor={selectedItemLabelColor}
                itemLabelStyle={itemLabelStyle}
                selectedItemLabelStyle={selectedItemLabelStyle}
                checkColor={checkColor}
                checkSize={checkSize}
                onPress={() => {
                  onChange && onChange(item);
                  if (shouldCloseAfterSelection) {
                    isOpen.value = withTiming(0, {
                      duration: ANIMATION_DURATION,
                    });
                    setTimeout(() => {
                      dropdownRef.current?.scrollTo({ y: 0 });
                    }, 750);
                  }
                }}
              />
              {index < data?.length - 1 && (
                <Divider dividerStyle={{ height: 1 }} />
              )}
            </View>
          ))}
        </AnimatedScrollView>
      </Animated.View>
      {isError && <Text style={[styles.error]}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
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
