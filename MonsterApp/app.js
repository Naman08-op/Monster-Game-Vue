function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      battleLogs: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        //A draw
        this.winner = "draw";
        const log = "Game ends in Draw";
      this.battleLogs.push(log);
      } else if (value <= 0) {
        //player lost
        this.winner = "monster";
        const log = "Monster wins!";
      this.battleLogs.push(log);
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //A draw
        this.winner = "draw";
        const log = "Game ends in Draw";
      this.battleLogs.push(log);
      } else if (value <= 0) {
        //player lost
        this.winner = "player";
        const log = "Player Wins!!";
      this.battleLogs.push(log);
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 14);
      this.monsterHealth -= attackValue;
      const log = "Player attacks Monster with a damange of " + attackValue;
      this.battleLogs.push(log);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 17);
      this.playerHealth -= attackValue;
      const log = "Monster attacks Player with a damage of " + attackValue;
      this.battleLogs.push(log);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      const log =
        "Player attacks Monster with a special damage of " + attackValue;
      this.battleLogs.push(log);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
        const log =
          "Player heals itself with" + (this.playerHealth - healValue);
        this.battleLogs.push(log);
      } else {
        this.playerHealth += healValue;
        const log = "Player heals itself with " + healValue;
        this.battleLogs.push(log);
      }
      this.attackPlayer();
    },
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
    },
    surrender() {
      this.winner = "monster";
      const log = "Player surrenders. Monster wins!";
      this.battleLogs.push(log);
    },
  },
});

app.mount("#game");
