include .env

run: clean build
	@ADMIN=$(ADMIN) DOMAIN=$(DOMAIN) PORT=$(PORT) ./graphServer

build:
	go build -o graphServer cmd/main.go

clean:
	rm -f graphServer
