include .env

run:
	@JWT=$(JWT) DOMAIN=$(DOMAIN) go run cmd/main.go

build:
	go build -o graphServer cmd/main.go

clean:
	rm -f graphServer
