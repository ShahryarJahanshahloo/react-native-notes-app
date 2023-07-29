import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@react-navigation/native'

export default function AddNoteIcon() {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const styles = makeStyles(colors)

  return (
    <TouchableOpacity
      title=''
      style={styles.container}
      onPress={() => navigation.navigate('AddNote')}
    >
      <Icon
        name='note'
        size={28}
        color={colors.plusIconColor}
        style={styles.icon}
      />
    </TouchableOpacity>
  )
}

function makeStyles(colors) {
  return StyleSheet.create({
    container: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.plusIconBackground,
      position: 'absolute',
      bottom: 20,
      right: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 4,
    },
    icon: {},
  })
}
