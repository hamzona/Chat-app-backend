const manageSocket = async (socket) => {
  // console.log(socket.id);

  //console.log(socket.handshake.query.nickname);

  socket.join(socket.handshake.query.nickname);

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
