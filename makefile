help: 
	@echo "kc : Run keycloak container"
	@echo "kcstop : Stop keycloak container"
kc:
	cd keycloak && docker-compose up -d
kcstop:
	cd keycloak && docker-compose stop
dev:
	cd frontend && npm run dev
kclogs:
	docker logs KeycloakTest -f