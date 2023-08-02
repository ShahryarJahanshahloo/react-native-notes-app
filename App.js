import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useEffect, useState } from 'react'
import { getItemAsync, setItemAsync } from 'expo-secure-store'

import HomeScreen from './src/screens/HomeScreen'
import NoteScreen from './src/screens/NoteScreen'
import SettingsScreen from './src/screens/SettingsScreen'

import { createTable } from './src/db/note'
import lightTheme from './src/themes/lightTheme'
import darkTheme from './src/themes/darkTheme'
import ThemeContext from './src/context/ThemeContext'

const themes = {
  dark: darkTheme,
  light: lightTheme,
}
createTable()
const Stack = createNativeStackNavigator()

export default function App() {
  const [theme, setTheme] = useState('dark')
  const currentTheme = themes[theme]
  const styles = makeStyles(currentTheme.colors)

  useEffect(() => {
    const fetch = async () => {
      const storedTheme = await getItemAsync('theme')
      if (!storedTheme) {
        await setItemAsync('theme', 'dark')
      } else {
        setTheme(storedTheme)
      }
    }
    fetch()
  }, [])

  const headerDefaultOptions = {
    headerShadowVisible: false,
    headerTintColor: currentTheme.colors.textHighlighted,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  function GearIcon(navigation) {
    return (
      <Icon
        name='gear'
        size={20}
        color={currentTheme.colors.text}
        onPress={() => {
          navigation.navigate('Settings')
        }}
      />
    )
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

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <NavigationContainer theme={currentTheme}>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={({ navigation }) => ({
              ...headerDefaultOptions,
              headerTitleAlign: 'left',
              title: 'NOTES',
              headerStyle: styles.homeHeaderStyle,
              headerRight: () => GearIcon(navigation),
            })}
          />
          <Stack.Screen
            name='Note'
            component={NoteScreen}
            initialParams={{ note: undefined }}
            options={{
              ...headerDefaultOptions,
              title: 'New Note',
              headerStyle: styles.NoteHeaderStyle,
              headerRight: SaveButton,
              headerLeft: CancelButton,
            }}
          />
          <Stack.Screen
            name='Settings'
            component={SettingsScreen}
            options={{
              ...headerDefaultOptions,
              title: 'Settings',
              headerStyle: styles.SettingsHeaderStyles,
            }}
          />
        </Stack.Navigator>
        <StatusBar style='auto' />
      </NavigationContainer>
    </ThemeContext.Provider>
  )
}

function makeStyles(colors) {
  return StyleSheet.create({
    homeHeaderStyle: {
      backgroundColor: colors.background,
    },
    NoteHeaderStyle: {
      backgroundColor: colors.background,
    },
    SettingsHeaderStyles: {
      backgroundColor: colors.background,
    },
    saveTouchable: {
      backgroundColor: colors.background,
    },
    saveText: {
      color: colors.text,
    },
    cancelTouchable: {},
    cancelText: { color: colors.text },
  })
}
