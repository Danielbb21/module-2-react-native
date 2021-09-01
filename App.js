import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from './context';

import { SignIn, CreateAccount, Profile, Home, Search, Details, Search2, Splash } from './Screen';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="SignIn" component={SignIn} options={{ title: "Sign In" }} />
    <AuthStack.Screen name="CreateAccount" component={CreateAccount} options={{ title: "Create Account" }} />
  </AuthStack.Navigator>
)
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Details" component={Details} options={({ route }) => ({
      title: route.params.name
    })} />
  </HomeStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
)
const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const TabsSceen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
    <Tabs.Screen name="Search" component={SearchStackScreen} options={{ headerShown: false }} />
  </Tabs.Navigator>
);
const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator>

    <Drawer.Screen name="Home" component={TabsSceen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
  </Drawer.Navigator>
);

const RootStack = createStackNavigator();

const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator screenOptions={{
    headerShown: false
  }}>
    {userToken ? <RootStack.Screen name="Auth" component={AuthStackScreen} options = {{ animationEnabled: false}}/>
      : <RootStack.Screen name="App" component={DrawerScreen} options = {{ animationEnabled: false}}/>}


  </RootStack.Navigator>
);

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setIsLoggedIn('ufgruf');
      },
      signUp: () => {
        setIsLoading(false);
        setIsLoggedIn("iuerfnui");
      },
      signOut: () => {
        setIsLoading(false);
        setIsLoggedIn(null);
      }
    }
  }, [])
  React.useEffect(() => {
    const time = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return function cleanUp() {
      clearTimeout(time);
    }
  }, [])
  if (isLoading) {
    return <Splash />
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={isLoggedIn} />


      </NavigationContainer>
    </AuthContext.Provider >
  )
}