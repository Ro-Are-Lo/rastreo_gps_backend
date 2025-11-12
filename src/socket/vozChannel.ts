import { Server, Socket } from 'socket.io';

export const initVoiceChannel = (io: Server) => {
  // Cada usuario podrá unirse a un "canal" (ej: "radio_general")
  io.on('connection', (socket: Socket) => {
    console.log('suario conectado al canal de voz:', socket.id);

    socket.on('join_channel', (channelName: string) => {
      socket.join(channelName);
      console.log(`${socket.id} se unió al canal: ${channelName}`);
    });

    // Señalización WebRTC (usando Socket.IO como transporte de señal)
    socket.on('voice_signal', (data: { to: string; signal: any }) => {
      io.to(data.to).emit('voice_signal', { from: socket.id, signal: data.signal });
    });

    // Transmitir oferta de audio (Peer-to-Peer)
    socket.on('call_user', (data: { userToCall: string; signal: any }) => {
      io.to(data.userToCall).emit('receive_call', { from: socket.id, signal: data.signal });
    });

    socket.on('accept_call', (data: { to: string; signal: any }) => {
      io.to(data.to).emit('call_accepted', { from: socket.id, signal: data.signal });
    });

    // Desconexión del canal
    socket.on('leave_channel', (channelName: string) => {
      socket.leave(channelName);
      console.log(`${socket.id} salió del canal ${channelName}`);
    });

    socket.on('disconnect', () => {
      console.log('Usuario desconectado del canal de voz:', socket.id);
    });
  });
};
