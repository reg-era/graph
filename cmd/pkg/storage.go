package pkg

import (
	"database/sql"
	"time"
)

const db_Model = `
	CREATE TABLE IF NOT EXISTS session (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    value TEXT NOT NULL,
    age   INTEGER NOT NULL
)`

var _data *sql.DB

func NewDB() error {
	conn, err := sql.Open("sqlite3", "cmd/data/data.db")
	if err != nil {
		return err
	}

	if _, err := conn.Exec(db_Model); err != nil {
		return err
	}

	_data = conn
	return nil
}

func InsertNewSession(value string, age int) error {
	_, err := _data.Exec(`INSERT INTO session (value, age) VALUES (?, ?)`, value, age)
	if err != nil {
		return err
	}
	return nil
}

func CheckValidSession(value string) (bool, error) {
	currentTime := time.Now().Unix()

	var age int
	err := _data.QueryRow(`SELECT age FROM session WHERE value = ? AND age > ?`, value, currentTime).Scan(&age)
	if err != nil {
		if err == sql.ErrNoRows {
			return false, nil
		}
		return false, err
	}

	return true, nil
}
