import { Server } from 'socket.io';
import prisma from '../prisma/client';
import { verifyToken } from '../utils/jwt';
import { initVoiceChannel } from './vozChannel';

interface UbicacionPayload {
  lat: number;
  lng: number;
  velocidad?: number;
}

interface RadioMensaje {
  to?: number; // id del destinatario
  mensaje: string;
}

const connectedUsers = new Map<number, string>(); // usuarioId -> socketId

export const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173'], // tu frontend
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  /** Middleware global de autenticación */
  io.use((socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers?.authorization?.replace('Bearer ', '');

      if (!token) throw new Error('Token no proporcionado');

      const user = verifyToken(token);
      (socket as any).user = user;
      next();
    } catch (err) {
      next(new Error('Autenticación fallida'));
    }
  });

  /** 👥 Evento de conexión */
  io.on('connection', (socket) => {
    const user = (socket as any).user;
    connectedUsers.set(user.id, socket.id);

    console.log(`Usuario conectado: ${user.username} (${user.role})`);

    /**
     * Evento: Recibir ubicación
     * - Se guarda en la BD (para auditoría)
     * - Se notifica a los administradores y operadores
     */
    socket.on('ubicacion', async (data: UbicacionPayload) => {
      try {
        const ubicacion = await prisma.ubicacion.create({
          data: {
            latitud: data.lat,
            longitud: data.lng,
            velocidad: data.velocidad ?? 0,
            usuarioId: user.id,
          },
        });

        // Enviar actualización solo a roles específicos
        io.sockets.sockets.forEach((s) => {
          const u = (s as any).user;
          if (u && ['admin', 'operador'].includes(u.role)) {
            s.emit('ubicacion_actualizada', {
              usuario: user.username,
              lat: data.lat,
              lng: data.lng,
              velocidad: data.velocidad,
              timestamp: ubicacion.createdAt,
            });
          }
        });
      } catch (error) {
        console.error(' Error al guardar ubicación:', error);
      }
    });

    /**
     * Evento: Comunicación tipo radio
     * - Puede ser mensaje global o directo
     */
    socket.on('mensaje_radio', (data: RadioMensaje) => {
      const { to, mensaje } = data;

      if (!mensaje?.trim()) return;

      if (to) {
        // Mensaje directo
        const receptorSocketId = connectedUsers.get(to);
        if (receptorSocketId) {
          io.to(receptorSocketId).emit('mensaje_radio', {
            de: user.username,
            mensaje,
            privado: true,
          });
        }
      } else {
        // Mensaje general
        io.emit('mensaje_radio', {
          de: user.username,
          mensaje,
          privado: false,
        });
      }
    });

    /**  Evento: Desconexión */
    socket.on('disconnect', () => {
      connectedUsers.delete(user.id);
      console.log(`Usuario desconectado: ${user.username}`);
    });
  });

  /** 🎤 Inicializar canal de voz (simulado por ahora) */
  initVoiceChannel(io);

  return io;
};
