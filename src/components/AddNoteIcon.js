import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { useNavigation } from '@react-navigation/native'

export default function AddNoteIcon() {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      title=''
      style={styles.container}
      onPress={() => navigation.navigate('AddNote')}
    >
      <Icon name='note' size={28} color='#2E3235' style={styles.icon} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#92B2C7',
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4,
  },
  icon: {},
})
