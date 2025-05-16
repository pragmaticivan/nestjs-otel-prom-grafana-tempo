# Prometheus + Grafana + Tempo + Loki Observability Stack example

The actor service uses express.js.

The movie service uses fastify.

### Running

`docker-compose up --build`
### Viewing Traces
1. Make some data by visiting `http://localhost:5556/docs`
2. Make some data by visiting `http://localhost:5555/docs`
3. View data in grafana by visiting `http://localhost:3000`
