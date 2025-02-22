FROM golang:1.24.0 AS builder
WORKDIR /app

RUN go mod init graphQL
COPY ./cmd ./cmd

RUN go mod tidy

RUN go build -o server ./cmd/main.go

FROM alpine:latest
WORKDIR /root/

RUN apk add --no-cache libc6-compat
COPY --from=builder /app/server ./

EXPOSE 8080

CMD ["./server"]
