import { View, Text ,FlatList,Image,StyleSheet,TouchableOpacity} from 'react-native'
import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/ScreensHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import {NotificationData} from './Data/NotificationData';

const NotificationScreen = ({navigation}:any) => {
    const [notifications, setNotifications] = useState(NotificationData);
    const handleDelete = (id) => {
  setNotifications(prev =>
    prev.filter(item => item.id !== id),
  );
};


const RightAction = ({id}) => {
  return (
    <TouchableOpacity
      onPress={() => handleDelete(id)}
      style={{
        width: 90,
        backgroundColor: '#FF3B30',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        borderRadius: 12,
      }}>
      <MaterialIcons
        name="delete"
        size={28}
        color="#FFF"
      />
      <Text style={{color: '#FFF'}}>Delete</Text>
    </TouchableOpacity>
  );
};
    const renderData = ({item}: any) => {
  return (
  <Swipeable
  renderRightActions={() => <RightAction id={item.id} />}
  rightThreshold={120}
 
>
      
     <View
  style={{
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  }}>
        
        <View style={styles.ImageView}>
          <Image
            source={require('../../assets/png/gym.png')}
            style={{height: 40, width: 40}}
          />
        </View>

        <View style={{gap: 3}}>
          <Text style={styles.TextWidth}>{item.title}</Text>
          <Text>{item.subtitle}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>

      </View>

    </Swipeable>
  );
};

  return (
    <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
        <Header title="Notification" navigation={navigation}/>
        <View>
           <FlatList
           data={notifications}
             keyExtractor={(item) => item.id.toString()}
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