FROM golang:1.24.0
WORKDIR /app

RUN go mod init graphQL

COPY . .

RUN go build -o server ./cmd/main.go

EXPOSE 8080

CMD ["./server"]