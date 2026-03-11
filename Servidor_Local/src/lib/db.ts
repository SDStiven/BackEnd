import mysql from 'mysql2/promise';
const db =mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Servidor-Local',
    database:'Servidor_local'
})

export default db
