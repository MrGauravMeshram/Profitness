import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, { Circle } from 'react-native-svg';
import { workoutPlan } from './Data/workoutData';

const WorkoutScreen = ({ navigation }: any) => {

    const activeExercise = workoutPlan[2];
    const nextExercise = workoutPlan[3];


    const progress = 70;
    const radius = 52;
    const circumference = 2 * Math.PI * radius;


    const smallRadius = 18;
    const smallCircumference = 2 * Math.PI * smallRadius;
    const smallProgress = 70;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

            <View style={styles.imageWrapper}>
                <Image
                    source={{ uri: activeExercise.image }}
                    style={styles.headerImage}
                    resizeMode="cover"
                />
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()}>
                    <Ionicons name="chevron-back" size={28} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
            >
                <View style={styles.content}>
                    <Text style={styles.exerciseNo}>Exercise 3/12</Text>
                    <Text style={styles.title}>
                        {activeExercise.title.toUpperCase()}
                    </Text>

                    <View style={styles.progressContainer}>
                        <Svg width={130} height={130}>
                            <Circle
                                stroke="#E8E8E8"
                                fill="none"
                                cx="65"
                                cy="65"
                                r={radius}
                                strokeWidth="8"
                            />
                            <Circle
                                stroke="#000000"
                                fill="none"
                                cx="65"
                                cy="65"
                                r={radius}
                                strokeWidth="8"
                                strokeDasharray={`${circumference}`}
                                strokeDashoffset={
                                    circumference - (circumference * progress) / 100
                                }
                                strokeLinecap="round"
                                rotation="-90"
                                origin="65,65"
                            />
                        </Svg>
                        <View style={styles.timeCenter}>
                            <Text style={styles.timer}>00:20</Text>
                        </View>
                    </View>

                    <Text style={styles.totalTime}>10:59</Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.stopBtn}>
                            <Ionicons
                                name="pause"
                                size={20}
                                color="#1F2937"
                            />
                            <Text style={styles.stopText}>Stop</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.nextBtn}>
                            <Ionicons
                                name="walk-outline"
                                size={20}
                                color="#FFF"
                            />
                            <Text style={styles.nextText}>
                                NEXT TRAINING
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.upNext}>Up Next</Text>

                    <View style={styles.card}>
                        <Image
                            source={{ uri: nextExercise.image }}
                            style={styles.cardImage}
                        />

                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle} numberOfLines={2}>
                                {nextExercise.title}
                            </Text>

                            <View style={styles.infoRow}>
                                <Ionicons name="flame-outline" size={14} color="#B7CF1A" />
                                <Text style={styles.infoText}>
                                    {nextExercise.kcal}
                                </Text>

                                <View style={styles.dot} />

                                <Ionicons name="time-outline" size={14} color="#6B7280" />
                                <Text style={styles.infoText}>
                                    {nextExercise.time}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.smallTimer}>
                            <Svg width={46} height={46}>
                                <Circle
                                    stroke="#E8E8E8"
                                    fill="none"
                                    cx="23"
                                    cy="23"
                                    r={smallRadius}
                                    strokeWidth="3"
                                />
                                <Circle
                                    stroke="#000000"
                                    fill="none"
                                    cx="23"
                                    cy="23"
                                    r={smallRadius}
                                    strokeWidth="3"
                                    strokeDasharray={`${smallCircumference}`}
                                    strokeDashoffset={
                                        smallCircumference - (smallCircumference * smallProgress) / 100
                                    }
                                    strokeLinecap="round"

                                />
                            </Svg>
                            <View style={styles.smallTimeCenter}>
                                <Text style={styles.smallTimerText}>00:15</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    imageWrapper: {
        width: '100%',
        height: 440,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        overflow: 'hidden',
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    backBtn: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    content: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    exerciseNo: {
        fontSize: 12,
        color: '#9CA3AF',
        fontFamily: 'DMSans_18pt-Medium',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 32,
        fontFamily: 'BebasNeue-Regular',
        color: '#111827',
        marginTop: 6,
        lineHeight: 34,
        letterSpacing: 0.5,
    },
    progressContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        height: 130,
    },
    timeCenter: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timer: {
        fontSize: 24,
        fontFamily: 'DMSans_18pt-Bold',
        color: '#111827',
    },
    totalTime: {
        textAlign: 'center',
        marginTop: 16,
        fontSize: 20,
        fontFamily: 'DMSans_18pt-Bold',
        color: '#111827',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        gap: 12,
    },
    stopBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingVertical: 14,
        borderRadius: 12,
    },
    stopText: {
        marginLeft: 8,
        fontFamily: 'DMSans_18pt-Bold',
        fontSize: 16,
        color: '#1F2937',
    },
    nextBtn: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B7CF1A',
        paddingVertical: 14,
        borderRadius: 12,
    },
    nextText: {
        color: '#FFF',
        marginLeft: 8,
        fontFamily: 'DMSans_18pt-Bold',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    upNext: {
        marginTop: 28,
        fontSize: 18,
        fontFamily: 'DMSans_18pt-Bold',
        color: '#111827',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        padding: 10,
    },
    cardImage: {
        width: 64,
        height: 64,
        borderRadius: 12,
    },
    cardContent: {
        flex: 1,
        marginLeft: 14,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 14,
        fontFamily: 'DMSans_18pt-Bold',
        color: '#111111',
        lineHeight: 18,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    infoText: {
        fontSize: 12,
        fontFamily: 'DMSans_18pt-Regular',
        color: '#6B7280',
        marginLeft: 4,
    },
    dot: {
        width: 1,
        height: 12,
        backgroundColor: '#D1D5DB',
        marginHorizontal: 8,
    },
    smallTimer: {
        width: 46,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    smallTimeCenter: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallTimerText: {
        fontSize: 8,
        fontFamily: 'DMSans_18pt-Bold',
        color: '#111111',
    },
});