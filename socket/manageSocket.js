const manageSocket = async (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ recipients, message, nickname }) => {
    socket.broadcast.to(id).emit("recive-message", { message, nickname });
  });
};

module.exports = manageSocket;
