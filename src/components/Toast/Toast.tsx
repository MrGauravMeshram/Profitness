import { View, Text } from 'react-native'
import React from 'react'
import { InfoToast } from 'react-native-toast-message/lib/src/components/InfoToast';


export const Toastconfig ={
    info: (props:any) => (
        <InfoToast
          {...props}
          text1Style={{
            fontSize: 15,
            fontWeight: '400',
            color: 'white',
          }}
          style={{ borderLeftColor: 'black', backgroundColor:'black',borderRadius:50}}
        />
      ),
}