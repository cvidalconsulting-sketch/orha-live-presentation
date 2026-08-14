# ORHA Live Presentation

Prototipo visual de las dos primeras escenas de la presentación financiera de
ORHA, conducida por la presentadora digital provisional Kairos.

## Ver la versión publicada

El repositorio incluye un flujo de GitHub Pages que publica automáticamente la
aplicación cuando se integran cambios en la rama `main`. El enlace queda visible
en **Actions → Publicar sitio de prueba** y en **Settings → Pages**.

La dirección tendrá este formato:

```text
https://<usuario-u-organización>.github.io/orha-live-presentation/
```

Para la primera publicación, en GitHub abre **Settings → Pages** y selecciona
**GitHub Actions** en la opción **Source**. Después ejecuta el flujo manualmente
desde **Actions → Publicar sitio de prueba → Run workflow**, o integra este cambio
en `main`. No hace falta instalar nada en la computadora.

## Ejecutar localmente (opcional)

```bash
python3 -m http.server 4173
```

Abre `http://localhost:4173`.
