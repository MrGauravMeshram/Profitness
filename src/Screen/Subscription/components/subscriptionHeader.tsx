import { View, Text,Image,StyleSheet} from 'react-native';
import React from 'react';

const Subscription = () => {
  return (
    <View style={style.ImageView}>
   <Image source={require('../../../assets/Images/runs.jpg')}
   style={{height:"100%",width:"100%",borderBottomLeftRadius:50,borderBottomRightRadius:50}}
   resizeMode='cover'/>
    </View>
  );
};

const style = StyleSheet.create({
  ImageView:{
    height:343,
    width:"100%",
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
  }
})

export default Subscription;
