/*
Configuración técnica (sockets, middlewares, servidor)

Aquí va todo lo técnico que no pertenece a la lógica del negocio, como:

Socket.io

Middlewares

Inicialización del servidor

Seguridad, logging, etc.



import { Server } from 'socket.io';

export const initSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log(`🟢 Nuevo conductor conectado: ${socket.id}`);

    // Evento que recibe la ubicación del conductor
    socket.on('driver:location', (data) => {
      console.log('Ubicación recibida:', data);
      io.emit('admin:update-location', data); // reenvía a los admins conectados
    });

    socket.on('disconnect', () => {
      console.log(`🔴 Conductor desconectado: ${socket.id}`);
    });
  });
};
*/