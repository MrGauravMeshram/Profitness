import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Tabs} from 'react-native-collapsible-tab-view';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Fitness App</Text>
    </View>
  );
};

const GoalPills = () => {
  return (
    <View style={styles.goalContainer}>
      <Text style={styles.goal}>Weight Loss</Text>
      <Text style={styles.goal}>Muscle Gain</Text>
      <Text style={styles.goal}>Healthy</Text>
      <Text style={styles.goal}>Cardio</Text>
    </View>
  );
};

const TestScreen = () => {
  return (
    <Tabs.Container
      renderHeader={Header}
      renderTabBar={GoalPills}
      headerHeight={250}>
      
      <Tabs.Tab name="Exercises">
        <Tabs.ScrollView>
          {Array.from({length: 20}).map((_, index) => (
            <View key={index} style={styles.item}>
              <Text>Exercise Item {index + 1}</Text>
            </View>
          ))}
        </Tabs.ScrollView>
      </Tabs.Tab>

    </Tabs.Container>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  header: {
    height: 250,
    backgroundColor: '#B7CF1A',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },

  goalContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    gap: 10,
  },

  goal: {
    backgroundColor: '#B7CF1A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  item: {
    height: 80,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
});