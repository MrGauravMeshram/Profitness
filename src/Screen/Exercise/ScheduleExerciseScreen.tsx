import { View, Text, ScrollView, ImageBackground, StyleSheet, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import WeekCard from './component/WeekCard';
import TimePickerButton from './component/TimeComponent';
import Arrow from '../../components/ArrowComponent';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import ToggleButton from '../../components/ToggleButton';
import AuthButton from '../Auth/component/AuthButton';
import notifee, { AuthorizationStatus, TriggerType, AndroidNotificationSetting, AndroidImportance, AndroidCategory } from '@notifee/react-native';
import Toast from 'react-native-toast-message';

const getWeekDates = () => {
    const week = [];
    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sun, 1 is Mon, etc.

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        const diff = i - currentDay;
        date.setDate(today.getDate() + diff);
        week.push({
            id: i + 1,
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            date: date.getDate().toString(),
            fullDate: date,
        });
    }
    return week;
};

const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strHours = hours < 10 ? '0' + hours : hours;
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${strHours}:${strMinutes} ${ampm}`;
};
const ScheduleExerciseScreen = ({ navigation }: any) => {
    const weekDates = React.useMemo(() => getWeekDates(), []);
    const [isPickerVisible, setPickerVisible] = useState(false)
    const [reminderEnabled, setReminderEnabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(new Date().getDay())
    const [time, setTime] = useState(new Date())

    const selectedWeekDate = weekDates[selectedIndex].fullDate;
    const selectedMonth = selectedWeekDate.toLocaleDateString('en-US', { month: 'long' });
    const selectedYear = selectedWeekDate.getFullYear().toString();
    useEffect(() => {
        requestPermission();
    }, []);
    const showPicker = () => {
        setPickerVisible(true)
    }

    const hidePicker = () => {
        setPickerVisible(false)
    }
    async function requestPermission() {
        try {
            const settings = await notifee.requestPermission();

            if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
                console.log('Permission granted');
            }


            const notificationSettings = await notifee.getNotificationSettings();
            if (notificationSettings.android.alarm === AndroidNotificationSetting.DISABLED) {
                await notifee.openAlarmPermissionSettings();
            }
        } catch (error) {
            console.error('Error requesting permissions:', error);
        }
    }

    const handleConfirm = (selectedTime: Date) => {
        setTime(selectedTime)
        hidePicker()
    }
    const renderWeekData = ({ item, index }: any) => {
        return (
            <Pressable onPress={() => setSelectedIndex(index)}>
                <WeekCard days={item.day} date={item.date} active={selectedIndex === index} />
            </Pressable>
        )
    }
    const scheduleReminder = async () => {
        try {
            if (!reminderEnabled) {
                await notifee.cancelNotification('workout_reminder');
                Toast.show({
                    type: 'info',
                    text1: 'Reminder canceled',
                });
                navigation.goBack();
                return;
            }

            const triggerDate = new Date(selectedWeekDate);
            triggerDate.setHours(time.getHours());
            triggerDate.setMinutes(time.getMinutes());
            triggerDate.setSeconds(0);
            triggerDate.setMilliseconds(0);

            console.log('Scheduling reminder for:', triggerDate.toString(), 'Current time:', new Date().toString());

            if (triggerDate.getTime() <= Date.now()) {
                triggerDate.setDate(triggerDate.getDate() + 7);
            }


            const settings = await notifee.getNotificationSettings();
            if (settings.android.alarm === AndroidNotificationSetting.DISABLED) {
                Toast.show({
                    type: 'info',
                    text1: 'Permission Required',
                    text2: 'Please enable Alarms & Reminders permission.',
                });
                await notifee.openAlarmPermissionSettings();
                return;
            }

            await notifee.createTriggerNotification(
                {
                    id: 'workout_reminder',
                    title: 'Workout Time ',
                    body: 'Time to start your exercise!',
                    android: {
                        channelId: 'exercise',
                        importance: AndroidImportance.HIGH,
                        sound: 'default',
                        category: AndroidCategory.ALARM,
                        pressAction: {
                            id: 'default',
                        },
                    },
                },
                {
                    type: TriggerType.TIMESTAMP,
                    timestamp: triggerDate.getTime(),
                    alarmManager: {
                        allowWhileIdle: true,
                    },
                },
            );

            Toast.show({
                type: 'success',
                text1: 'Reminder set successfully!',
                text2: `Scheduled for ${formatTime(time)}`,
            });

            setTimeout(() => {
                navigation.goBack();
            }, 1000);
        } catch (error) {
            console.error('Failed to schedule reminder:', error);
            Toast.show({
                type: 'error',
                text1: 'Failed to set reminder',
                text2: 'An error occurred while scheduling.',
            });
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>

            <ScrollView>
                <View style={Styles.imageContainer}>
                    <View style={{ position: "absolute", top: 50, left: 20, zIndex: 1 }}>
                        <Arrow />
                    </View>
                    <ImageBackground source={require('../../assets/Images/suryashan.png')}
                        style={Styles.image}>
                        <View style={Styles.innerbox}>
                            <View style={Styles.Top}>
                                <Text style={{ fontFamily: "BebasNeue-Regular", fontSize: 24 }}>SCHEDULE EXERCISE</Text>
                                <MaterialCommunityIcons
                                    name='close'
                                    size={24}
                                    color='black'
                                />
                            </View>
                            <View style={{ marginTop: 12, flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                    <MaterialIcons name='calendar-month'
                                        size={16}
                                        color='black' />
                                    <Text style={Styles.dateText}>Date</Text>
                                </View>
                                <View style={Styles.dateContainer}>
                                    <MaterialIcons
                                        name='keyboard-arrow-left'
                                        size={24}
                                        color='black' />
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={Styles.dateText}>{selectedMonth}</Text>
                                        <Text style={Styles.year}>{selectedYear}</Text>
                                    </View>
                                    <MaterialIcons
                                        name='keyboard-arrow-right'
                                        size={24}
                                        color='black' />
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                <FlatList
                    data={weekDates}
                    renderItem={renderWeekData}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled
                    contentContainerStyle={Styles.Week} />
                <View style={Styles.TimeSection}>

                    <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                        <Feather name="clock" color="#000" size={24} />
                        <Text style={Styles.ClockText}>Time</Text>
                    </View>
                    <TimePickerButton
                        value={formatTime(time)}
                        onPress={showPicker}
                    />

                </View>
                <View style={Styles.flexs}>
                    <Feather name="bell" color="#000" size={24} />
                    <Text style={Styles.ReminderText}>Set Reminder</Text>
                </View>
                <View style={{ paddingHorizontal: 16, paddingVertical: 10, paddingLeft: 45, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text>Reminder On</Text>
                    <ToggleButton value={reminderEnabled}
                        onValueChange={setReminderEnabled} />
                </View>
            </ScrollView>
            <DateTimePickerModal
                isVisible={isPickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hidePicker}
            />
            <View style={Styles.btn}>
                <AuthButton title='Done' onPress={scheduleReminder} />
            </View>
        </View>
    )
}

export default ScheduleExerciseScreen

const Styles = StyleSheet.create({
    imageContainer: {
        height: 380,
        width: "100%"
    },
    image: {
        height: "100%",
        width: "100%"
    },
    innerbox: {
        height: 150,
        width: 400,
        position: "absolute",
        alignSelf: "center",
        backgroundColor: "white",
        bottom: -50,
        paddingHorizontal: 16,
        borderRadius: 30
    },
    Top: {
        flexDirection: "row",
        justifyContent: "space-between",

        paddingVertical: 21,
    },
    dateContainer: {
        flexDirection: "row",
        gap: 20
    },
    dateText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16
    },
    year: {
        fontFamily: "Montserrat-Medium",
        fontSize: 12
    },
    Week: {
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 35,
        marginTop: 50,
    },
    TimeSection: {
        paddingHorizontal: 16,
        justifyContent: "space-between",
        flexDirection: "row",

    },
    ClockText: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 14
    },
    flexs: {
        flexDirection: "row",
        paddingHorizontal: 16,
        marginTop: 32,
        gap: 5
    },
    ReminderText: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 16
    },
    wkbtn: {
        width: 120,
        height: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        borderRadius: 10,
    },
    btn: {
        paddingHorizontal: 10,
        marginVertical: 16,
    }
})