# 🧠 Memoria Neón

Juego de memoria secuencial con estética neón. Observá cómo se iluminan los cuatro colores y repetí la secuencia completa, en orden. Cada ronda agrega un paso y aumenta la dificultad.

**Versión:** v1.0.0 · **Autor:** Nexar Sistemas

## Características

- Cuatro botones de colores con sonidos propios.
- Secuencias progresivas y reproducción más rápida.
- Controles táctiles para celulares y soporte de teclado.
- Récord y contador de aciertos.
- Sonido opcional; datos guardados localmente.
- Preparado como PWA para jugar sin conexión luego de su primera carga.

## Jugar

Una vez habilitado GitHub Pages en la rama `main`, carpeta `/ (root)`, la URL prevista es:

https://nexarsistemas.github.io/memoria-neon/

También se puede abrir `index.html` directamente para probar el juego, pero la instalación PWA requiere HTTPS o localhost.

Para pruebas locales de PWA:

```bash
python3 -m http.server 8000
```

Abrí `http://localhost:8000` en el navegador.

## Privacidad

El récord y la configuración de sonido se almacenan mediante `localStorage` en el navegador. No hay cuentas, servidor ni sincronización; borrar los datos del sitio puede eliminar el récord.

## Estado y versión

El MVP **v1.0.0** está preparado para publicación. La instalación PWA y el modo sin conexión requieren pruebas en Android después de habilitar GitHub Pages. El versionado sigue SemVer; los cambios posteriores se registran en [CHANGELOG.md](CHANGELOG.md).

## Licencia

MIT © 2026 Nexar Sistemas. Ver [LICENSE](LICENSE).
