import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonS from '../../Screen/Auth/component/AuthButton'


import SubscriptionHeader from './components/subscriptionHeader';

import PlanCard from './components/Plan';

const Subscription = ({navigation}:any) => {

  const [selectedPlan, setSelectedPlan] =
    useState('Popular');

  const plan = [
    {
      id: 1,
      title:
        'Create your personalized workout plan',
    },

    {
      id: 2,
      title:
        'Stay consistent and achieve your fitness goals',
    },

    {
      id: 3,
      title:
        'Build strength, stamina, and confidence',
    },

    {
      id: 4,
      title:
        'Train smarter for a healthier lifestyle',
    },
  ];

  const subscriptionPlans = [
    {
      id: '1',
      title: 'Standard',
      duration: 'Yearly',
      price: '$6.99',
    },

    {
      id: '2',
      title: 'Popular',
      duration: 'Yearly',
      price: '$29.99',
    },

    {
      id: '3',
      title: 'Premium',
      duration: 'Life-Time',
      price: '$49.99',
    },
  ];

  return (
    <View style={styles.container}>

      <SubscriptionHeader />

      {/* Heading */}

      <View style={styles.ViewText}>

        <Text style={styles.title}>
          SUBSCRIPTION PLAN
        </Text>

        <Text style={styles.subtitle}>
          It is a long established fact
          that a reader{'\n'}
          will be distracted by the
          readable
        </Text>

      </View>

      {/* Plan List */}

      <View style={styles.listContainer}>

        {plan.map(item => (

          <View
            key={item.id}
            style={styles.listRow}>
            
            <Ionicons
              name="checkmark-circle"
              size={24}
              color="black"
            />

            <Text style={styles.listText}>
              {item.title}
            </Text>

          </View>

        ))}

      </View>

      {/* Plan Cards */}

      <View style={styles.planContainer}>

        {subscriptionPlans.map(item => (

          <PlanCard
            key={item.id}
            title={item.title}
            duration={item.duration}
            price={item.price}
            active={
              selectedPlan ===
              item.title
            }
            onPress={() =>
              setSelectedPlan(
                item.title,
              )
            }
          />

        ))}

      </View>
      <View style={{paddingHorizontal:16,paddingVertical:32}}>
<ButtonS title="GO PREMIUM" onPress={()=>navigation.navigate('Newworkout')}/>
</View>
    </View>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  ViewText: {
    alignSelf: 'center',

    paddingVertical: 20,

    gap: 10,
  },

  title: {
    textAlign: 'center',

    fontFamily:
      'BebasNeue-Regular',

    fontSize: 26,
  },

  subtitle: {
    textAlign: 'center',

    fontFamily:
      'Montserrat-Regular',

    fontSize: 15,

    color: '#777',

    lineHeight: 22,
  },

  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  listRow: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 16,
  },

  listText: {
    fontSize: 13,

    marginLeft: 10,

    fontFamily:
      'Montserrat-Medium',
  },

  planContainer: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    paddingHorizontal: 20,

    marginTop: 25,
  },
});