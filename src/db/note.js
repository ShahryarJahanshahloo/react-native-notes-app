import db from './index'

const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS notes (
  id INTEGER PRIMARY KEY NOT NULL,
  value TEXT,
  title TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  );`
const GET_ALL_NOTES = `SELECT * FROM notes ORDER BY updatedAt DESC`
const INSERT_NOTE = `INSERT INTO notes (value, title) VALUES (?, ?)`
const UPDATE_NOTE = `UPDATE notes
  SET value = ?, title = ?, createdAt = ?
  WHERE id = ?;`

export function createTable() {
  db.transaction(tx => {
    tx.executeSql(CREATE_TABLE)
  })
}

export function getAllNotes() {
  let notes
  db.transaction(tx => {
    tx.executeSql(
      GET_ALL_NOTES,
      null,
      (_, { rows: { _array } }) => (notes = _array)
    )
  })
  return notes
}

export function addNewNote(note) {
  // add validations
  db.transaction(tx => {
    tx.executeSql(INSERT_NOTE, [note.value, note.title])
  })
}

export function updateNote(note) {
  //add validations
  db.transaction(tx => {
    tx.executeSql(UPDATE_NOTE, [
      note.value,
      note.title,
      note.createdAt,
      note.id,
    ])
  })
}
