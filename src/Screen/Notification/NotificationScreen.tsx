import { View, Text ,FlatList,Image,StyleSheet} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/ScreensHeader';
import {NotificationData} from './Data/NotificationData';

const NotificationScreen = ({navigation}:any) => {
    const renderData = ({item}:any) => {
        return(
            <View style={{margin:16,flexDirection:"row",gap:16,alignItems:"center"}}>
                <View style={styles.ImageView}>
        <Image source={require("../../assets/png/gym.png")} style={{height:40,width:40}}/>
                </View>
                <View style={{gap:3}}>
                    <Text style={styles.TextWidth}>{item.title}</Text>
                
                  <Text>{item.subtitle}</Text>
                        <Text style={styles.time}>{item.time}</Text>
                      
                </View>
            </View>
        )
    }

  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
        <Header title="Notification" navigation={navigation}/>
        <View>
           <FlatList
           data={NotificationData}
           renderItem={renderData}
           contentContainerStyle={{paddingVertical:16}}/>
        </View>
    </SafeAreaView>
  )
}

export default NotificationScreen
const styles = StyleSheet.create({
    ImageView:{
        height:70,
        backgroundColor:"#cad68aa3",
        width:70,
        alignItems:"center",
        justifyContent:"center",
      
        borderRadius:50,
       
    },
    TextWidth:{
         width:270,
         fontFamily:"Montserrat-Medium",
         fontSize:16,
         color:"#111"
    },
    time:{
    color:"#696969",
    fontFamily:"Montserrat-Regular",
    fontSize:14
    }
})