import 'react-native-gesture-handler'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/FontAwesome'

import HomeScreen from './src/screens/HomeScreen'
import AddNoteScreen from './src/screens/AddNoteScreen'
import NoteScreen from './src/screens/NoteScreen'

import { createTable } from './src/db/note'

createTable()
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='AddNote'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            ...headerDefaultOptions,
            title: 'NOTES',
            headerStyle: styles.homeHeaderStyle,
            headerRight: SearchIcon,
            headerLeft: DrawerIcon,
          }}
        />
        <Stack.Screen
          name='AddNote'
          component={AddNoteScreen}
          options={{
            ...headerDefaultOptions,
            headerStyle: styles.addNoteHeaderStyle,
          }}
        />
        <Stack.Screen name='Note' component={NoteScreen} />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  )
}

const headerDefaultOptions = {
  headerShadowVisible: false,
  headerTintColor: '#6F7377',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

function SearchIcon() {
  return <Icon name='search' size={20} color='#6F7377' />
}

function DrawerIcon() {
  return <Icon name='bars' size={20} color='#6F7377' />
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#79A79E',
  },
  homeHeaderStyle: {
    backgroundColor: '#2E3235',
    marginTop: Constants.statusBarHeight,
  },
  addNoteHeaderStyle: {
    backgroundColor: '#2E3235',
  },
})
