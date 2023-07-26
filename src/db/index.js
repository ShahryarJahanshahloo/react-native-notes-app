import { openDatabase } from 'expo-sqlite'

const db = openDatabase('db.db')
export default db
