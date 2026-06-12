import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const noFilter = () => {
  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        <Image
          source={require('../assets/Images/notfound.jpg')}
          style={{ height: "100%", width: "100%" }} />
      </View>
      <View>
        <Text style={style.textstyle}>Too Many Filters Applied</Text>
        <Text style={[style.textstyle, style.subtext]}>Try a different Permutation combination of filter. Or try removing some filters.</Text>
      </View>
    </View>
  )
}

export default noFilter

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imageContainer: {
    height: 300,
    width: 400,
    marginTop: 50
  },
  textstyle: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 32,
    fontFamily: 'BebasNeue-Regular'
  },
  subtext: {
    fontSize: 16,
    marginTop: 2,
    width: 380,
    textAlign: "center",
    marginLeft: 15,
    color: "grey",
    fontFamily: "DMSans-SemiBold"
  }
})