import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from '@react-navigation/native'
import { addNewNote, updateNote, deleteNote } from '../db/note'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function NoteScreen({ navigation, route }) {
  const { note } = route.params
  const richTextRef = useRef(null)
  const [text, setText] = useState(note == undefined ? '' : note.value)
  const [title, setTitle] = useState(
    note == undefined ? 'Untitled' : note.title
  )
  const { colors } = useTheme()
  const styles = makeStyles(colors)

  useEffect(() => {
    navigation.setOptions({
      title: note == undefined ? 'New Note' : 'Edit Note',
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
  }, [navigation, note])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity style={styles.saveTouchable} onPress={handleSave}>
            <Text style={styles.saveText}>save</Text>
          </TouchableOpacity>
        )
      },
    })
  }, [navigation, note, text, title])

  useEffect(() => {
    const resetRichText = navigation.addListener('focus', () => {
      richTextRef.current.setContentHTML(note == undefined ? '' : note.value)
    })

    return resetRichText
  }, [note])

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
      await updateNote({
        value: text,
        title: title,
        id: note.id,
      })
    }

    navigation.navigate('Home')
  }

  function handleCancel() {
    navigation.navigate('Home')
  }

  async function handleDelete() {
    await deleteNote(note.id)
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleTitleChange}
        value={title}
        multiline
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
      <View style={styles.toolbar}>
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
        {note == undefined ? null : (
          <View style={styles.iconWrapper}>
            <Pressable style={styles.iconPressable} onPress={handleDelete}>
              <Icon name='trash' size={22} color={colors.trash} />
            </Pressable>
          </View>
        )}
      </View>
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
    },
    cancelTouchable: {},
    cancelText: { color: colors.text },
    toolbar: {
      flexDirection: 'row',
      paddingVertical: 6,
      paddingHorizontal: 6,
    },
    iconWrapper: {
      alignSelf: 'stretch',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    iconPressable: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.icon,
      width: 36,
      height: 36,
      borderRadius: 100,
    },
  })
}
