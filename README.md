# Click-2-Book

Sistema de agendamiento de pensiones (reserva por día, semana o mes) con un diseño moderno.

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) y Docker Compose

## Inicialización

1. Clona el repositorio.
2. Construye y levanta los servicios con Docker:

```bash
docker compose up -d --build
```

Esto levantará 3 contenedores:
- **db**: PostgreSQL (puerto 5432 interno).
- **backend**: API en Laravel (puerto 8000).
- **frontend**: Aplicación Angular (puerto 80).

## Accesos

- **Frontend:** [http://localhost](http://localhost)
- **Backend API:** [http://localhost:8000/api](http://localhost:8000/api)
