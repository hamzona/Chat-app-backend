const manageSocket = async (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);
  console.log(id);
  socket.on("send-message", ({ recipients, message, nickname, chatId }) => {
    socket.broadcast
      .to(id)
      .emit("recive-message", { message, nickname, chatId });
  });
};

module.exports = manageSocket;
