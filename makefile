include .env

IMAGE_NAME = server
CONTAINER_NAME = server-container
PORT = 8080

run: clean build
	@echo "Running the application..."
	@./graphServer

clean:
	@echo "Cleaning up..."
	@rm -f graphServer

build:
	@echo "Building the Go binary..."
	@go build -o graphServer cmd/main.go

docker-run: clean build
	@echo "Running the application with Docker..."
	docker run -d -p $(PORT):$(PORT) --env ADMIN=$(ADMIN) --env DOMAIN=$(DOMAIN) --name $(CONTAINER_NAME) $(IMAGE_NAME)

docker-build: build
	@echo "Building the Docker image..."
	docker build -t $(IMAGE_NAME) .

docker-stop:
	@echo "Stopping and removing the container..."
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

docker-rm:
	@echo "Removing the Docker image..."
	docker rmi $(IMAGE_NAME) || true
