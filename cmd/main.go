package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
)

func main() {
	jwt := os.Getenv("JWT")
	address := os.Getenv("DOMAIN")
	if jwt == "" || address == "" {
		log.Fatal("Set the environment variable")
	}

	router := http.NewServeMux()

	router.HandleFunc("/assets/", func(w http.ResponseWriter, r *http.Request) {
		if strings.HasSuffix(r.URL.Path, "/") {
			fmt.Println("returned")
			return
		}
		fs := http.FileServer(http.Dir("web/assets/"))
		http.StripPrefix("/assets/", fs).ServeHTTP(w, r)
	})

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.SetCookie(w, &http.Cookie{
			Name:  "credential",
			Value: jwt,
			Path:  "/",
			// SameSite: http.SameSiteStrictMode,
		})

		http.ServeFile(w, r, "./web/index.html")
	})

	fmt.Println("Server is running on http://" + address)
	log.Fatalln(http.ListenAndServe(address, router))
}
