import React ,{useState,useEffect}from 'react'
import StackNavigator from './src/Navigation/StackNavigator'
import 'react-native-gesture-handler';
import {View} from 'react-native'
import { Toastconfig } from './src/components/Toast/Toast';
import Netinfo from '@react-native-community/netinfo';
import { getStaticFeatureFlag } from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import NoInternetScreen from './src/Screen/NoInternetScreen/NoInternetScreen';

console.log('SET enabled:', getStaticFeatureFlag('ENABLE_SHARED_ELEMENT_TRANSITIONS'));
const App = () => {
  const [isConnected, setIsConnected] = useState(true); 
  useEffect(() => {
    const checkInternetConnection = Netinfo.addEventListener(state => {
      setIsConnected(!!state.isConnected);
    }); 
    return () => {      checkInternetConnection();
    };  

  }, [])
  // if(!isConnected){
    
  //   return (
  //     <>
      
  //   <NoInternetScreen/>
  //   <Toast/>
  //   </>)
  // } 
  return (
    <>
    <GestureHandlerRootView style={{flex:1}}>
     <StackNavigator/>
     {!isConnected &&    <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <NoInternetScreen />
      </View>}
      <Toast bottomOffset={50} config={Toastconfig}/>
    </GestureHandlerRootView>
  </>
  )
}

export default App