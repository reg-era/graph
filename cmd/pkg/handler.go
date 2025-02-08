package jwt

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func MiddleWar(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Credentials", "true") // Add this
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}


func GetThirdToken(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		w.WriteHeader(500)
		return
	}
	token := NewToken(user.HashData())

	if token.GetToken() != nil || token.PingToken() != nil {
		w.WriteHeader(404)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	data, err := json.Marshal(token)
	if err != nil {
		w.WriteHeader(500)
		return
	}

	w.Write(data)
}

func CheckValidToken(w http.ResponseWriter, r *http.Request) {
	var token Token
	if err := json.NewDecoder(r.Body).Decode(&token); err != nil {
		w.WriteHeader(500)
		return
	}
	fmt.Println(token.Jwt)
	if token.PingToken() != nil {
		w.WriteHeader(404)
		return
	}

	w.WriteHeader(200)
}
