const manageSocket = async (socket) => {
  socket.join(socket.handshake.query.id);

  socket.on("send-message", ({ recipients, message, nickname }) => {
    //console.log(data);
    recipients.forEach((recipient) => {
      socket.broadcast
        .to(recipient)
        .emit("recive-message", { message, nickname });
    });
  });
};

module.exports = manageSocket;
