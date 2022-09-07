setup:
	npm i

tests:
	npm run test

up:
	docker-compose up -d --build

stop:
	docker-compose stop

down:
	docker-compose down