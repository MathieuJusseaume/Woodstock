#!/bin/bash

# Créez une migration
php artisan migrate:fresh

# Créez un seeder

php artisan db:seed --class=CompanySeeder
php artisan db:seed --class=RoleSeeder
php artisan db:seed --class=UserSeeder
php artisan db:seed --class=ClientSeeder
php artisan db:seed --class=OrderSeeder


# Créez une factory
php artisan make:factory TableNameFactory