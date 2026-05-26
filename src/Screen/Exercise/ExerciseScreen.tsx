import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import React from 'react';
import Header from '../../components/ScreensHeader';
import Selector from '../../components/Selector';
import ExerciseCard from './component/ExerciseCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import {ExerciseCardData} from './Data/ExerciseData'
const Exercise = ({navigation}:any) => {
  const ExerciseData =[
    'Cardio',
    'Legs',
    'Back',
    'Chest'
  ]
  const renderItem = ({item}:any)=>{
    return(
        <>
        <Selector title={item}/>
        </>
    )
  }
  const renderData = ({item,index}:any)=>{
    return(
      <>
      <View style={{paddingVertical:25}}>
        <ExerciseCard title={item.title} kcal={item.kcal} time={item.time} level={item.level} image={item.image} subtitle='' onPress={()=>navigation.navigate('ExerciseDetails')}/>
      </View>
       {index !== ExerciseCardData.length - 1 && (
        <View style={style.line} />
      )}
     
      </>
    )
  }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#FFF"}}>
      <Header title='FULL EXERCISE' name='' navigation={navigation} icon={null} />
      
      <View style={style.SelectorView}>
   

    
      <FlatList 
      data={ExerciseData}
      renderItem={renderItem}
      horizontal
      scrollEnabled={false}
      nestedScrollEnabled
      contentContainerStyle={style.list}/>
      
      </View>
      <ScrollView>
      <FlatList 
      data={ExerciseCardData}
      renderItem={renderData}
      scrollEnabled={false}
      nestedScrollEnabled
      keyExtractor={(item)=>item.id.toString()}
      contentContainerStyle={style.cardlist}

      />
 </ScrollView>
   
    </SafeAreaView>
  );
};

export default Exercise;

const style = StyleSheet.create({
  SelectorView:{
    flexDirection:"row",
    alignSelf:"center",
    gap:10,
    marginTop:25,
    paddingHorizontal:16
  },
  list:{
    gap:10
    
  },
  cardlist:{
        paddingHorizontal:16,
        paddingBottom:120
      
  },
  line:{
    height:1,
    width:400,
    backgroundColor:"grey",
  }
})