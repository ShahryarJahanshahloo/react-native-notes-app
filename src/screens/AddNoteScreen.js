import { StyleSheet, View, Text } from 'react-native'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'
import { useRef, useState } from 'react'

export default function AddNoteScreen() {
  const richTextRef = useRef(null)
  const [text, setText] = useState('')

  function handleRichChange(value) {
    setText(value)
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <RichToolbar
        editor={richTextRef}
        selectedIconTint='white'
        iconTint='#6F7377'
        style={{ backgroundColor: '#2E3235' }}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2E3235',
    flex: 1,
    paddingTop: 20,
  },
  rich: { flex: 1, marginTop: 10 },
  editorStyle: { backgroundColor: '#2E3235', color: '#6F7377' },
})
