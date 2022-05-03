<template>
  <div class="my-container">
    <q-card flat bordered>
      <q-card-section>
        <q-table
          title="Base de dados"
          :rows="recomendations"
          :columns="columns"
          row-key="name"
        ></q-table>
      </q-card-section>
      <q-card-actions>
        <q-btn to="/" label="Voltar" color="primary"></q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { IConhecimento } from 'src/types/interfaces';
import { EPeriodo } from 'src/types/enumerations';

const recomendations: Array<IConhecimento> = [
  {
    idade: 22,
    filme_serie: 'Vikings',
    periodo: { value: EPeriodo.NOITE, label: 'NOITE' },
    genero_favorito: 'Medieval',
    estado: 'PR',
    tempo_disponivel: '01:30',
  },
  {
    idade: 55,
    filme_serie: 'De volta para o futuro',
    periodo: { value: EPeriodo.TARDE, label: 'TARDE' },
    genero_favorito: 'Aventura',
    estado: 'SC',
    tempo_disponivel: '00:30',
  },
  {
    idade: 30,
    filme_serie: 'Bridgerton',
    periodo: { value: EPeriodo.MANHA, label: 'MANHÃ' },
    genero_favorito: 'Romance',
    estado: 'SC',
    tempo_disponivel: '04:15',
  },
];

const columns = [
  {
    name: 'idade',
    align: 'left',
    label: 'Idade',
    field: 'idade',
    sortable: true,
  },
  {
    name: 'filme_serie',
    align: 'left',
    label: 'Filme / Série',
    field: 'filme_serie',
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
    name: 'genero_favorito',
    align: 'left',
    label: 'Gênero favorito',
    field: 'genero_favorito',
    sortable: true,
  },
  {
    name: 'genero_favorito',
    align: 'left',
    label: 'Gênero favorito',
    field: 'genero_favorito',
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
    name: 'tempo_disponivel',
    align: 'left',
    label: 'Tempo disponível',
    field: 'tempo_disponivel',
    sortable: true,
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
