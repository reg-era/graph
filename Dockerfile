FROM golang:1.24 as builder

WORKDIR /app

RUN go mod init graphQL

COPY . .
RUN go build -o server ./cmd/main.go

FROM alpine:latest

WORKDIR /app
ENV PORT=8080

COPY --from=builder /app/server .

EXPOSE 8080

CMD ["./server"]
