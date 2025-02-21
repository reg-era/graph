FROM golang:1.24.0
WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go get github.com/mattn/go-sqlite3

RUN go build -o server ./cmd/main.go

EXPOSE 8080

CMD ["./server"]