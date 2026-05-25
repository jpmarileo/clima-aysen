<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clima Aysén + Puertos</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body class="bg-gray-950 text-white min-h-screen">
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-3">
      🌧️ Clima Aysén XI Región
    </h1>
    
    <!-- Clima -->
    <div id="clima-actual" class="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl p-8 mb-6 shadow-2xl"></div>
    
    <!-- Puertos -->
    <div id="puertos" class="bg-zinc-900 rounded-3xl p-6 mb-6"></div>
    
    <!-- Mapa -->
    <div id="mapa" class="h-80 rounded-3xl overflow-hidden shadow-2xl"></div>
  </div>

  <script src="app.js"></script>
</body>
</html>