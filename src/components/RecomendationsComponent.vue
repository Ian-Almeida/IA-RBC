<template>
  <div class="flex justify-around items-center q-gutter-lg">
    <div
      class="row q-ma-lg"
      v-for="(row, idxRow) in recomendations"
      :key="idxRow"
    >
      <div class="col q-mr-lg" v-for="(col, idxCol) in row" :key="idxCol">
        <q-card class="my-card">
          <q-card-section class="text-center">
            <span class="text-h6">{{ col.filmeSerie }}</span>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label>Score: {{ col.score }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn flat round color="red" icon="favorite" @click="onClickFavorite($event, col)"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IConhecimentoRecomendacoes } from 'src/types/interfaces';
import { computed } from 'vue';
import _ from 'lodash';

interface Props {
  recomendationResult: Array<IConhecimentoRecomendacoes>;
  onConfirm: (ev: PointerEvent, index: number) => void;
}

const props = defineProps<Props>();

const recomendations = computed(() => {
  const arrFinal: Array<Array<IConhecimentoRecomendacoes>> = [];
  let arr: IConhecimentoRecomendacoes[] = [];

  let counter = 0;
  props.recomendationResult.forEach((item, index) => {
    if (counter === 3) {
      arrFinal.push(arr);
      arr = [];
      counter = 0;
    }
    arr.push(item);
    counter++;

    if (index + 1 === props.recomendationResult.length && arr.length > 0) {
      arrFinal.push(arr);
    }
  });
  return arrFinal;
});

function onClickFavorite(ev: PointerEvent, item: IConhecimentoRecomendacoes) {
  const index = _.findIndex(props.recomendationResult, item);
  props.onConfirm(ev, index);
}
</script>

<style scoped>
.my-card {
  width: 200px;
  height: 250px;
}
</style>
