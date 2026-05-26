import { View, Text,FlatList,StyleSheet } from 'react-native'
import Header from '../../components/ScreensHeader';
import {settingsData} from './Data/Data';
import ToggleButton from '../../components/ToggleButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthButton from '../Auth/component/AuthButton';
import React from 'react'

const AppSettingsScreen = ({navigation}:any) => {
    const renderData = ({item}:any) => {
        return(
            <>
            <View style={Styles.listItem}>
                <View style={{flexDirection:"row",gap:16,alignItems:"center",padding:16,paddingHorizontal:0}}>
                    <Ionicons name={item.icon} size={24} color="#111"/>
                <Text style={Styles.listText}>{item.title}</Text>
                </View>
                <View style={{paddingHorizontal:8}}>
                {item.type==="toggle" && <ToggleButton/>}
                {item.type==="value" && <Text style={{color:"#696969"}}>{item.value}</Text>}
                </View>
            </View>
            <View style={Styles.listItemSeparator}/>
           
            </>
        )
    }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
      <Header title="App Settings" navigation={navigation}/>
    <FlatList
    data={settingsData}
    renderItem={renderData}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={{paddingVertical:16,paddingHorizontal:16}}
    />
    <View style={Styles.btn}>
     <AuthButton title="UPGRADE PREMIUM"/>
     </View>
    </SafeAreaView>
  )
}

export default AppSettingsScreen;

const Styles = StyleSheet.create({
    listText:{
        fontSize:16,
        fontFamily:"Montserrat-Medium",
    },
    listItemSeparator:{
        height:1,
        backgroundColor:"#ccc",
        marginVertical:8,
        alignSelf:"center",
        width:"90%",
    },
    listItem:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    btn:
    {width:"90%",alignSelf:"center",marginTop:32,bottom:25,position:"absolute"}
})