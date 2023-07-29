import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from '@react-navigation/native'
import { addNewNote } from '../db/note'

export default function AddNoteScreen({ navigation }) {
  const richTextRef = useRef(null)
  const [text, setText] = useState('')
  const { colors } = useTheme()
  const styles = makeStyles(colors)

  useEffect(() => {
    navigation.setOptions({
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
  }, [navigation])

  function handleRichChange(value) {
    setText(value)
  }

  function handleSave() {}

  function handleCancel() {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Untitled'
        style={styles.input}
        placeholderTextColor={colors.textHighlighted}
      />
      <RichEditor
        ref={richTextRef}
        onChange={handleRichChange}
        placeholder='Enter your text here...'
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
