<template>
  <d-col>
    <d-row>
      <div v-for="(score, index) in scores" class="score card mb-2" v-bind:key="index" :class="scoreColor(index)">
        <h5 class="score__title">{{ score.polName }}</h5>
        <div class="score__value">
          {{ score.usedLimit }} %
        </div>
        <div class="score__title">
          использованного лимита
        </div>
      </div>
    </d-row>
  </d-col>

</template>

<script>
export default {
  name: 'pollutant-used-limit-stat',
  data() {
    return {
      scores: [
        {
          polName: 'Оксид азота',
          usedLimit: 23,
        },
        {
          polName: 'Диоксид азота',
          usedLimit: 66,
        },
        {
          polName: 'Оксид марганца',
          usedLimit: 35,
        },
        {
          polName: 'Оксид серы',
          usedLimit: 98,
        },
        {
          polName: 'Пыль неорганическая 20-70',
          usedLimit: 14,
        },
        {
          polName: 'Пыль органическая, древесная',
          usedLimit: 56,
        },
      ],
    };
  },
  methods: {
    scoreColor(index) {
      const scoreValue = this.scores[index].usedLimit;
      if (scoreValue >= 75) {
        return 'score--is-bad';
      } else if (scoreValue < 75 && scoreValue >= 50) {
        return 'score--is-warning';
      } else if (scoreValue < 50 && scoreValue >= 25) {
        return 'score--is-caution';
      }
      return 'score--is-good';
    },
  },
};
</script>

<style scoped>
.card {
  background: #fafafa;
  margin: 2;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.score {
  display: inline-block;
  background: #fff;
  padding: 10px;
  color: rgba(0,0,0,.75);
  border: 1px solid #d5dadf;
  border-top: 10px solid #d5dadf;
  box-shadow: 0 2px 3px rgba(213,218,223,0.35);
  transition: all .2s ease;
  margin-right: 15px;
}

.score--is-good {
  border-top: 10px solid #24A926;
}

.score--is-caution {
  border-top: 10px solid #D3CE2D;
}

.score--is-warning {
  border-top: 10px solid #D3832D;
}

.score--is-bad {
  border-top: 10px solid #D3312D;
}

.score__title {
  margin: 0px;
  text-align: center;
}

.score__value {
  display: flex;
  justify-content: center;
  font-size: 50px;
}
</style>
