FROM golang:1.24 as builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o server ./cmd/main.go

FROM alpine:latest

WORKDIR /app
ENV PORT=8080

COPY --from=builder /app/server .

EXPOSE ${PORT}
CMD ["./server"]
