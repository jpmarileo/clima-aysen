// Coordenadas aproximadas de Coyhaique (Aysén)
const LAT = -45.5714;
const LON = -72.0684;

async function obtenerClima() {
  // Open-Meteo (sin key, excelente para Chile)
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,wind_speed_10m,weather_code&hourly=temperature_2m,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America/Santiago`;
  
  const res = await fetch(url);
  const data = await res.json();
  
  // Render clima actual...
  document.getElementById('clima-actual').innerHTML = `
    <div class="flex justify-between items-center">
      <div>
        <p class="text-6xl font-light">${Math.round(data.current.temperature_2m)}°C</p>
        <p class="text-xl">Coyhaique / Aysén</p>
      </div>
      <div class="text-7xl">🌧️</div>
    </div>
  `;
  
  // Pronóstico (simple)
  // ... (puedes expandir con Chart.js)
}

async function chequearPuertos() {
  // Ejemplo: fetch a sitio público (puede necesitar proxy si CORS falla)
  // Alternativa: mostrar info estática + botón para abrir https://situacionportuaria.cl/
  const puertosHTML = `
    <div class="space-y-3">
      <div class="flex justify-between bg-gray-800 p-3 rounded-xl">
        <span>Puerto Chacabuco</span>
        <span class="text-green-400 font-bold">ABIERTO</span>
      </div>
      <!-- Más puertos... -->
      <p class="text-sm text-gray-400">Datos de <a href="https://situacionportuaria.cl/" target="_blank" class="underline">situacionportuaria.cl</a></p>
    </div>
  `;
  document.getElementById('lista-puertos').innerHTML = puertosHTML;
}

// Inicializar
obtenerClima();
chequearPuertos();

// Mapa Leaflet
const map = L.map('mapa').setView([LAT, LON], 8);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
L.marker([LAT, LON]).addTo(map).bindPopup('Coyhaique - Aysén');
