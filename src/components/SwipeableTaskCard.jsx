import { GestureDetector, usePanGesture } from "react-native-gesture-handler";
import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import TaskCard from "./TaskCard";

export default function SwipeableTaskCard(props) {
    const translateX = useSharedValue(0);
    const startX = useSharedValue(0);

    const pan = usePanGesture({
        onBegin({}) {
            startX.value = translateX.value
            console.log('Pan gesture began');
        },
        onUpdate(options) {
            translateX.value = options.translationX;
        },
        onFinalize() {
            translateX.value = withSpring(0);
        }
    })

    const animationStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        }
    })

    return (
        <GestureDetector gesture={pan}>
            <TaskCard {...props} style={useAnimatedStyle} />
        </GestureDetector>
    );
}