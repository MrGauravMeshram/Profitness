import { View, Text,StyleSheet ,FlatList,TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../components/ScreensHeader';
import { Navigation } from 'lucide-react-native';
import { WeekData } from '../../Data/WeekData';
import {Food} from './Data/Data'
import PopularExercise from '../Home/components/PopularExercise'
import { FoodData } from './Data/FoodData';
import Selector from '../../components/Selector';
import WeekCard from '../Exercise/component/WeekCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const MealPlanScreen = ({navigation}:any) => {
const [selected,setSelected] = useState(0)
const [isChoose,setChoose] = useState(0)
  const renderWeekData = ({item,index}:any)=>(
    <TouchableOpacity onPress={()=>setSelected(index)}>
      <WeekCard days={item.day} date={item.date} active={selected===index}/>
    </TouchableOpacity>
  )
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
      <View style={{paddingBottom:15}}>
      <Header title='MEAL PLAN' name='funnel' onFilterPress={()=>{}} navigation={navigation}
        icon={null}/>
        </View>
        <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom:120
        }}>
         <View style={Styles.dateContainer}>
                <MaterialIcons
                name='keyboard-arrow-left'
                size={28}
                color='black'/>
                <View style={{alignItems:"center"}}>
               <Text style={Styles.dateText}>February</Text>
               <Text style={Styles.year}>2026</Text>
               </View>
               <MaterialIcons
               name='keyboard-arrow-right'
               size={28}
               color='black'/>
            </View>
            <View>
            <FlatList 
            data={WeekData}
            renderItem={renderWeekData}
            keyExtractor={(item)=>item.id.toString()}
            horizontal
            nestedScrollEnabled
            contentContainerStyle={Styles.week}/>
            </View>
            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:25,gap:15}}>
        {(Food || []).map((title, idx)=>(
  <Selector
    key={idx}
    title={title}
    active={isChoose===idx}
    onPress={()=>setChoose(idx)}
  />
))}
         
         </View>
         <View style={Styles.mealText}>
          <Text style={Styles.text}>15 meals</Text>
         </View>
         <View>
  <PopularExercise
data={FoodData.map(item => ({
id: item.id.toString(),
image: item.image,
title: item.title,
level: item.kcal,
duration: item.time,
heading:'',


}))}
onPressItem={()=>navigation.navigate('MealDetails')}
/>
         </View>
         </ScrollView>
   </SafeAreaView>
      
  );
};

export default MealPlanScreen;
const Styles = StyleSheet.create({
    dateContainer:{
        flexDirection:"row",
        gap:10,
        paddingHorizontal:16,
        marginTop:20,
    },
    dateText:{
        fontFamily:'Montserrat-SemiBold',
        fontSize:16
    },
     year:{
        fontFamily:"Montserrat-Medium",
        fontSize:12
    },
    week:{
      gap:10,
      paddingHorizontal:16,
      marginTop:25
    },
    mealText:{
      paddingHorizontal:16,
      marginBottom:-20,
      marginTop:10,

    },
    text:{
      fontFamily:"Montserrat-Bold",
      fontSize:18,
    }
})