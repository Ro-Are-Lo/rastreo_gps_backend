import { io } from "socket.io-client";

interface Conductor {
  id: number;
  nombre: string;
  token: string; // token JWT del conductor
  ubicacionBase: { lat: number; lng: number };
}

//Lista de conductores simulados
const conductores: Conductor[] = [
  {
    id: 1,
    nombre: "Carlos",
    token: "Bearer TOKEN_CONDUCTOR_1",
    ubicacionBase: { lat: -16.5, lng: -68.15 },
  },
  {
    id: 2,
    nombre: "Lucía",
    token: "Bearer TOKEN_CONDUCTOR_2",
    ubicacionBase: { lat: -16.51, lng: -68.14 },
  },
  {
    id: 3,
    nombre: "José",
    token: "Bearer TOKEN_CONDUCTOR_3",
    ubicacionBase: { lat: -16.52, lng: -68.13 },
  },
];

const BACKEND_SOCKET_URL = "http://localhost:3000"; // cambia si tu backend usa otro puerto

// Función para generar una ubicación aleatoria cercana
const randomUbicacion = (base: { lat: number; lng: number }) => ({
  lat: base.lat + (Math.random() - 0.5) * 0.002,
  lng: base.lng + (Math.random() - 0.5) * 0.002,
  velocidad: Math.floor(Math.random() * 60) + 20,
});

// Frases aleatorias para simular comunicación
const mensajesRadio = [
  "Solicitando cliente en la zona central.",
  "Dirigiéndome al aeropuerto.",
  "Cliente a bordo, en ruta.",
  "Atasco en la autopista, retraso de 5 minutos.",
  "Libre en la estación principal.",
];

// Inicializa la simulación de un conductor
const simularConductor = (conductor: Conductor) => {
  const socket = io(BACKEND_SOCKET_URL, {
    auth: { token: conductor.token },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log(`${conductor.nombre} conectado`);
  });

  socket.on("disconnect", () => {
    console.log(`${conductor.nombre} desconectado`);
  });

  // Enviar ubicación cada 5 segundos
  setInterval(() => {
    const ubicacion = randomUbicacion(conductor.ubicacionBase);
    socket.emit("ubicacion", ubicacion);
    console.log(`${conductor.nombre} envió ubicación:`, ubicacion);
  }, 5000);

  // Enviar mensaje aleatorio cada 15–30 segundos
  setInterval(() => {
    const mensaje =
      mensajesRadio[Math.floor(Math.random() * mensajesRadio.length)];
    socket.emit("mensaje_radio", { mensaje });
    console.log(`${conductor.nombre} dijo: "${mensaje}"`);
  }, Math.random() * 15000 + 15000);
};

//Iniciar todos los simuladores
conductores.forEach(simularConductor);



// COMANDO PARA EJECUTAR ESTE SIMULADOR:

// npx ts-node src/simuladores/conductores.sim.ts
