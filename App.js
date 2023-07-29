import 'react-native-gesture-handler'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/FontAwesome'

import HomeScreen from './src/screens/HomeScreen'
import AddNoteScreen from './src/screens/AddNoteScreen'
import NoteScreen from './src/screens/NoteScreen'

import { createTable } from './src/db/note'
import lightTheme from './src/themes/lightTheme'
import darkTheme from './src/themes/darkTheme'

createTable()
const Stack = createNativeStackNavigator()

const currentTheme = lightTheme

export default function App() {
  return (
    <NavigationContainer theme={currentTheme}>
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
            title: 'New Note',
            headerStyle: styles.addNoteHeaderStyle,
            headerRight: SaveButton,
            headerLeft: CancelButton,
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
  headerTintColor: currentTheme.colors.text,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

function SearchIcon() {
  return <Icon name='search' size={20} color={currentTheme.colors.text} />
}

function DrawerIcon() {
  return <Icon name='bars' size={20} color={currentTheme.colors.text} />
}

function SaveButton() {
  return (
    <TouchableOpacity style={styles.saveTouchable}>
      <Text style={styles.saveText}>save</Text>
    </TouchableOpacity>
  )
}

function CancelButton() {
  return (
    <TouchableOpacity style={styles.cancelTouchable}>
      <Text style={styles.cancelText}>cancel</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  homeHeaderStyle: {
    backgroundColor: currentTheme.colors.background,
    marginTop: Constants.statusBarHeight,
  },
  addNoteHeaderStyle: {
    backgroundColor: currentTheme.colors.background,
  },
  saveTouchable: {
    backgroundColor: currentTheme.colors.background,
  },
  saveText: {
    color: currentTheme.colors.text,
    fontWeight: 'bold',
  },
  cancelTouchable: {},
  cancelText: { color: currentTheme.colors.text, fontWeight: 'bold' },
})
