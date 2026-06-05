import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Feather from 'react-native-vector-icons/Feather';

import Header from '../../components/ScreensHeader';
import DateSelector from './components/Date';
import WeekCard from '../Exercise/component/WeekCard';
import TimeComponent from '../Exercise/component/TimeComponent';
import {WeekData} from '../../Data/WeekData';
import ToggleButton from '../../components/ToggleButton';
import AuthButton from '../Auth/component/AuthButton';

const ReminderScreen = ({navigation}: any) => {
  const [selected, setSelected] = useState(WeekData[0]?.id);
const [selectedDate, setSelectedDate] = useState<Date>(new Date());
const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const renderWeekData = ({item}: any) => {
    return (
      <Pressable
        onPress={() => setSelected(item.id)}>
        <WeekCard
          days={item.day}
          date={item.date}
          active={selected === item.id}
        />
      </Pressable>
    );
  };

  const handleConfirmDate = (date: Date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const handleConfirmTime = (time: Date) => {
    setSelectedTime(time);
    setShowTimePicker(false);
  };

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const formattedTime = selectedTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Header title="Reminder" navigation={navigation} />

      <View style={{paddingHorizontal: 16, marginTop: 16}}>
        <DateSelector
        />
      </View>

      <View style={{height: 170}}>
        <FlatList
          data={WeekData}
          renderItem={renderWeekData}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 12,
            marginTop: 16,
          }}
        />
      </View>

      <View style={styles.wrapper}>
        <View style={styles.left}>
          <Feather name="clock" size={22} color="#111" />
          <Text style={styles.label}>Time</Text>
        </View>

        <TimeComponent
          value={formattedTime}
          onPress={() => setShowTimePicker(true)}
        />
      </View>

      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        date={selectedDate}
        onConfirm={handleConfirmDate}
        onCancel={() => setShowDatePicker(false)}
      />

      <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        date={selectedTime}
        onConfirm={handleConfirmTime}
        onCancel={() => setShowTimePicker(false)}
      />
      <View>
          </View>
 <View style={styles.flexs}>
      <Feather name="bell" color="#000" size={24} />
      <Text style={styles.ReminderText}>Set Reminder</Text>
 </View>
 <View style={{paddingHorizontal:16,paddingVertical:10,paddingLeft:45,flexDirection:"row",justifyContent:"space-between"}}>
    <Text>Reminder On</Text>
    <ToggleButton/>
 </View>
 <View style={styles.btn}>
    <AuthButton title="Create"/>
 </View>

    </SafeAreaView>
  );
};

export default ReminderScreen;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  label: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#111',
  },
  flexs:{
 flexDirection:"row",
 paddingHorizontal:16,
 marginTop:32,
 gap:5
 },
 ReminderText:{
    fontFamily:"Montserrat-SemiBold",
    fontSize:16
 },
 btn:
    {width:"90%",alignSelf:"center",marginTop:32,bottom:25,position:"absolute"}
 
});