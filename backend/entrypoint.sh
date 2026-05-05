#!/bin/bash
set -e

# Install composer dependencies if vendor directory doesn't exist
if [ ! -d "vendor" ]; then
    echo "Installing composer dependencies..."
    composer install --no-interaction
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    php artisan key:generate
    # We might need jwt secret
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
