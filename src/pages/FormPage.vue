<template>
  <div class="main-container">
    <div class="row">
      <div class="col justify-all-center">
        <q-card class="q-ma-lg" flat bordered style="width: 100%">
          <q-card-section>
            <div class="row items-center text-center no-wrap">
              <div class="col">
                <div class="text-h6">
                  Recomendações para as informações do formulário ao lado
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <RecomendationsComponent :recomendation-result="dummyContent" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col justify-all-center">
        <q-card flat bordered style="width: 600px">
          <q-card-section>
            <div class="row items-center no-wrap text-center">
              <div class="col">
                <div class="text-h6">Preencha os campos a baixo</div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-xs" ref="myForm">
              <q-input
                filled
                v-model="formState.idade"
                label="Idade"
                lazy-rules
                :rules="[formRules.required]"
                type="number"
                min="1"
                max="150"
              />
              <q-select
                filled
                v-model="formState.estado"
                label="Escolha seu estado"
                :options="ESTADOS"
                lazy-rules
                :rules="[formRules.required]"
              ></q-select>
              <q-input
                filled
                v-model="formState.filme_serie"
                label="Filme / Série"
                lazy-rules
                :rules="[formRules.required]"
              />
              <q-select
                filled
                v-model="formState.periodo"
                label="Período do dia"
                :options="PeriodoOptions"
                option-value="value"
                option-label="label"
                lazy-rules
                :rules="[formRules.required]"
              ></q-select>
              <q-input
                filled
                v-model="formState.genero_favorito"
                label="Gênero favorito"
                lazy-rules
                :rules="[formRules.required]"
              />
              <q-input
                filled
                v-model="formState.tempo_disponivel"
                label="Tempo disponível"
                lazy-rules
                :rules="[
                  formRules.required,
                  (v) => v.length === 5 || 'Digite um horário completo',
                ]"
                mask="##:##"
              />
              <div>
                <q-btn label="Enviar" type="submit" color="primary" />
                <q-btn
                  class="float-right"
                  label="Visualizar Base"
                  color="secondary"
                  to="/database"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import api from 'src/api';
import formRules from 'src/formRules';
import { ESTADOS } from 'src/utils';
import { onMounted, ref } from 'vue';
import { QForm } from 'quasar';
import { EPeriodo } from 'src/types/enumerations';
import RecomendationsComponent from 'components/RecomendationsComponent.vue';

const PeriodoOptions = [
  {
    value: EPeriodo.MANHA,
    label: 'MANHÃ',
  },
  {
    value: EPeriodo.TARDE,
    label: 'TARDE',
  },
  {
    value: EPeriodo.NOITE,
    label: 'NOITE',
  },
];

//@ts-ignore
const myForm = ref<QForm>(null);
const formState = ref({
  idade: 1,
  filme_serie: '',
  periodo: { value: EPeriodo.MANHA, label: 'MANHÃ' },
  genero_favorito: '',
  estado: '',
  tempo_disponivel: '',
});

async function onSubmit() {
  const isValid = await myForm.value.validate();
  if (isValid) {
    // const result = await api.CreateConhecimento(formState.value);
    // console.log(result);
  }

  return;
}

onMounted(async () => {
  const result = await api.FindAllConhecimento();
  // const result = await api.FindOneConhecimento(1);
  // const result = await api.CreateConhecimento(formState.value);
  // console.log(result);
});

const dummyContent = [
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
    idade: 55,
    filme_serie: 'De volta para o futuro',
    periodo: { value: EPeriodo.TARDE, label: 'TARDE' },
    genero_favorito: 'Aventura',
    estado: 'SC',
    tempo_disponivel: '00:30',
  },
];
</script>

<style scoped>
.main-container {
  margin: 14px;
  padding: 14px;
}

.justify-all-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
