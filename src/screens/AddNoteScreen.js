import { StyleSheet, View } from 'react-native'
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { useRef } from 'react'

export default function AddNoteScreen() {
  const richText = useRef(null)

  return (
    <View style={styles.container}>
      <RichToolbar
        editor={richText}
        selectedIconTint='white'
        iconTint='#6F7377'
        style={{ backgroundColor: '#2E3235' }}
      />
      <RichEditor
        ref={richText}
        placeholder='Enter your text here...'
        androidHardwareAccelerationDisabled={true}
        editorStyle={styles.editorStyle}
        style={styles.rich}
        initialHeight={250}
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
