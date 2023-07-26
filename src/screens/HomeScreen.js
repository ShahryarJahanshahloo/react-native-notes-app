import { StyleSheet, Text, View } from 'react-native'
import AddNoteIcon from '../components/AddNoteIcon'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <AddNoteIcon />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#2E3235', flex: 1 },
})
