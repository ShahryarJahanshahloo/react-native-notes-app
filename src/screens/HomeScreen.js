import { StyleSheet, View, FlatList, Pressable, Text } from 'react-native'
import NewNoteIcon from '../components/NewNoteIcon'
import { useTheme } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { getAllNotes } from '../db/note'
import { useIsFocused } from '@react-navigation/native'

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState(null)
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      const fetch = async () => {
        const notes = await getAllNotes()
        setNotes(notes)
      }
      fetch()
    }
  }, [isFocused])

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate({ name: 'Note', params: { note: item } })
            }}
          >
            <View style={styles.noteView}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteText}>{item.value}</Text>
            </View>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        keyExtractor={item => item.id}
      />
      <NewNoteIcon />
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
    separator: {
      borderBottomWidth: 0.5,
      borderColor: colors.separator,
      paddingTop: 20,
      marginBottom: 20,
      marginHorizontal: 20,
    },
  })
}
