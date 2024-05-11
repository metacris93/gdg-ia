```sh
docker compose -f local.yml up -d
pip install faker
DEVS_COUNT=300 make generate-devs
docker exec -it consultant_matcher_local_django bash
docker exec -it consultant_matcher_local_postgres bash
python manage.py import_consultants_from_csv ./developers.csv
python manage.py import_clients_from_csv ./clients.csv
python manage.py add_embeddings_to_consultants
curl -vvvk "http://localhost:8001/api/consultants/1/" -H "Content-Type: application/json"
```

```sh
python manage.py reset_db
python manage.py migrate
docker exec -i <CONTAINER_ID> pg_restore --schema=public -U debug -Ox -d consultant_matcher < ./gdg.sql
```