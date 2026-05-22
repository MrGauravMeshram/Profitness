import { View, Text, ScrollView ,ImageBackground,StyleSheet,FlatList,TouchableOpacity} from 'react-native'
import Header from '../../components/ScreensHeader'
import React ,{useState,useEffect}from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import WeekCard from './component/WeekCard';
import { WeekData } from '../../Data/WeekData';
import TimePickerButton from './component/TimeComponent';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import ToggleButton from '../../components/ToggleButton';
import AuthButton from '../Auth/component/AuthButton';

const ScheduleExerciseScreen = ({navigation}:any) => {
    const [isPickerVisible, setPickerVisible] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
const [time, setTime] = useState('05:44 AM')
const showPicker = () => {
  setPickerVisible(true)
}

const hidePicker = () => {
  setPickerVisible(false)
}

const handleConfirm = (selectedTime:any) => {

  const formattedTime = selectedTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  setTime(formattedTime)
  hidePicker()
}
    const renderWeekData = ({item,index}:any)=>{
        return(
            <TouchableOpacity onPress={()=>setSelectedIndex(index)}>
                <WeekCard days={item.day} date={item.date} active={selectedIndex===index}/>
            </TouchableOpacity>   
        )
    }
  return (
    <View style={{flex:1}}>
      
      <ScrollView>
         <View style={Styles.imageContainer}>
        <ImageBackground source={require('../../assets/Images/suryashan.png')}
        style={Styles.image}>
           <View style={Styles.innerbox}>
            <View style={Styles.Top}>
            <Text style={{fontFamily:"BebasNeue-Regular",fontSize:24}}>SCHEDULE EXERCISE</Text>
         <MaterialCommunityIcons
         name='close'
         size={24}
         color='black'
         />
         </View>
         <View style={{marginTop:12,flexDirection:"row",justifyContent:"space-between"}}>
            <View style={{flexDirection:"row",alignItems:"center",gap:5}}>
                <MaterialIcons name='calendar-month'
                size={16}
                color='black'/>
            <Text style={Styles.dateText}>Date</Text>
            </View>
            <View style={Styles.dateContainer}>
                <MaterialIcons
                name='keyboard-arrow-left'
                size={24}
                color='black'/>
                <View style={{alignItems:"center"}}>
               <Text style={Styles.dateText}>February</Text>
               <Text style={Styles.year}>2026</Text>
               </View>
               <MaterialIcons
               name='keyboard-arrow-right'
               size={24}
               color='black'/>
            </View>
         </View>
           </View>
        </ImageBackground>
         </View>

         <FlatList 
         data={WeekData}
         renderItem={renderWeekData}
         keyExtractor={(item)=>item.id.toString()}
         horizontal
         nestedScrollEnabled
         contentContainerStyle={Styles.Week}/>
     <View style={Styles.TimeSection}>
        
        <View style={{flexDirection:"row",gap:5,alignItems:"center"}}>
 <Feather name="clock" color="#000" size={24} />
 <Text style={Styles.ClockText}>Time</Text>
        </View>
        <TimePickerButton
value={time}
onPress={showPicker}
/>

     </View>
 <View style={Styles.flexs}>
      <Feather name="bell" color="#000" size={24} />
      <Text style={Styles.ReminderText}>Set Reminder</Text>
 </View>
 <View style={{paddingHorizontal:16,paddingVertical:10,paddingLeft:45,flexDirection:"row",justifyContent:"space-between"}}>
    <Text>Reminder On</Text>
    <ToggleButton/>
 </View>
      </ScrollView>
      <DateTimePickerModal
isVisible={isPickerVisible}
mode="time"
onConfirm={handleConfirm}
onCancel={hidePicker}
/>
<View style={Styles.btn}>
<AuthButton title='Done'/>
</View>
    </View>
  )
}

export default ScheduleExerciseScreen

const Styles = StyleSheet.create({
    imageContainer:{
        height:380,
        width:"100%"
    },
    image:{
        height:"100%",
        width:"100%"
    },
    innerbox:{
        height:150,
        width:400,
        position:"absolute",
        alignSelf:"center",
        backgroundColor:"white",
        bottom:-50,
        paddingHorizontal:16,
        borderRadius:30
    },
    Top:{
        flexDirection:"row",
        justifyContent:"space-between",
    
        paddingVertical:21,
    },
    dateContainer:{
        flexDirection:"row",
        gap:20
    },
    dateText:{
        fontFamily:'Montserrat-SemiBold',
        fontSize:16
    },
    year:{
        fontFamily:"Montserrat-Medium",
        fontSize:12
    },
    Week:{
        gap:10,
        paddingHorizontal:16,
        paddingVertical:35,
        marginTop:50,
    },
    TimeSection:{
        paddingHorizontal:16,
        justifyContent:"space-between",
        flexDirection:"row",

    },
    ClockText:{
        fontFamily:"Montserrat-SemiBold",
        fontSize:14 
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
 wkbtn: {
    width: 120,
    height: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    borderRadius: 10,
  },
  btn:{
   paddingHorizontal:10,
   marginVertical:16, 
  }
})