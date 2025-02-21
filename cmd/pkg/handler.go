package pkg

import (
	"encoding/json"
	"log"
	"net/http"
)

func MiddleWar(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "https://reg-era.github.io http://127.0.0.1:5500")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		if r.Method != http.MethodPost {
			http.Error(w, "Methode not allowed -_-", http.StatusMethodNotAllowed)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func GetThirdToken(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Something wrong happen *_*", http.StatusInternalServerError)
		return
	}

	token := NewToken(user.HashData())
	if token.GetToken() != nil || token.PingToken() != nil {
		http.Error(w, "user not found :|", http.StatusNotFound)
		return
	}

	data, err := json.Marshal(token)
	if err != nil {
		http.Error(w, "Something wrong happen *_*", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write(data)
	if err != nil {
		log.Printf("sending token error: %v\n", err)
	}
}

func CheckValidToken(w http.ResponseWriter, r *http.Request) {
	var token Token

	if err := json.NewDecoder(r.Body).Decode(&token); err != nil {
		http.Error(w, "user non unauthorized :?", http.StatusUnauthorized)
		return
	}

	if token.PingToken() != nil {
		http.Error(w, "user not found :|", http.StatusNotFound)
		return
	}
}
