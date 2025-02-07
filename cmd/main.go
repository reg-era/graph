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
		log.Fatal("Set the environment variable")
	}

	router := http.NewServeMux()

	router.Handle("/", jwt.MiddleWar(http.HandlerFunc(jwt.GetThirdToken)))
	router.Handle("/check", jwt.MiddleWar(http.HandlerFunc(jwt.CheckValidToken)))

	fmt.Println("Server is running on http://" + address)
	log.Fatalln(http.ListenAndServe(address, router))
}
