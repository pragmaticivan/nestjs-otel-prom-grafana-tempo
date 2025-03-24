#!/bin/bash

echo "🚀 Stopping all running Docker containers..."
docker stop $(docker ps -aq)

echo "🗑️ Removing all Docker containers..."
docker rm $(docker ps -aq)

echo "📦 Removing all Docker images..."
docker rmi -f $(docker images -aq)

echo "🌐 Removing all Docker networks (except default)..."
docker network prune -f

echo "📂 Removing all Docker volumes..."
docker volume prune -f

echo "🧹 Removing all unused Docker build cache..."
docker builder prune -a -f

echo "✅ Docker cleanup complete!"
