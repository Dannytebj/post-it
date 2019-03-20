let io;
const socketConfig = {
  socketInstance(instance) {
    io = instance;
  },
  on(changeEvent, callback) {
    io.on(changeEvent, callback);
  },
  emit(changeEvent, callback) {
    io.emit(changeEvent, callback);
  }
};

module.exports = socketConfig;
