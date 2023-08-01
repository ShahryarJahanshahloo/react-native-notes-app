import db from './index'
import moment from 'moment'

const CREATE_TABLE =
  'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY NOT NULL, value TEXT,title TEXT, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL);'
const GET_ALL_NOTES = 'SELECT * FROM notes;'
const INSERT_NOTE = 'INSERT INTO notes (value, title) VALUES (?, ?);'
const UPDATE_NOTE =
  'UPDATE notes SET value = ?, title = ?, updatedAt = ? WHERE id = ?;'
const DELETE_NOTE = 'DELETE FROM notes WHERE id = ?;'

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
  //TODO: add validations
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

export async function updateNote(note) {
  //TODO: add validations
  try {
    let resultSet
    await db.transactionAsync(async tx => {
      resultSet = await tx.executeSqlAsync(UPDATE_NOTE, [
        note.value,
        note.title,
        moment().format('YYYY-MM-DD HH:mm:ss'),
        note.id,
      ])
    })
    console.log(resultSet)
  } catch (error) {
    console.log(error)
  }
}

export async function deleteNote(id) {
  try {
    let resultSet
    await db.transactionAsync(async tx => {
      resultSet = await tx.executeSqlAsync(DELETE_NOTE, [id])
    })
    console.log(resultSet)
  } catch (error) {
    console.log(error)
  }
}
