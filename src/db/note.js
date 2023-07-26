import db from './index'

const CREATE_TABLE =
  'create table if not exists notes (id integer primary key not null, value text);'
const GET_ALL_NOTES = 'select * from notes'
const INSERT_NOTE = 'insert into notes (value) values (?)'

export function createTable() {
  db.transaction(tx => {
    tx.executeSql(CREATE_TABLE)
  })
}

export function getAllNotes() {
  db.transaction(tx => {
    tx.executeSql(GET_ALL_NOTES, null, (_, { rows: { _array } }) =>
      setData(_array)
    )
  })
}

export function addNewNote() {
  db.transaction(tx => {
    tx.executeSql(INSERT_NOTE, ['some random text'])
  })
}
