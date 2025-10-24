# 💱 Conversor Universal

Aplicación web moderna y completa para convertir monedas y unidades de medida con interfaz intuitiva, modo oscuro y historial de conversiones.

![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-purple?logo=bootstrap)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Características Principales

### 💰 Conversor de Monedas
- ✅ **12 monedas populares** con banderas y nombres completos
- 🔄 **Conversión en tiempo real** usando ExchangeRate.host API
- 🔁 **Botón de intercambio** para invertir las monedas rápidamente
- 📊 **Muestra la tasa de cambio** actual entre las monedas
- 🌐 **Sin necesidad de registro ni API key**

**Monedas disponibles:**
- 🇺🇸 USD - Dólar Estadounidense
- 🇪🇺 EUR - Euro
- 🇬🇧 GBP - Libra Esterlina
- 🇯🇵 JPY - Yen Japonés
- 🇲🇽 MXN - Peso Mexicano
- 🇨🇦 CAD - Dólar Canadiense
- 🇦🇺 AUD - Dólar Australiano
- 🇨🇭 CHF - Franco Suizo
- 🇨🇳 CNY - Yuan Chino
- 🇮🇳 INR - Rupia India
- 🇧🇷 BRL - Real Brasileño
- 🇦🇷 ARS - Peso Argentino

### 📏 Conversor de Unidades
Convierte entre diferentes sistemas de medida:

**Longitud** 📐
- Metros, Kilómetros, Centímetros, Milímetros
- Pies, Pulgadas

**Peso** ⚖️
- Kilogramos, Gramos
- Libras, Onzas

**Temperatura** 🌡️
- Celsius (°C)
- Fahrenheit (°F)
- Kelvin (K)

**Volumen** 🧪
- Litros, Mililitros
- Galones, Onzas líquidas

### 📜 Historial de Conversiones
- 💾 **Guarda automáticamente** las últimas 20 conversiones
- 🕐 **Marca de tiempo** en cada conversión
- 🗑️ **Eliminar conversiones** individuales o limpiar todo
- 💻 **Almacenamiento local** usando localStorage
- 🔍 **Diferencia visual** entre conversiones de moneda y unidades

### 🎨 Modo Oscuro
- 🌙 **Toggle dark/light** con un clic
- 💾 **Guarda tu preferencia** en localStorage
- 🎭 **Transiciones suaves** entre temas
- 👁️ **Colores optimizados** para reducir fatiga visual

### ✨ Características Adicionales
- 📱 **Diseño responsive** - funciona en móvil, tablet y desktop
- ⚡ **Carga instantánea** con spinner animado
- 🎯 **Interfaz intuitiva** con Bootstrap 5
- 🎨 **Animaciones suaves** y efectos hover
- ⚠️ **Manejo de errores** con valores de respaldo
- 🔢 **Actualización automática** al cambiar valores

## 🚀 Instalación y Uso

### Opción 1: Uso Directo
1. **Descarga** el archivo `index.html`
2. **Abre** el archivo en tu navegador favorito
3. ¡Listo! No requiere instalación ni configuración

### Opción 2: Servidor Local
```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/conversor-universal.git

# Navega al directorio
cd conversor-universal

# Abre con un servidor local (Python 3)
python -m http.server 8000

# O con Node.js (npx)
npx serve

# Visita http://localhost:8000
```

## 📖 Cómo Usar

### Convertir Monedas
1. Ve a la pestaña **"Monedas"**
2. Ingresa la cantidad a convertir
3. Selecciona la moneda de origen
4. Selecciona la moneda de destino
5. ¡El resultado se calcula automáticamente!

**Tip:** Usa el botón 🔄 para intercambiar las monedas rápidamente.

### Convertir Unidades
1. Ve a la pestaña **"Unidades"**
2. Selecciona el tipo de unidad (longitud, peso, temperatura, volumen)
3. Ingresa el valor a convertir
4. Selecciona las unidades de origen y destino
5. ¡Resultado instantáneo!

### Ver Historial
1. Ve a la pestaña **"Historial"**
2. Visualiza todas tus conversiones recientes
3. Elimina conversiones individuales con ❌
4. Limpia todo el historial con el botón "Limpiar"

### Cambiar Tema
- Haz clic en el botón 🌙/☀️ en la esquina superior derecha
- Tu preferencia se guarda automáticamente

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS
- **JavaScript ES6+** - Lógica y funcionalidad
- **Bootstrap 5.3.2** - Framework CSS responsive
- **Font Awesome 6.4.2** - Iconos vectoriales
- **ExchangeRate.host API** - Tasas de cambio en tiempo real
- **localStorage** - Persistencia de datos local

## 🔧 Características Técnicas

### API de Tasas de Cambio
```javascript
// Endpoint utilizado (sin autenticación)
https://api.exchangerate.host/latest?base=USD

// Respuesta
{
  "success": true,
  "rates": {
    "EUR": 0.92,
    "GBP": 0.79,
    "MXN": 17.20,
    ...
  }
}
```

### Almacenamiento Local
```javascript
// Estructura del historial
[
  {
    "type": "currency",
    "conversion": "100 MXN → 5.81 USD",
    "timestamp": "24/10/2025 14:30:45"
  }
]
```

### Conversión de Unidades
- **Sistemas lineales** (longitud, peso, volumen): conversión mediante factores
- **Temperatura**: fórmulas específicas para cada conversión
- **Precisión**: 2 decimales en todos los resultados



## 🎨 Personalización

### Cambiar Colores del Tema
Edita las variables CSS en el archivo:

```css
:root {
  --bg-gradient-start: #2c3e50;
  --bg-gradient-end: #3498db;
  --card-bg: rgba(255, 255, 255, 0.95);
}

[data-theme="dark"] {
  --bg-gradient-start: #1a1a2e;
  --bg-gradient-end: #16213e;
  --card-bg: rgba(30, 30, 46, 0.95);
}
```

### Agregar Más Monedas
1. Añade la opción en los `<select>` de monedas:
```html
<option value="COP">🇨🇴 COP - Peso Colombiano</option>
```

2. La API devuelve automáticamente la tasa para la nueva moneda

### Agregar Más Unidades
Edita el objeto `unitConversions`:
```javascript
unitConversions.length.mi = { 
  name: 'Millas', 
  factor: 0.000621371 
};
```

## 🐛 Solución de Problemas

### Las tasas no se actualizan
- Verifica tu conexión a internet
- La aplicación usa valores de respaldo si falla la API
- Las tasas se actualizan cada vez que abres la app

### El historial no se guarda
- Verifica que tu navegador permita localStorage
- Algunos navegadores en modo incógnito bloquean localStorage
- Limpia la caché del navegador

### Modo oscuro no persiste
- Asegúrate que localStorage esté habilitado
- Algunos navegadores antiguos no soportan esta función


## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.

```
MIT License

Copyright (c) 2025 Conversor Universal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```


## 🙏 Agradecimientos

- **ExchangeRate.host** - Por proporcionar la API gratuita de tasas de cambio
- **Bootstrap Team** - Por el increíble framework CSS
- **Font Awesome** - Por los iconos vectoriales
- **Comunidad Open Source** - Por la inspiración y apoyo

---


[Demo en Vivo](https://tu-demo.com) | [Reportar Bug](https://github.com/tu-usuario/issues) | [Solicitar Feature](https://github.com/tu-usuario/issues)

</div>
