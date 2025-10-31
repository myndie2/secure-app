# Production complète

### Commande

```bash
sudo docker compose -f docker-compose.prod.yml up --build
```

---

### Accès aux services

* **Adminer :** [http://localhost:8081/](http://localhost:8081/)
* **Front :** [https://localhost:8080/](https://localhost:8080/)
* **Back :** [https://localhost:4000/api/public](https://localhost:4000/api/public)

---

### Penser à régénérer les certificats

```bash
cd backend
mkdir -p certs
mkcert -install
mkcert -key-file certs/localhost-key.pem -cert-file certs/localhost.pem localhost
```

---

# Développement local

### Commande

```bash
sudo docker compose -f docker-compose.dev.yml up -d
```

