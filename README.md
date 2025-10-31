Production complète:

Commande: 
sudo docker compose -f docker-compose.prod.yml up --build

Adminer:
http://localhost:8081/

Front:
https://localhost:8080/

Back:
https://localhost:4000/api/public


Penser à regénéger les certificats:
cd backend
mkdir -p certs
mkcert -install
mkcert -key-file certs/localhost-key.pem -cert-file certs/localhost.pem localhost


Développement local:

Commande:
sudo docker compose -f docker-compose.dev.yml up -d

