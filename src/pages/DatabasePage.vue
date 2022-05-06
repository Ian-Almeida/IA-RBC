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
            :rows="conhecimentoItems"
            :columns="columns"
            row-key="name"
            :loading="loading"
          >
            <template #body-cell-periodo="props">
              <q-td key="periodo" :props="props">
                {{ props.row.periodo.label }}
              </q-td>
            </template>
            <template #body-cell-actions="props">
              <q-td key="actions" :props="props">
                <q-icon class="cursor-pointer" name="delete" size="xs" @click="onClickDelete(props.row)">
                  <q-tooltip anchor="center end" self="center left"
                    >Remover</q-tooltip
                  >
                </q-icon>
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
import { IConhecimento, IConhecimentoList } from 'src/types/interfaces';
import { PeriodoOptions } from 'src/constants/';
import { onMounted, ref } from 'vue';
import api from 'src/api';
import _ from 'lodash';

const conhecimentoItems = ref<IConhecimentoList[]>([]);
const showContent = ref(false);
const loading = ref(false);

async function onClickDelete(item: IConhecimento) {
  // console.log(item)
  const response = await api.DeleteConhecimento(item.id);
  await Mount();
}

onMounted(async () => {
  await Mount();
});

async function Mount() {
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
    conhecimentoItems.value = arr;
    loading.value = false;
    showContent.value = true;
  }, 1000);
}

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
