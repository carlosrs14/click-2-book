#!/bin/bash
set -e

if [ ! -f "vendor/autoload.php" ]; then
    echo "Installing composer dependencies..."
    composer install --no-interaction
fi

if [ -z "$APP_KEY" ]; then
    echo "Generating APP_KEY..."
    php artisan key:generate --force
fi

if [ -z "$JWT_SECRET" ]; then
    echo "Generating JWT_SECRET..."
    php artisan jwt:secret --force || true
fi

# Wait for database
echo "Waiting for database to be ready..."
sleep 5

# Run migrations and seed
echo "Running migrations..."
php artisan migrate --force

echo "Starting server..."
php artisan serve --host=0.0.0.0 --port=8000
