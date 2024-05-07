```sh
docker compose -f local.yml up -d
pip install faker
DEVS_COUNT=300 make generate-devs
docker exec -it consultant_matcher_local_django bash
python manage.py import_consultants_from_csv ./developers.csv
curl -vvvk "http://localhost:8001/api/consultants/1/" -H "Content-Type: application/json"
```