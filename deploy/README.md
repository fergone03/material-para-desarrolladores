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

## Desplegar

Automático en cada push a `main`: `.github/workflows/desplegar-vps.yml` llama por ssh a
`/usr/local/bin/desplegar material-para-desarrolladores`, que hace `git reset --hard origin/main`
y ejecuta [`desplegar-vps.sh`](desplegar-vps.sh) (`npm ci` + `npm run build`, con `.env.production.local`).
También se puede lanzar a mano desde la pestaña Actions o en el VPS con `desplegar material-para-desarrolladores`.

## Nueva migración

```sh
sudo -u postgres psql -d material_dev -1 -f db/migrations/<archivo>.sql
```
