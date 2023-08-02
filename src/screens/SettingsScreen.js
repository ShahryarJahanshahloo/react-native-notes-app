import { View, StyleSheet, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
import { useTheme } from '@react-navigation/native'
import { setItemAsync } from 'expo-secure-store'

export default function SettingsScreen() {
  const { theme, setTheme } = useContext(ThemeContext)
  const { colors } = useTheme()
  const styles = makeStyles(colors)

  async function handleThemeChange(value, index) {
    await setItemAsync('theme', value)
    setTheme(value)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theme</Text>
      <Picker
        selectedValue={theme}
        onValueChange={handleThemeChange}
        style={styles.picker}
        dropdownIconColor={colors.text}
      >
        <Picker.Item label='Dark' value='dark' />
        <Picker.Item label='Light' value='light' />
      </Picker>
    </View>
  )
}

function makeStyles(colors) {
  return StyleSheet.create({
    container: { paddingVertical: 24 },
    title: { color: colors.textHighlighted, paddingLeft: 14, fontSize: 26 },
    picker: { color: colors.text },
    pickerItem: {},
  })
}
