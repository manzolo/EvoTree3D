# EvoTree 3D — developer Makefile
# Local development & production preview run through Docker Compose.

COMPOSE ?= docker compose
DEV_PORT ?= 5173
PROD_PORT ?= 8080

.DEFAULT_GOAL := help
.PHONY: help up down build rebuild logs sh prod prod-down install dev clean

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

up: ## Start the dev server (Vite + HMR) detached, then print the URL
	$(COMPOSE) up -d dev
	@echo ""
	@echo "  \033[32m✓ EvoTree 3D (dev) avviato\033[0m"
	@echo "  → Servizio:  dev (Vite + HMR)"
	@echo "  → URL:       \033[36mhttp://localhost:$(DEV_PORT)\033[0m"
	@echo "  → Log:       make logs   ·  Stop: make down"
	@echo ""

up-fg: ## Start the dev server in the foreground (logs attached)
	$(COMPOSE) up dev

down: ## Stop and remove all containers
	$(COMPOSE) down

build: ## Build the dev Docker image
	$(COMPOSE) build dev

rebuild: ## Rebuild the dev image without cache
	$(COMPOSE) build --no-cache dev

logs: ## Tail logs of the dev container
	$(COMPOSE) logs -f dev

sh: ## Open a shell inside the dev container
	$(COMPOSE) run --rm dev sh

prod: ## Build & serve the production bundle via nginx (detached), then print the URL
	$(COMPOSE) up -d --build prod
	@echo ""
	@echo "  \033[32m✓ EvoTree 3D (prod) avviato\033[0m"
	@echo "  → Servizio:  prod (nginx, bundle statico)"
	@echo "  → URL:       \033[36mhttp://localhost:$(PROD_PORT)\033[0m"
	@echo "  → Stop:      make prod-down"
	@echo ""

prod-down: ## Stop the production container
	$(COMPOSE) down

clean: ## Remove build artifacts and node_modules volume
	$(COMPOSE) down -v
	rm -rf dist

# --- Non-Docker fallbacks (require local Node 18+) ---
install: ## Install dependencies locally (npm)
	npm install

dev: ## Run Vite locally without Docker
	npm run dev
