import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import asyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { RootState } from '../../Storage/Redux/store';
import AgeMeter from './component/Age';
import WeightSelector from './component/AgeScale';
import HeadingText from '../../components/headingText';
import AuthButton from '../Auth/component/AuthButton';
import Level from './component/Level';
import GetStarted from './component/GetStart';

const favoriteData = [
  {
    id: '1',
    title: 'Running',
    image: require('../../assets/png/Running.png'),
  },

  {
    id: '2',
    title: 'Walking',
    image: require('../../assets/png/Walking.png'),
  },

  {
    id: '3',
    title: 'Meal plan',
    image: require('../../assets/png/Meal.png'),
  },

  {
    id: '4',
    title: 'Cycling',
    image: require('../../assets/png/Cycling.png'),
  },

  {
    id: '5',
    title: 'Yoga',
    image: require('../../assets/png/Yoga.png'),
  },

  {
    id: '6',
    title: 'Health',
    image: require('../../assets/png/Health.png'),
  },
];

const steps = [
  {
    id: 1,
    type: 'favorite',
    title: 'SELECT YOUR FAVORITE',
    subtitle: 'Step 1 of 7',
  },

  {
    id: 2,
    type: 'age',
    title: 'HOW OLD ARE YOU?',
    subtitle: 'Step 2 of 7',
  },

  {
    id: 3,
    type: 'weight',
    title: 'HOW MUCH DO YOU WEIGHT?',
    subtitle: 'Step 3 of 7',
    unit1: 'LBS',
    unit2: 'KG',
  },

  {
    id: 4,
    type: 'weight',
    title: "WHAT'S YOUR GOAL WEIGHT?",
    subtitle: 'Step 4 of 7',
    unit1: 'LBS',
    unit2: 'KG',
  },

  {
    id: 5,
    type: 'weight',
    title: 'HOW MUCH DO YOU HEIGHT?',
    subtitle: 'Step 5 of 7',
    unit1: 'FEET',
    unit2: 'CM',
  },

  {
    id: 6,
    type: 'level',
    title: "WHAT'S YOUR FITNESS LEVEL?",
    subtitle: 'Step 6 of 7',
  },
  {
    id: 7,
    type: 'goal',
    title: 'WHAT IS YOUR GOAL?',
    subtitle: 'Step 7 of 7',
  },
  {
    id: 8,
    type: 'start',
    title: '',
    subtitle: '',
  },
];

const FavoriteScreen = ({ navigation }: any) => {
  const uid = useSelector((state: RootState) => state.userReducer.uid);
  const [currentStep, setCurrentStep] = useState(0);
  const [goal, setGoal] = useState('Improve fitness');


  const [selected, setSelected] = useState<string[]>([]);

  const [selectedAge, setSelectedAge] = useState(27);

  const [weight, setWeight] = useState('');

  const [goalWeight, setGoalWeight] = useState('');

  const [height, setHeight] = useState('');

  const [unit, setUnit] = useState('KG');

  const [level, setLevel] = useState('BEGINNER');

  const currentData = steps[currentStep];

 const handleNext = async () => {
  if (currentStep === steps.length - 1) {
    const key = uid ? `steppingCompleted_${uid}` : 'steppingCompleted';
    await asyncStorage.setItem(key, 'true');
       navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });

    return;
  }

  setCurrentStep(prev => prev + 1);
};

React.useEffect(() => {
  const getitem = async () => {
    const key = uid ? `steppingCompleted_${uid}` : 'steppingCompleted';
    const value = await asyncStorage.getItem(key);
    
  };
  getitem();
}, [uid]);

  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };
  const renderGoal = () => {
    return (
      <View style={styles.levelContainer}>
        <Level
          selectedLevel={goal}
          onSelect={setGoal}
          levels={[
            {
              title: 'Weight loss',
              icon: require('../../assets/png/weight.png'),
            },

            {
              title: 'Gain muscle',
              icon: require('../../assets/png/muscle.png'),
            },

            {
              title: 'Improve fitness',
              icon: require('../../assets/png/gym.png'),
            },
          ]}
        />
      </View>
    );
  };
  const renderStart = () => {
    return (
      <View style={styles.startContainer}>
        <GetStarted />
      </View>
    );
  };
  const renderFavorite = () => {
    return (
      <FlatList
        data={favoriteData}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.favoriteListContent}
        columnWrapperStyle={styles.favoriteColumnWrapper}
        renderItem={({ item }) => {
          const isSelected = selected.includes(item.id);

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.card}
              onPress={() => handleSelect(item.id)}
            >
              <View
                style={[
                  styles.imageWrapper,
                  isSelected && styles.selectedBorder,
                ]}
              >
                <Image source={item.image} style={styles.image} />
              </View>

              <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const renderWeight = () => {
    const units = [currentData.unit1, currentData.unit2].filter(
      (item): item is string => Boolean(item),
    );

    const getValue = () => {
      switch (currentStep) {
        case 2:
          return weight;

        case 3:
          return goalWeight;

        case 4:
          return height;

        default:
          return '';
      }
    };

    const setCurrentValue = (text: string) => {
      switch (currentStep) {
        case 2:
          setWeight(text);
          break;

        case 3:
          setGoalWeight(text);
          break;

        case 4:
          setHeight(text);
          break;
      }
    };

    return (
      <View style={styles.weightContainer}>
        <WeightSelector
          value={getValue()}
          onChangeValue={setCurrentValue}
          selectedUnit={unit}
          onChangeUnit={setUnit}
          units={units}
        />
      </View>
    );
  };

  const renderLevel = () => {
    return (
      <View style={styles.levelContainer}>
        <Level
          selectedLevel={level}
          onSelect={setLevel}
          levels={[
            {
              title: 'BEGINNER',
            },

            {
              title: 'Intermediate',
            },

            {
              title: 'Advanced',
            },
          ]}
        />
      </View>
    );
  };
  const renderContent = () => {
    switch (currentData.type) {
      case 'favorite':
        return renderFavorite();

      case 'age':
        return (
          <AgeMeter selectedAge={selectedAge} onChangeAge={setSelectedAge} />
        );

      case 'weight':
        return renderWeight();

      case 'level':
        return renderLevel();

      case 'goal':
        return renderGoal();

      case 'start':
        return renderStart();

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={
          currentData.type === 'start'
            ? [styles.headerRow, styles.centerHeaderRow]
            : styles.headerRow
        }
      >
        <HeadingText
          title={currentData.title}
          subtitle={currentData.subtitle}
          reverse={currentData.type !== 'start'}
          onPress={() => navigation.goBack()}
        />

        {currentData.type !== 'start' && (
          <TouchableOpacity>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>{renderContent()}</View>

      <View style={styles.buttonContainer}>
        <AuthButton
          title={
            currentStep === steps.length - 1
              ? ('GET STARTED!')            
              : currentStep === 6
              ? 'FINISH STEP'
              : 'NEXT STEPS'
          }
          
          onPress={handleNext}


        />
      </View>
    </SafeAreaView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 60,
    paddingLeft: 50,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  skipText: {
    marginTop: 32,
    fontSize: 14,
    color: '#111',
    fontFamily: 'DMSans_18pt-Bold',
  },

  favoriteListContent: {
    marginTop: 70,
    paddingBottom: 140,
  },

  favoriteColumnWrapper: {
    justifyContent: 'space-between',
  },

  centerHeaderRow: {
    justifyContent: 'center',
  },

  content: {
    flex: 1,
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 35,
    left: 24,
    right: 24,
  },

  card: {
    alignItems: 'center',
    marginBottom: 16,
  },

  imageWrapper: {
    width: 122,
    height: 122,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'transparent',
  },

  selectedBorder: {
    borderColor: '#B4CC18',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  cardTitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#111',
    fontFamily: 'DMSans_18pt-Medium',
  },

  weightContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 150,
  },

  levelContainer: {
    width: '100%',
    marginTop: 120,
  },
  startContainer: {
    flex: 1,
  },
});
