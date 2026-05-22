import { View, Text ,StyleSheet ,FlatList} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/ScreensHeader'
import React,{useState} from 'react'
import Card from './Component/Card'
import ActivityCards from './Component/Card'
import Selector from '../../components/Selector'

const Dashboard = ({navigation}:any) => {
    const [selected, setSelected] = useState('Today');
    const Data = [
        'Today',
        'Week',
        'Month'
    ]
  const HealthData = [
  {
    id: 1,
    title: 'Walk',
    icon: 'shoe-sneaker',
    value: '2265',
    subTitle: 'Steps',
    progress: 0.75,
    color: '#B4CC1E',
  },

  {
    id: 2,
    title: 'Sleep',
    icon: 'weather-night',
    value: '8:50',
    subTitle: 'Hours',
    progress: 0,
    color: '#D9D9D9',
  },

  {
    id: 3,
    title: 'Heart',
    icon: 'heart-outline',
    value: '115',
    subTitle: 'bmp',
    type: 'wave',
    color: '#B4CC1E',
  },

  {
    id: 4,
    title: 'Calories',
    icon: 'fire',
    value: '399',
    subTitle: 'Kcal',
    progress: 0.68,
    color: '#B4CC1E',
  },

  {
    id: 5,
    title: 'Walk',
    icon: 'shoe-sneaker',
    value: '2265',
    subTitle: 'Steps',
    progress: 0.75,
    color: '#B4CC1E',
  },

  {
    id: 6,
    title: 'Sleep',
    icon: 'weather-night',
    value: '8:50',
    subTitle: 'Hours',
    progress: 0,
    color: '#D9D9D9',
  },
];
const renderData = ({item}:any)=>{
  return(
    <View>
<Card
  icon={item.icon}
  name={item.title}
  nums={item.value}
  texts={item.subTitle}
  progress={item.progress}
  color={item.color}
/>
    </View>
  )
}
  return (
    
      <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
         <Header title="DASHBOARD" navigation={navigation} />
         <View style={{flexDirection:"row",alignSelf:"center",gap:20,marginTop:30}}>
{Data.map((cv, id) => (
  <View key={id} style={{ flexDirection: 'row' }}>
    <Selector
      title={cv}
      active={selected === cv}
      onPress={() => setSelected(cv)}
    />
  </View>
))}
</View>
<View style={{marginTop:20,}}>
<FlatList
data={HealthData}
numColumns={2}
key={2}
renderItem={renderData}
keyExtractor={(item)=>item.id.toString()
}
columnWrapperStyle={{
    justifyContent: "space-around",
    marginBottom: 16,
    paddingHorizontal:15,
    
  }}
/>

</View>
      </SafeAreaView>
    
  )
}


export default Dashboard