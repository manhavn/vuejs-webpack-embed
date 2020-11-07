export default {
  increment(state) {
    state.count += 1;
  },
  setConnectWS(state, payload) {
    state.connectWS = payload;
  },
  setMessageWS(state, payload) {
    state.message = payload;
    state.updateMessage += 1;
  },
  sendWS(state, payload) {
    state.putMessage = payload;
    state.sendCount += 1;
  },
};
