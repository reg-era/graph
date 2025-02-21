include .env

IMAGE_NAME = server
CONTAINER_NAME = server-container

run:
	@echo "Running the application..."
	@PORT=$(PORT) DOMAIN=$(DOMAIN) go run cmd/main.go

docker-run:
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

deploy-build:
	@echo "Building server..."
	go build -o server cmd/main.go

deploy-run:
	@echo "Running server..."
	./server