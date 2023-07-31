import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from '@react-navigation/native'
import { addNewNote } from '../db/note'

export default function AddNoteScreen({ navigation, route }) {
  const { note } = route.params
  const richTextRef = useRef(null)
  const [text, setText] = useState(note == undefined ? '' : note.value)
  const [title, setTitle] = useState(
    note == undefined ? 'Untitled' : note.title
  )
  const { colors } = useTheme()
  const styles = makeStyles(colors)

  useEffect(() => {
    const resetRichText = navigation.addListener('focus', () => {
      richTextRef.current.setContentHTML(note == undefined ? '' : note.value)
    })

    navigation.setOptions({
      title: note == undefined ? 'New Note' : 'Edit Note',
      headerRight: () => {
        return (
          <TouchableOpacity style={styles.saveTouchable} onPress={handleSave}>
            <Text style={styles.saveText}>save</Text>
          </TouchableOpacity>
        )
      },
      headerLeft: () => {
        return (
          <TouchableOpacity
            style={styles.cancelTouchable}
            onPress={handleCancel}
          >
            <Text style={styles.cancelText}>cancel</Text>
          </TouchableOpacity>
        )
      },
    })

    return resetRichText
  }, [navigation, note])

  function createTitleAlert() {
    Alert.alert('maximum number of characters reached', undefined, undefined, {
      cancelable: true,
    })
  }

  function createRichAlert() {
    Alert.alert('maximum number of characters reached', undefined, undefined, {
      cancelable: true,
    })
  }

  function handleTitleChange(value) {
    if (value.length >= 32) {
      createTitleAlert()
      return
    }
    setTitle(value)
  }

  function handleRichChange(value) {
    if (value.length >= 2048) {
      createRichAlert()
      return
    }
    setText(value)
  }

  async function handleSave() {
    if (note == undefined) {
      await addNewNote({
        value: text,
        title: title,
      })
    } else {
    }

    navigation.navigate('Home')
  }

  function handleCancel() {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleTitleChange}
        value={title}
      />
      <RichEditor
        ref={richTextRef}
        onChange={handleRichChange}
        placeholder='Enter your text here...'
        initialContentHTML={note ? note.value : null}
        androidHardwareAccelerationDisabled={true}
        editorStyle={styles.editorStyle}
        style={styles.rich}
        initialHeight={250}
        autoCorrect={false}
      />
      <RichToolbar
        editor={richTextRef}
        selectedIconTint={colors.iconHighlighted}
        iconTint={colors.icon}
        style={{ backgroundColor: colors.background }}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.setStrikethrough,
          actions.setUnderline,
        ]}
      />
    </View>
  )
}

function makeStyles(colors) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
      paddingTop: 20,
    },
    rich: { flex: 1, marginTop: 10 },
    editorStyle: { backgroundColor: colors.background, color: colors.text },
    input: {
      backgroundColor: colors.background,
      color: colors.textHighlighted,
      fontSize: 30,
      paddingLeft: 14,
    },
    saveTouchable: {
      backgroundColor: colors.background,
    },
    saveText: {
      color: colors.text,
      fontWeight: 'bold',
    },
    cancelTouchable: {},
    cancelText: { color: colors.text, fontWeight: 'bold' },
  })
}
