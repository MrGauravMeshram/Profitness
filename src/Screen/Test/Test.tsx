import { View, Text ,TouchableOpacity , Pressable} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Test = ({navigation}:any) => {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate('MealPlanTest')}>
        <Text>Go to Test List</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Test