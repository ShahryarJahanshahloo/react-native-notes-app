import { StyleSheet, View, FlatList, Pressable, Text } from 'react-native'
import AddNoteIcon from '../components/AddNoteIcon'
import { useTheme } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { getAllNotes } from '../db/note'

export default function HomeScreen() {
  const [notes, setNotes] = useState(null)
  const { colors } = useTheme()
  const styles = makeStyles(colors)

  useEffect(() => {
    const fetch = async () => {
      const notes = await getAllNotes()
      setNotes(notes)
    }
    fetch()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <View style={styles.noteView}>
            <Text>{item.id}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <AddNoteIcon />
    </View>
  )
}

function makeStyles(colors) {
  return StyleSheet.create({
    container: { backgroundColor: colors.background, flex: 1 },
    noteView: {},
  })
}
