<template>
  <div class="my-container">
    <q-card flat bordered>
      <q-card-section>
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-table
            title="Base de dados"
            :rows="recomendations"
            :columns="columns"
            row-key="name"
            :loading="loading"
          >
            <template #body-cell-periodo="props">
              <q-td key="periodo" :props="props">
                {{ props.row.periodo.label }}
              </q-td>
            </template>
            <template #loading>
              <q-inner-loading
                :showing="loading"
                label="Carregando..."
                label-class="text-primary"
                label-style="font-size: 1.1em"
              />
            </template>
          </q-table>
        </transition>
      </q-card-section>
      <q-card-actions>
        <q-btn to="/" label="Voltar" color="primary"></q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { IConhecimentoList } from 'src/types/interfaces';
import { PeriodoOptions } from 'src/constants/';
import { onMounted, ref } from 'vue';
import api from 'src/api';
import _ from 'lodash';

const recomendations = ref<IConhecimentoList[]>([]);
const showContent = ref(false);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const result = await api.FindAllConhecimento();
  const arr = _.map(result, (item) => {
    const option = _.find(PeriodoOptions, (val) => val.value === item.periodo);
    return {
      ...item,
      periodo: { value: item.periodo, label: option ? option.label : '' },
    };
  });

  setTimeout(() => {
    recomendations.value = arr;
    loading.value = false;
    showContent.value = true;
  }, 1000);
});

const columns = [
  {
    name: 'idade',
    align: 'left',
    label: 'Idade',
    field: 'idade',
    sortable: true,
  },
  {
    name: 'filmeSerie',
    align: 'left',
    label: 'Filme / Série',
    field: 'filmeSerie',
    sortable: true,
  },
  {
    name: 'periodo',
    align: 'left',
    label: 'Período',
    field: 'periodo',
    sortable: true,
  },
  {
    name: 'generoFavorito',
    align: 'left',
    label: 'Gênero favorito',
    field: 'generoFavorito',
    sortable: true,
  },
  {
    name: 'estado',
    align: 'left',
    label: 'Estado',
    field: 'estado',
    sortable: true,
  },
  {
    name: 'tempoDisponivel',
    align: 'left',
    label: 'Tempo disponível',
    field: 'tempoDisponivel',
    sortable: true,
  },
  {
    name: 'actions',
    align: 'left',
    label: 'Ações',
  },
];
</script>

<style scoped>
.my-container {
  margin: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
}
</style>
