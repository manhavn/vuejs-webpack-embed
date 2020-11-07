<template>
  <div id="app">
    <ConnectWS
      :timeOut='1000'
      :socketUrl='wssService'
      :startConnect='true'
      :tryConnect='true'/>
    <HelloWorld/>
    <canvas id="canvas" width="300" height="300"/>
  </div>
</template>

<script>
const wssService = process.env.VUE_APP_WSS_SERVICE;
export default {
  name: 'App',
  data() {
    return {
      wssService,
    };
  },
  components: {
    ConnectWS: () => import('./components/ConnectWS'),
    HelloWorld: () => import('./components/HelloWorld'),
  },
  mounted() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Set line width
    ctx.lineWidth = 10;
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'red';

    // Wall
    ctx.strokeRect(75, 140, 150, 110);

    // Door
    ctx.fillRect(130, 190, 40, 60);

    // Roof
    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 60);
    ctx.lineTo(250, 140);
    ctx.closePath();
    ctx.stroke();
  },
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
