help: 
	@echo "kc : Run keycloak container"
	@echo "kcstop : Stop keycloak container"
kc:
	cd keycloak && docker-compose up -d
kcstop:
	cd keycloak && docker-compose stop
