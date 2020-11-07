<template>
  <div></div>
</template>

<script>
import { mapState } from 'vuex';

function checkStartConnect() {
  if (this.conn) this.setConn(false);
  if (this.ws) {
    this.ws.close();
    this.setWs(null);
  }
  if (this.xInterval) {
    clearInterval(this.xInterval);
    this.setXInterval(0);
  }
  if (this.startConnect) this.setWs(new WebSocket(this.socketUrl));
}

function connectWsAndListen() {
  if (this.startConnect && this.ws) {
    if (this.retry) {
      this.ws.onerror = () => setTimeout(() => {
        this.setWs(new WebSocket(this.socketUrl));
      }, this.timeOutState);
    }
    this.ws.onopen = () => {
      this.ws.onmessage = event => this.$store.commit('setMessageWS', event.data);
      this.ws.onclose = () => this.setWsCheck(!this.wsCheck);
      this.setConn(true);
      if (!this.retry) this.setRetry(true);
    };
  }
}

export default {
  name: 'ConnectWS',
  props: ['socketUrl', 'timeOut', 'startConnect', 'tryConnect'],
  data() {
    return {
      ws: null,
      conn: false,
      wsCheck: false,
      status: false,
      retry: this.tryConnect,
      timeOutState: this.timeOut,
      xInterval: 0,
    };
  },
  computed: {
    ...mapState({
      sendCount: state => state.sendCount,
      putMessage: state => state.putMessage,
    }),
  },
  methods: {
    setWs(value) {
      this.$set(this, 'ws', value);
    },
    setConn(value) {
      this.$set(this, 'conn', value);
    },
    setRetry(value) {
      this.$set(this, 'retry', value);
    },
    setXInterval(value) {
      this.$set(this, 'xInterval', value);
    },
    setWsCheck(value) {
      this.$set(this, 'wsCheck', value);
    },
    setStatus(value) {
      this.$set(this, 'status', value);
    },
    setTimeOutState(value) {
      this.$set(this, 'timeOutState', value);
    },
  },
  mounted() {
    checkStartConnect.call(this);
  },
  watch: {
    startConnect() {
      checkStartConnect.call(this);
    },
    ws() {
      connectWsAndListen.call(this);
    },
    retry() {
      connectWsAndListen.call(this);
    },
    timeOut() {
      this.setTimeOutState(this.timeOut);
    },
    conn() {
      this.$store.commit('setConnectWS', this.conn);
      if (this.conn) {
        if (this.xInterval) clearInterval(this.xInterval);
        const x = setInterval(() => {
          this.setWsCheck(!this.wsCheck);
        }, 5000);
        this.setXInterval(x);
      }
    },
    sendCount() {
      if (this.conn && this.sendCount > -1) this.ws.send(JSON.stringify(this.putMessage));
      if (this.status) {
        this.ws.send(JSON.stringify(this.putMessage));
      } else if (this.conn && this.sendCount > -1 && this.ws && this.ws.readyState === 1) {
        this.ws.send(JSON.stringify(this.putMessage));
        this.setStatus(true);
      } else {
        this.setWsCheck(!this.wsCheck);
      }
    },
    wsCheck() {
      if (this.conn && this.ws && this.ws.readyState > 1) {
        this.setStatus(false);
        if (this.xInterval) clearInterval(this.xInterval);
        this.ws.close();
        this.setWs(null);
        this.setConn(false);
        this.setWs(new WebSocket(this.socketUrl));
      }
    },
  },
};
</script>
