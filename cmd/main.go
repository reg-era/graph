package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	jwt "graphQL/cmd/pkg"
)

func main() {
	address := os.Getenv("DOMAIN")
	if address == "" {
		address = "0.0.0.0"
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	router := http.NewServeMux()

	router.Handle("/", jwt.MiddleWar(http.HandlerFunc(jwt.GetThirdToken)))
	router.Handle("/check", jwt.MiddleWar(http.HandlerFunc(jwt.CheckValidToken)))

	fmt.Printf("Server is running on http://%s:%s\n", address, port)
	log.Fatalln(http.ListenAndServe(address+":"+port, router))
}
