include .env

IMAGE_NAME = server
CONTAINER_NAME = server-container

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
	@echo "Building the Docker image..."
	docker build -t $(IMAGE_NAME) .

	@echo "Running the application with Docker..."
	docker run -d -p $(PORT):$(PORT) --name $(CONTAINER_NAME) $(IMAGE_NAME)


docker-clean:
	@echo "Stopping and removing the container..."
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

	@echo "Removing the Docker image..."
	docker rmi $(IMAGE_NAME) || true
