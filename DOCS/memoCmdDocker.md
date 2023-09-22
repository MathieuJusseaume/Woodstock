**Procédure**  
=> s'assurer d'avoir docker installé & à jour  
=> lancer une seule fois `docker compose up --build -d` depuis la racine du projet  
=> lancer `docker compose up`  
=> http://localhost:9081 pour accéder à adminer  
=> http://localhost:8080 pour accéder à laravel  
=> http://localhost:8082 pour accéder à vue js  

=> lancer `docker compose exec backend zsh` pour accéder au container laravel

**En cas de pépin:**  
=> lancer `sudo docker system prune -a` pour supprimer tous les containers & images  
=> pour relancer docker `sudo systemctl restart docker.socket docker.service`  
=> libérer les droit dans un dossier se placer dans le dossier & lancer `sudo chmod -R 777 .`  
=> connaitre les ports écoutés `sudo lsof -i -P -n | grep LISTEN`  
=> forcé l'arret de l'écoute sur un port `sudo kill -9 `sudo lsof -t -i:<numéro du port>`  


**BDD:**  

Mise en place de la BDD : 

Terminal : 
docker compose exec backend zsh 
scripts/create-or-update-.env-migration-seeder-factory.sh