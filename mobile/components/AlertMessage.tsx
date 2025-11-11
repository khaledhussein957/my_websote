import React, {
  useEffect,
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
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { useThemeColor } from "@/hooks/use-theme-color";

const SWIPE_THRESHOLD = 100;

export type AlertMessageHandles = {
  show: (message: string, type: "success" | "error") => void;
  hide: () => void;
};

const AlertMessage = forwardRef<AlertMessageHandles>((_, ref) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<"success" | "error">("success");

  const translateY = useSharedValue(-50);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const bgColorSuccess = "#4BB543"; // green success
  const bgColorError = "#E74C3C"; // red error
  const textColor = useThemeColor({}, "background");

  useImperativeHandle(ref, () => ({
    show: (msg, alertType) => {
      setMessage(msg);
      setType(alertType);

      // Reset translateX on show
      translateX.value = 0;

      // Animate in
      translateY.value = withTiming(0, { duration: 400 });
      opacity.value = withTiming(1, { duration: 400 });

      // Clear existing timer if any
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Hide after 5 seconds
      timeoutRef.current = setTimeout(() => {
        hideAlert();
      }, 5000);
    },

    hide: () => {
      hideAlert();
    },
  }));

  const hideAlert = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    translateY.value = withTiming(-50, { duration: 400 });
    opacity.value = withTiming(0, { duration: 400 }, () => {
      runOnJS(() => {
        setMessage(null);
      })();
    });
  };

  // Gesture handler
  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    translateX.value = event.translationX;
  };

  // When gesture ends, check if swipe past threshold to dismiss
  const onGestureEnd = () => {
    if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
      // Swipe far enough — dismiss
      translateX.value = withTiming(
        translateX.value > 0 ? 500 : -500,
        { duration: 200 },
        () => {
          runOnJS(hideAlert)();
        }
      );
    } else {
      // Return to center
      translateX.value = withTiming(0, { duration: 200 });
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
    ],
    opacity: opacity.value,
  }));

  if (!message) return null;

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} onEnded={onGestureEnd}>
      <Animated.View
        style={[
          animatedStyle,
          {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: type === "success" ? bgColorSuccess : bgColorError,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            position: "absolute",
            top: 10,
            left: 20,
            right: 20,
            zIndex: 9999,
          },
        ]}
      >
        <Text style={{ color: textColor, fontWeight: "bold" }}>{message}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
});

export default AlertMessage;
