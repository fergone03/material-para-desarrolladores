# Despliegue en el VPS

Se sirve en `https://consultorialocal.es/material-para-desarrolladores/`, dentro del sitio nginx `ctl`.

| Pieza | Dónde vive en el VPS | Copia aquí |
|---|---|---|
| Frontend (build de Vite) | `/var/www/ctl/material-para-desarrolladores/dist` | — |
| Auth (GoTrue, `127.0.0.1:9999`) | `/etc/systemd/system/material-para-desarrolladores-auth.service` | `material-para-desarrolladores-auth.service` |
| API (PostgREST, `127.0.0.1:3000`) | `/etc/systemd/system/material-para-desarrolladores-rest.service` | `material-para-desarrolladores-rest.service` |
| Rutas nginx | bloque dentro de `/etc/nginx/sites-available/ctl` | `nginx-material-para-desarrolladores.conf` |
| Config de auth | `/etc/material-para-desarrolladores/auth.env` | `auth.env.example` |
| Config de la API | `/etc/material-para-desarrolladores/postgrest.conf` | `postgrest.conf.example` |
| Secretos (JWT, claves, contraseñas) | `/etc/material-para-desarrolladores/secrets.env` | nunca en git |
| Base de datos | Postgres 16 local, base `material_dev` | esquema en `db/migrations/` |

Binarios: `/opt/material-para-desarrolladores/bin/{auth,postgrest}` (GoTrue v2.197.0, PostgREST v16.3).

## Actualizar el frontend

```sh
cd /var/www/ctl/material-para-desarrolladores
git pull --ff-only
npm ci && npm run build   # usa .env.production.local (VITE_API_URL, VITE_API_KEY, VITE_BASE_PATH)
```

## Nueva migración

```sh
sudo -u postgres psql -d material_dev -1 -f db/migrations/<archivo>.sql
```
