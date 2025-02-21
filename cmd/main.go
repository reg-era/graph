package main

import (
	"log"
	"net/http"
	"os"

	pkg "graphQL/cmd/pkg"
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

	router.Handle("/", pkg.MiddleWar(http.HandlerFunc(pkg.GetThirdToken)))
	router.Handle("/check", pkg.MiddleWar(http.HandlerFunc(pkg.CheckValidToken)))

	log.Printf("Server is running on http://%s:%s\n", address, port)
	log.Fatalln(http.ListenAndServe(address+":"+port, router))
}
