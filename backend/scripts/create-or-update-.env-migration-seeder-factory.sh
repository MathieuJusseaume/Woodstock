#!/bin/bash

# Vérifie si le fichier .env existe
if [ -f .env ]; then
    # Vérifie et met à jour les valeurs existantes si elles sont présentes

    if grep -q 'DB_CONNECTION=mysql' .env && grep -q 'DB_HOST=127.0.0.1' .env && grep -q 'DB_DATABASE=laravel' .env && grep -q 'DB_USERNAME=root' .env && grep -q 'DB_PASSWORD=' .env; then

        sed -i 's/^DB_CONNECTION=mysql$/DB_CONNECTION=mysql/' .env
        sed -i 's/^DB_HOST=127.0.0.1$/DB_HOST=mysql/' .env
        sed -i 's/^DB_DATABASE=laravel$/DB_DATABASE=test/' .env
        sed -i 's/^DB_USERNAME=root$/DB_USERNAME=adrian/' .env
        sed -i 's/^DB_PASSWORD=$/DB_PASSWORD=secret/' .env
    
    echo "Les valeurs existantes ont été mises à jour dans le fichier .env avec succès !"
    else
        echo "Les valeurs ont déjà été modifiées par l'utilisateur !"
    fi
else
    # Le fichier .env n'existe pas, copiez .env.example et mettez à jour les valeurs
    if [ -f .env.example ]; then
        cp .env.example .env

        sed -i 's/DB_HOST=127.0.0.1/DB_HOST=mysql/' .env
        sed -i 's/DB_CONNECTION=mysql/DB_CONNECTION=mysql/' .env
        sed -i 's/DB_PORT=3306/DB_PORT=3306/' .env
        sed -i 's/DB_DATABASE=laravel/DB_DATABASE=test/' .env
        sed -i 's/DB_USERNAME=root/DB_USERNAME=adrian/' .env
        sed -i 's/DB_PASSWORD=/DB_PASSWORD=secret/' .env

        echo "Le fichier .env a été créé à partir de .env.example et mis à jour avec succès !"
    else
        echo "Erreur : Le fichier .env n'existe pas, et .env.example n'existe pas non plus."
        echo "Assurez-vous que vous avez un fichier .env.example ou créez-le à partir de .env.example."
        exit 1  # Quitte le script en cas d'erreur
    fi
fi

# Créez une migration
php artisan migrate:fresh

if [ $? -eq 0 ]; then
    echo "Les migrations ont été effectuées avec succès !"
else
    echo "Erreur lors de l'exécution des migrations."
    exit 1  # Quitte le script en cas d'erreur
fi

# Créez un seeder
php artisan db:seed --class=DatabaseSeeder

if [ $? -eq 0 ]; then
    echo "Les données ont correctement été importées en BDD ! Voir : http://192.168.1.15:9081/"
    echo "Adminer : http://192.168.1.15:9081/"
else
    echo "Erreur lors de l'importation des données en BDD."
fi