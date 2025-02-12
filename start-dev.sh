started_at=$(date +"%s")

echo "-----> Provisioning containers"
docker compose --file docker-compose-dev.yaml up
echo ""

echo "-----> Running application migrations"
docker exec -it exam-project-server-dev-1 sequelize db:migrate
echo ""

echo "-----> Running application seeds"
docker exec -it exam-project-server-dev-1 sequelize db:seed:all
echo "<----- Seeds created"

ended_at=$(date +"%s")

minutes=$(((ended_at - started_at) / 60))
seconds=$(((ended_at - started_at) % 60))

echo "-----> Done in ${minutes}m${seconds}s"
