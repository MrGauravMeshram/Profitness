import { View, Text, StyleSheet, Image ,FlatList,ScrollView} from 'react-native'
import Header from '../../components/ScreensHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Selector from '../../components/Selector';
import Card from '../DashBoard/Component/Card';
import { BarChart } from "react-native-gifted-charts";
import {WeekData} from '../../Data/WeekData';
import {ProgressData} from './Data/ProgressData.ts';

const ProgressScreen = ({ navigation }: any) => {
    const [selected, setSelected] = useState('Today');
    const Data = ['Today', 'Week', 'Month'];
    return (
        <SafeAreaView style={styles.container}>
            <Header title="My Progress" navigation={navigation} />
            

            <View style={styles.ActivityBox}>
                <Text style={styles.ActivityText}>Activity</Text>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 10, marginTop: 16 }}>
                {Data.map((item, index) => (
                    <Selector key={index} title={item} active={selected === item} onPress={() => setSelected(item)} style={{ width: 120, marginHorizontal: 8 }} />
                ))}
            </View>
            <ScrollView>
            <View style={styles.graphContainer}>
                  <View>
                    <View style={styles.outerdot}>
                        <View style={styles.innerdot}>
                      <View style={styles.nesteddot}>

                      </View>
                        </View>
                    </View>
                </View>
                <Image source={require('../../assets/Images/Vector.png')} style={{ position: 'absolute', top: 23 ,left:29}} />
              
                <LinearGradient colors={["#F5F5F5", "#69696980"]} style={{ height: 156, width: 35 }} />
                <LinearGradient colors={["#F5F5F5", "#69696980"]} style={{ height: 136, width: 35 }} />
                <LinearGradient colors={["#F5F5F5", "#69696980"]} style={{ height: 218, width: 35 }} />
                <LinearGradient colors={["#F5F5F5", "#69696980"]} style={{ height: 162, width: 35 }} />
                <LinearGradient colors={["#F5F5F5", "#B0C929"]} style={{ height: 185, width: 35 }} />
                <LinearGradient colors={["#F5F5F5", "#69696980"]} style={{ height: 177, width: 35 }} />
                <LinearGradient colors={["#F5F5F5", "#69696980"]} style={{ height: 174, width: 35 }} />

            </View>
            <View>
                <FlatList
                data={WeekData}
                renderItem={({item}:any) => (
                    <Text>{item.day}</Text>
            
                )}
                horizontal
                 style={{marginTop:10,marginLeft:37}}
                 contentContainerStyle={{gap:29}}
                 showsHorizontalScrollIndicator={false}
                 keyExtractor={(item) => item.id.toString()}
                />
            </View>
            <View style={{marginTop:30,paddingHorizontal:16}}>
                <Text style={styles.MeasurmentText}>Measurement</Text>
            </View>
          <View style={{ paddingHorizontal: 16, marginTop: 20,flexDirection:"row",gap:20,flexWrap:"wrap",justifyContent:"center"}}> j
  {ProgressData.map((item:any) => (
    <Card
      key={item.id}
      icon={item.icon}
      name={item.title}
      nums={item.value}
      texts={item.unit}
      progress={item.progress}
      color="black"
    />
  ))}
</View>
          </ScrollView>
        </SafeAreaView>
    )
}

export default ProgressScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    ActivityBox: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    ActivityText: {
        fontFamily: "Montserrat-Bold",
        fontSize: 18,
        color: '#111'
    },
    graphContainer: { flexDirection: 'row', gap: 20,paddingRight: 20, alignItems: 'flex-end',justifyContent: 'center', marginTop: 20 , height: 250 },
    outerdot:{
    height: 40,
    width: 40,
    position: 'absolute',
    top: -220,
    left: 230,
      alignItems:"center",
    justifyContent:"center",
    borderRadius: 50,
    backgroundColor: '#EFF2D4',
    },
    innerdot: {
    height: 30,
    alignItems:"center",
    justifyContent:"center",
    width: 30,
    borderRadius: 20,
    backgroundColor: '#cad68aa3',
    },
    nesteddot:{
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: '#B0C929',
  
    },
    MeasurmentText:{
        fontFamily: "Montserrat-Bold",
        fontSize: 18,
        color: '#111'
    }
})