import { View, Text, StyleSheet, FlatList, ScrollView ,TouchableOpacity,BackHandler} from 'react-native';
import Toast from 'react-native-toast-message';
import React ,{useState,useEffect}from 'react';
import Header from '../../components/ScreensHeader';
import Selector from '../../components/Selector';
import ExerciseCard from './component/ExerciseCard';
import { Skeleton } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import {ExerciseCardData} from './Data/ExerciseData'
type ExerciseType = 'Cardio' | 'Legs' | 'Back' | 'Chest';
const Exercise = ({navigation}:any) => {
const [selected, setSelected] = useState<ExerciseType>('Cardio')
const [exerciselist,setExerciselist] = useState(ExerciseCardData[selected]||[]);
const [loader,setLoader] = useState(true)

useEffect(() => {
  setLoader(true);


  const timer = setTimeout(() => {
    setExerciselist(ExerciseCardData[selected] || []);
    setLoader(false);
  }, 500);

  
  let backPressedOnce = false;
  
    const backAction = () => {
      if (backPressedOnce) {
        BackHandler.exitApp();
        return true;
      }
  
      backPressedOnce = true;
  
      Toast.show({
        type: 'info',
        text1: 'Are you sure you want to exit',
        position: 'bottom',
        visibilityTime: 1000,
      });
  
      setTimeout(() => {
        backPressedOnce = false;
      }, 1000);
  
      return true;
    };
  
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
   return () => {
    clearTimeout(timer);
    subscription.remove();
  };
}, [selected]);

  const ExerciseData =[
    'Cardio',
    'Legs',
    'Back',
    'Chest'
  ]
 
  const renderItem = ({item,index}:any)=>{
    return(
        <>
    
        <Selector title={item} active={selected===item} onPress={()=>setSelected(item)}/>
  
        </>
    )
  }
  const renderData = ({item,index}:any)=>{
    return(
      <>
      <View style={{paddingVertical:25}}>
        <ExerciseCard id={item.id} title={item.title} kcal={item.kcal} time={item.time} level={item.level} image={item.image} subtitle='' onPress={()=>navigation.navigate('ExerciseDetails',{item})} loader={loader}/>
      </View>
       {index !== ExerciseCardData[selected].length - 1 && (
  <View style={style.line} />
)}
     
      </>
    )
  }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#FFF"}}>
      <ScrollView
      stickyHeaderIndices={[1]}
       contentContainerStyle={{paddingBottom:100}}>
      <Header title='FULL EXERCISE' name='' navigation={navigation} icon={null} />
      
      <View style={style.SelectorView}>
   

    
      <FlatList 
      data={ExerciseData}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
  
      nestedScrollEnabled
      contentContainerStyle={style.list}/>
      
      </View>
      
       <FlatList 
      data={exerciselist}
      renderItem={renderData}
       scrollEnabled ={false}
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
    gap:10,
      backgroundColor:"#FFF",
      borderBottomWidth:0.5,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation:2,
      paddingTop:15,
      borderBottomColor: 'lightgrey'  

  },
  cardlist:{
        paddingHorizontal:16,
        paddingBottom:120,
      
      
  },
  line:{
    height:1,
    width:400,
    backgroundColor:"lightgrey",
  }
})