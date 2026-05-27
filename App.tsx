import React from 'react'
import StackNavigator from './src/Navigation/StackNavigator'
import 'react-native-gesture-handler';
import { getStaticFeatureFlag } from 'react-native-reanimated';


console.log('SET enabled:', getStaticFeatureFlag('ENABLE_SHARED_ELEMENT_TRANSITIONS'));
const App = () => {
  return (
    <>
     <StackNavigator/>
  </>
  )
}

export default App