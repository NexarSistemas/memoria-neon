# 🧠 Memoria Neón

Juego de memoria secuencial con estética neón. Observá cómo se iluminan los colores y repetí la secuencia completa, en orden. Cada ronda agrega un paso y aumenta la velocidad.

**Versión:** v1.1.0 · **Autor:** Nexar Sistemas

## Características

- Cuatro, cinco o seis botones de colores con sonidos propios.
- Secuencias progresivas y reproducción más rápida.
- Fácil (4 botones), medio (5) y difícil (6), con récords independientes y la misma progresión de velocidad. Medio conserva el récord anterior.
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

Los récords por dificultad y la configuración de sonido se almacenan mediante `localStorage` en el navegador. No hay cuentas, servidor ni sincronización; borrar los datos del sitio puede eliminar los récords.

## Estado y versión

La instalación PWA y el modo sin conexión requieren pruebas en Android. El versionado sigue SemVer; los cambios se registran en [CHANGELOG.md](CHANGELOG.md).

## Licencia

MIT © 2026 Nexar Sistemas. Ver [LICENSE](LICENSE).
