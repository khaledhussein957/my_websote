import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  runOnUI,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { useThemeColors } from "@/constants/colors";

const SWIPE_THRESHOLD = 100;

export type AlertMessageHandles = {
  show: (message: string, type: "success" | "error") => void;
  hide: () => void;
};

type AlertMessageProps = {
  onHide?: () => void;
};

const AlertMessage = forwardRef<AlertMessageHandles, AlertMessageProps>(
({ onHide }, ref) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<"success" | "error">("success");

  const translateY = useSharedValue(-80);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const colors = useThemeColors();
  const backgroundColor = type === "success" ? colors.success : colors.error;
  const textColor = colors.background;

  // ------------------------------
  // INTERNAL HIDE FUNCTION
  // ------------------------------
  const hideAlert = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    runOnUI(() => {
      "worklet";
      translateY.value = withTiming(-80, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 }, () => {
        translateX.value = 0; // reset
        runOnJS(setMessage)(null);
      });
    })();
  };

  // ------------------------------
  // PUBLIC METHODS (show / hide)
  // ------------------------------
  useImperativeHandle(ref, () => ({
    show: (msg, alertType) => {
      setMessage(msg);
      setType(alertType);

      // avoid writing shared values during render → wrap in runOnUI
      runOnUI(() => {
        "worklet";
        translateX.value = 0;
        translateY.value = withTiming(0, { duration: 400 });
        opacity.value = withTiming(1, { duration: 400 });
      })();

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => hideAlert(), 5000);
    },

    hide: () => hideAlert(),
  }));

  // ------------------------------
  // GESTURE HANDLER
  // ------------------------------
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        // swipe away completely
        runOnUI(() => {
          "worklet";
          translateX.value = withTiming(
            translateX.value > 0 ? 500 : -500,
            { duration: 200 },
            () => {
              runOnJS(hideAlert)();
              if (onHide) runOnJS(onHide)();
            }
          );
        })();
      } else {
        translateX.value = withTiming(0, { duration: 200 });
      }
    });

  // ------------------------------
  // ANIMATED STYLE
  // ------------------------------
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
    ],
    opacity: opacity.value,
  }));

  if (!message) return null;

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          animatedStyle,
          {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor,
            borderRadius: 5,
            padding: 10,
            position: "absolute",
            top: 10,
            left: 20,
            right: 20,
            zIndex: 9999,
          },
        ]}
      >
        <Text style={{ color: textColor, fontWeight: "bold" }}>
          {message}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
});

export default AlertMessage;
