import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
    useDerivedValue,
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    withDelay,
    withSpring,
    Easing,
    interpolate
} from 'react-native-reanimated';

const FAB = () => {
    const firstValue = useSharedValue(30);
    const secondValue = useSharedValue(30);
    const thirdValue = useSharedValue(30);
    const isOpen = useSharedValue(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const Progress = useDerivedValue(() => {
        return withTiming(isOpen.value ? 1 : 0);
    });

    const handlePress = () => {
        const config = {
            ease: Easing.bezier(0.25, 1, 0.5, 1),
            duration: 300
        }
        if (isOpen.value) {
            firstValue.value = withTiming(30, config)
            secondValue.value = withTiming(30, config)
            thirdValue.value = withTiming(30, config)
        } else {
            firstValue.value = withDelay(200, withTiming(100, config))
            secondValue.value = withDelay(150, withTiming(170, config))
            thirdValue.value = withDelay(75, withTiming(240, config))
        }
        isOpen.value = !isOpen.value;
        setMenuOpen(isOpen.value);
    }

    const IconStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${Progress.value * 45}deg` }]
        }
    })

    const firstIcon = useAnimatedStyle(() => {
        const scale = interpolate(
            firstValue.value,
            [30, 100],
            [0, 1],
            'clamp'
        )
        const opacity = interpolate(
            firstValue.value,
            [30, 50],
            [0, 1],
            'clamp'
        )
        return {
            bottom: firstValue.value,
            opacity: opacity,
            transform: [{ scale: scale }]
        }
    })

    const secondIcon = useAnimatedStyle(() => {
        const scale = interpolate(
            secondValue.value,
            [30, 170],
            [0, 1],
            'clamp'
        )
        const opacity = interpolate(
            secondValue.value,
            [30, 50],
            [0, 1],
            'clamp'
        )
        return {
            bottom: secondValue.value,
            opacity: opacity,
            transform: [{ scale: scale }]
        }
    })

    const thirdIcon = useAnimatedStyle(() => {
        const scale = interpolate(
            thirdValue.value,
            [30, 240],
            [0, 1],
            'clamp'
        )
        const opacity = interpolate(
            thirdValue.value,
            [30, 50],
            [0, 1],
            'clamp'
        )
        return {
            bottom: thirdValue.value,
            opacity: opacity,
            transform: [{ scale: scale }]
        }
    })

    return (
        <View pointerEvents="box-none">
            <View pointerEvents={menuOpen ? 'auto' : 'none'}>
                <TouchableOpacity>
                    <Animated.View style={[styles.floatingButton, thirdIcon]}>
                        <MaterialCommunityIcons name="hand-clap" color="#FFF" size={24} />
                    </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Animated.View style={[styles.floatingButton, secondIcon]}>
                        <MaterialCommunityIcons name="android-messages" color="#FFF" size={24} />
                    </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Animated.View style={[styles.floatingButton, firstIcon]}>
                        <AntDesign name="addfile" color="#FFF" size={24} />
                    </Animated.View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handlePress} activeOpacity={1}>
                <Animated.View style={[styles.floatingButton, { bottom: 30 }, IconStyle]}>
                    <Ionicons name="add" color="#FFF" size={24} />
                </Animated.View>
            </TouchableOpacity>
        </View>
    )
}

export default FAB

const styles = StyleSheet.create({
    floatingButton: {
        width: 58,
        height: 58,
        borderRadius: 30,
        backgroundColor: '#3b3d40',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 20,
        elevation: 5,
    },
})