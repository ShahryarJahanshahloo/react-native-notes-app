import { StyleSheet, View } from 'react-native'
import AddNoteIcon from '../components/AddNoteIcon'
import { useTheme } from '@react-navigation/native'

export default function HomeScreen() {
  const { colors } = useTheme()
  const styles = makeStyles(colors)

  return (
    <View style={styles.container}>
      <AddNoteIcon />
    </View>
  )
}

function makeStyles(colors) {
  return StyleSheet.create({
    container: { backgroundColor: colors.background, flex: 1 },
  })
}
