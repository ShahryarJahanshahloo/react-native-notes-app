import db from './index'

const CREATE_TABLE =
  'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY NOT NULL, value TEXT,title TEXT, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL);'
const GET_ALL_NOTES = 'SELECT * FROM notes;'
const INSERT_NOTE = 'INSERT INTO notes (value, title) VALUES (?, ?);'
const UPDATE_NOTE =
  'UPDATE notes SET value = ?, title = ?, createdAt = ? WHERE id = ?;'
//add delete note

export function createTable() {
  db.transaction(tx => {
    // tx.executeSql('drop table notes;')
    tx.executeSql(CREATE_TABLE)
  })
}

export async function getAllNotes() {
  try {
    let resultSet
    await db.transactionAsync(async tx => {
      resultSet = await tx.executeSqlAsync(GET_ALL_NOTES)
    })
    return resultSet.rows
  } catch (error) {
    console.log(error)
  }
}

export async function addNewNote(note) {
  try {
    let resultSet
    await db.transactionAsync(async tx => {
      resultSet = await tx.executeSqlAsync(INSERT_NOTE, [
        note.value,
        note.title,
      ])
    })
    console.log(resultSet)
  } catch (error) {
    console.log(error)
  }
}

// export function addNewNote(note) {
//   // add validations
//   db.transaction(tx => {
//     tx.executeSql(INSERT_NOTE, [note.value, note.title])
//   })
// }

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
