import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerContentComponentProps,
  useDrawerProgress,
} from '@react-navigation/drawer';

import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import FavoriteScreen from '../Screen/Favorites/FavoriteScreen';
import TrainingScreen from '../Screen/Training/TrainingScreen';
import Dashboard from '../Screen/DashBoard/Dashboard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReminderScreen from '../Screen/Reminder/ReminderScreen';
import MyTabs from './BottomTabNavigation';
import AppSettingsScreen from '../Screen/AppSettings/AppSettingsScreen';
import Categories from '../Screen/Categories/CategoriesScreen';
import ProgressScreen from '../Screen/Progress/ProgressScreen';
const { width } = Dimensions.get('window');
const Drawer = createDrawerNavigator();

type DrawerItemProps = {
  icon: string;
  label: string;
  onPress?: () => void;
};

const DrawerItem = ({ icon, label, onPress }: DrawerItemProps) => (
  <TouchableOpacity
    style={styles.drawerItem}
    activeOpacity={0.6}
    onPress={onPress}
  >
    <Ionicons name={icon} size={22} color="#444" />
    <Text style={styles.drawerLabel}>{label}</Text>
  </TouchableOpacity>
);

const CustomDrawerContent = (props: DrawerContentComponentProps) => (
  <DrawerContentScrollView
    {...props}
    scrollEnabled={false}
    contentContainerStyle={{ flex: 1 }}
  >
    <View style={styles.drawerContainer}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => props.navigation.closeDrawer()}
      >
        <Ionicons name="close" size={28} color="#111" />
      </TouchableOpacity>

      <Image
        source={require('../assets/png/profile2.png')}
        style={styles.profileImage}
      />
      <Text style={styles.name}>Dhruvit !</Text>
      <Text style={styles.member}>Basic member</Text>

      <View style={styles.menuContainer}>
        <DrawerItem icon="grid-outline" label="Dashboard" 
        onPress={()=>{
          props.navigation.navigate('Dashboard')
        }}/>
        <DrawerItem icon="analytics-outline" label="My Progress" 
        onPress={()=>{
          props.navigation.navigate('Progress')
        }}/>
        <DrawerItem
          icon="barbell-outline"
          label="Training"
          onPress={() => {
            props.navigation.navigate('Training');
          }}
        />
        <DrawerItem
          icon="apps-outline"
          label="Categories"
          onPress={() => {
            props.navigation.navigate('Categories');
          }}
        />
        <DrawerItem icon="notifications-outline" label="Reminder" onPress={()=>props.navigation.navigate('Reminder')}/>
        <DrawerItem icon="heart-outline" label="My Favorites" onPress={()=>props.navigation.navigate('Favorite')}/>
        <DrawerItem icon="settings-outline" label="App Settings" onPress={()=>props.navigation.navigate('Setting')}/>
        <DrawerItem icon="call-outline" label="Contact Support" />
      </View>

      <TouchableOpacity style={styles.signOut}
      onPress={()=>{
        props.navigation.navigate('Login')
      }}>
        <Ionicons name="log-out-outline" size={24} color="#111" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  </DrawerContentScrollView>
);

const AnimatedScreen = ({ children }: { children: React.ReactNode }) => {
  const progress = useDrawerProgress();

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      progress.value,
      [0, 1],
      [0, width * 0.6],
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      progress.value,
      [0, 1],
      [1, 0.9],
      Extrapolation.CLAMP,
    );

    const translateY = interpolate(
      progress.value,
      [0, 1],
      [0, 90],
      Extrapolation.CLAMP,
    );

    const borderRadius = interpolate(
      progress.value,
      [0, 1],
      [0, 20],
      Extrapolation.CLAMP,
    );

  

    return {
      transform: [
        { translateX },
        { translateY },
        { scale },
      
      ],
      borderRadius,
      overflow: 'hidden' as const,
    };
  });

  return (
    <Animated.View style={[styles.screenWrapper, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const WrappedTabs = () => (
  <AnimatedScreen>
    <MyTabs />
  </AnimatedScreen>
);

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        overlayColor: 'transparent',
        drawerStyle: {
          width: '65%',
          backgroundColor: '#F5F5F5',
        },

        swipeEdgeWidth: 60,
      }}
    >
      <Drawer.Screen name="Home" component={WrappedTabs} />
      <Drawer.Screen name="Training" component={TrainingScreen} />
      <Drawer.Screen name="Categories" component={Categories} />
      <Drawer.Screen name="Dashboard" component={Dashboard}
      />
      <Drawer.Screen name = 'Setting' component={AppSettingsScreen}/>
      <Drawer.Screen name = 'Favorite' component={FavoriteScreen}/>
      <Drawer.Screen name='Reminder' component={ReminderScreen}/>
      <Drawer.Screen name='Progress' component={ProgressScreen}/>
    </Drawer.Navigator>
  );
}
export default MyDrawer;

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 24,
  },

  drawerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: '#F5F5F5',
  },

  closeButton: { marginBottom: 20 },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  name: {
    fontSize: 20,
    color: '#111',
    marginTop: 20,
    fontFamily: 'DMSans-Medium',
  },

  member: {
    fontSize: 18,
    color: '#666',
    marginTop: 4,
  },

  menuContainer: { marginTop: 40 },

  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  drawerLabel: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Montserrat-Medium',
    marginLeft: 18,
  },

  signOut: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 30,
  },

  signOutText: {
    fontSize: 15,
    color: '#111',
    marginLeft: 16,
    fontFamily: 'Montserrat-Medium',
  },
});
