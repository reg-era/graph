package pkg

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

func MiddleWar(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
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
	if r.URL.Path != "/" {
		http.Error(w, "Page not found :|", http.StatusNotFound)
		return
	}

	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Something wrong happen *_*", http.StatusInternalServerError)
		return
	}

	var token *Token = nil
	token = NewToken(user.HashData())
	if token.GetToken() != nil || token.PingToken() != nil {
		http.Error(w, "user not found :|", http.StatusNotFound)
		return
	}

	cookie := &http.Cookie{
		Name:    "test",
		Value:   token.Jwt,
		Expires: time.Now().Add(5 * time.Hour),
		Path:    "/",

		// SameSite:    http.SameSiteNoneMode,
		// Partitioned: true,
	}

	http.SetCookie(w, cookie)
	log.Println("Set-Cookie header: ", w.Header().Get("Set-Cookie"))
}

func CheckValidToken(w http.ResponseWriter, r *http.Request) {
	var token Token

	if err := json.NewDecoder(r.Body).Decode(&token); err != nil {
		http.Error(w, "Something wrong happen *_*", http.StatusInternalServerError)
		return
	}

	if token.PingToken() != nil {
		http.Error(w, "user not found :|", http.StatusNotFound)
		return
	}

	w.WriteHeader(200)
}
