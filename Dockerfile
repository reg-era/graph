FROM golang:1.24.0 AS builder
WORKDIR /app

RUN go mod init graphQL
COPY ./cmd ./cmd

RUN go mod tidy

RUN go build -o server ./cmd/main.go

FROM busybox:latest
WORKDIR /root/

COPY --from=builder /app/server ./

EXPOSE 8080

CMD ["./server"]
