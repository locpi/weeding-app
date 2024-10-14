docker compose pull
docker compose down frontend
docker compose down backend
docker compose --env-file .env up -d