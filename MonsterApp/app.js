const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
    };
  },
  methods: {
    attackMonster() {
      const attackValue = Math.floor(Math.random() * (14 - 5)) + 5;
      this.monsterHealth -= attackValue;
      this.attackPlayer(); 
    },
    attackPlayer() {
      const attackValue = Math.floor(Math.random() * (18 - 8)) + 8;
      this.playerHealth -= attackValue;
    },
  },
});

app.mount("#game");
