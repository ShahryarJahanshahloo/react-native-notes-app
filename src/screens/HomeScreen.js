import { StyleSheet, View, FlatList, Pressable, Text } from 'react-native'
import AddNoteIcon from '../components/AddNoteIcon'
import { useTheme } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { getAllNotes } from '../db/note'

export default function HomeScreen({ navigation }) {
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
          <Pressable
            onPress={() => {
              navigation.navigate({ name: 'AddNote', params: { note: item } })
            }}
          >
            <View style={styles.noteView}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteText}>{item.value}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={item => item.id}
      />
      <AddNoteIcon />
    </View>
  )
}

function makeStyles(colors) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
      paddingVertical: 20,
    },
    noteView: {
      paddingLeft: 20,
    },
    noteTitle: {
      color: colors.textHighlighted,
      paddingBottom: 12,
      fontSize: 22,
    },
    noteText: {
      color: colors.text,
      paddingBottom: 12,
      maxHeight: 100,
      overflow: 'hidden',
    },
  })
}
