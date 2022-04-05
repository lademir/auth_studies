make:
	docker-compose up
d:
	docker-compose up -d
reset:
	docker-compose stop && docker-compose up -d
stop:
	docker-compose stop