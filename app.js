const LAT = -44.7474;
const LON = -72.697;
const CIUDAD = "Puerto Cisnes";

function abrirSitport() {
  window.open('https://sitport.directemar.cl/#/restriccion', '_blank');
}

function abrirSituacionPortuaria() {
  window.open('https://situacionportuaria.cl/', '_blank');
}

function abrirClimaViento() {
  window.open(`https://www.windy.com/-45.000/-72.500?${LAT},${LON},10`, '_blank');
}

async function verificarEstadoPuertos() {
  const statusEls = document.querySelectorAll('.status-port');
  statusEls.forEach(el => {
    el.textContent = "VERIFICANDO...";
    el.className = "px-5 py-2 text-sm font-bold rounded-2xl bg-orange-500";
  });

  await new Promise(r => setTimeout(r, 1000));

  // Actualiza según lo que veas en SITPORT
  document.getElementById('status-cisnes').innerHTML = `ABIERTO <span class="text-xs">✔</span>`;
  document.getElementById('status-cisnes').className = "px-5 py-2 text-sm font-bold rounded-2xl bg-green-500";

  document.getElementById('status-chacabuco').innerHTML = `ABIERTO <span class="text-xs">✔</span>`;
  document.getElementById('status-chacabuco').className = "px-5 py-2 text-sm font-bold rounded-2xl bg-green-500";
}

async function obtenerClima() {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,wind_speed_10m,weather_code&timezone=America/Santiago`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    const temp = Math.round(data.current.temperature_2m);
    const viento = Math.round(data.current.wind_speed_10m);

    document.getElementById('clima-actual').innerHTML = `
      <div class="flex justify-between items-center">
        <div>
          <p class="text-7xl font-light">${temp}°C</p>
          <p class="text-2xl">${CIUDAD}, Aysén</p>
          <p class="text-gray-400 mt-1">Viento: ${viento} km/h</p>
        </div>
        <div class="text-8xl">🌧️</div>
      </div>
    `;
  } catch (e) {
    document.getElementById('clima-actual').innerHTML = `<p class="text-red-400">Error al cargar clima</p>`;
  }
}

function chequearPuertos() {
  const html = `
    <div class="flex items-center gap-3 mb-5">
      <span class="text-3xl">🚢</span>
      <h2 class="text-2xl font-semibold">Puertos Región de Aysén</h2>
    </div>
    
    <div class="space-y-3">
      <div class="flex justify-between items-center bg-zinc-800 p-4 rounded-2xl">
        <div><p class="font-medium">Puerto Cisnes</p><p class="text-xs text-gray-400">Capitanía local</p></div>
        <span id="status-cisnes" class="status-port px-5 py-2 text-sm font-bold rounded-2xl bg-orange-500">VERIFICANDO...</span>
      </div>

      <div class="flex justify-between items-center bg-zinc-800 p-4 rounded-2xl">
        <div><p class="font-medium">Puerto Chacabuco</p></div>
        <span id="status-chacabuco" class="status-port px-5 py-2 text-sm font-bold rounded-2xl bg-orange-500">VERIFICANDO...</span>
      </div>

      <div class="flex justify-between items-center bg-zinc-800 p-4 rounded-2xl">
        <div><p class="font-medium">Melinka</p></div>
        <span class="px-5 py-2 text-sm font-bold rounded-2xl bg-green-500">ABIERTO</span>
      </div>

      <div class="flex justify-between items-center bg-zinc-800 p-4 rounded-2xl">
        <div><p class="font-medium">Puerto Aguirre</p></div>
        <span class="px-5 py-2 text-sm font-bold rounded-2xl bg-green-500">ABIERTO</span>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-1 gap-3">
      <!-- Botón 1 -->
      <button onclick="abrirSitport()" 
              class="bg-blue-700 hover:bg-blue-800 py-4 rounded-2xl font-medium flex items-center justify-center gap-3 text-lg">
        📱 SITPORT Oficial
      </button>

      <!-- Botón 2 -->
      <button onclick="abrirSituacionPortuaria()" 
              class="bg-emerald-700 hover:bg-emerald-800 py-4 rounded-2xl font-medium flex items-center justify-center gap-3 text-lg">
        🌐 Situación Portuaria
      </button>

      <!-- Botón 3 -->
      <button onclick="abrirClimaViento()" 
              class="bg-purple-700 hover:bg-purple-800 py-4 rounded-2xl font-medium flex items-center justify-center gap-3 text-lg">
        🌬️ Viento y Pronóstico
      </button>
    </div>

    <p class="text-xs text-gray-500 text-center mt-5">
      Actualiza los estados manualmente según las páginas oficiales
    </p>
  `;

  document.getElementById('puertos').innerHTML = html;
  setTimeout(verificarEstadoPuertos, 600);
}

// Inicializar
obtenerClima();
chequearPuertos();

// Mapa
const map = L.map('mapa').setView([LAT, LON], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
L.marker([LAT, LON]).addTo(map).bindPopup(`<b>${CIUDAD}</b>`).openPopup();