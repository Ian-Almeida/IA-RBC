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
                  <q-item-label>{{ col.generoFavorito }}</q-item-label>
                  <!--                <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>-->
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn flat round color="red" icon="favorite" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IConhecimentoList } from 'src/types/interfaces';
import { computed } from 'vue';

interface Props {
  recomendationResult: Array<IConhecimentoList>;
}

const props = defineProps<Props>();

const recomendations = computed(() => {
  const arrFinal: Array<Array<IConhecimentoList>> = [];
  let arr: IConhecimentoList[] = [];

  let counter = 0;
  props.recomendationResult.forEach((item, index) => {
    if (counter === 4) {
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
</script>

<style scoped>
.my-card {
  width: 200px;
  height: 250px;
}
</style>
