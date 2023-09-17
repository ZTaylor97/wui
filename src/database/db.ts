import mariadb from "mariadb";

const pool = mariadb.createPool({user:'prod',password:'admin',database:'prod',connectionLimit:5
});