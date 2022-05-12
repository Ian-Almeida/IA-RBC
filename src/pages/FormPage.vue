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
            <RecomendationsComponent 
            :recomendation-result="recomendations" 
            @on-favorite="favorited"/>
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
              <q-select
                filled
                v-model="formState.periodo"
                label="Período do dia"
                :options="PeriodoOptionsList"
                option-value="value"
                option-label="label"
                lazy-rules
                :rules="[formRules.required]"
              ></q-select>
              <q-select
                filled
                v-model="formState.generoFavorito"
                label="Gênero favorito"
                :options="GeneroOptionsList"
                lazy-rules
                :rules="[formRules.required]"
              ></q-select>
              <q-input
                filled
                v-model="formState.tempoDisponivel"
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
          <q-inner-loading
            :showing="submitedForm"
            label="Carregando..."
            label-class="text-primary"
            label-style="font-size: 1.1em"
          >
            <template #default>
              <div class="q-pa-md q-gutter-md flex justify-center items-center" style="flex-direction: column">
                <h5>Se nenhuma recomendação agradou, escreva o nome do filme / serie que você assistiu.</h5>
                <div class="row">
                  <div class="col">
                    <q-input
                      filled
                      v-model="formState.filmeSerie"
                      label="Filme / Série"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <q-btn @click="onReset" color="info" label="Concluir"></q-btn>
                  </div>
                </div>
              </div>
            </template>
          </q-inner-loading>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import api from 'src/api';
import formRules from 'src/formRules';
import {ESTADOS} from 'src/utils';
import {computed, onMounted, ref} from 'vue';
import {QForm} from 'quasar';
import {EPeriodo} from 'src/types/enumerations';
import RecomendationsComponent from 'components/RecomendationsComponent.vue';
import {IConhecimentoList, IConhecimentoRecomendacoes} from 'src/types/interfaces';
import {PeriodoOptions, GeneroOptions} from 'src/constants';
import _ from 'lodash';

const resetedForm = {
  idade: null,
  filmeSerie: '',
  periodo: { value: EPeriodo.MANHA, label: 'MANHÃ' },
  generoFavorito: '',
  estado: '',
  tempoDisponivel: '',
};
//@ts-ignore
const myForm = ref<QForm>(null);
const formState = ref({...resetedForm});
const recomendations = ref<IConhecimentoRecomendacoes[]>([]);
const submitedForm = ref(false);

async function onReset() {
  const result = await api.CreateConhecimento({
    ...formState.value,
    periodo: formState.value.periodo.value,
  });
  formState.value = {...resetedForm};
  myForm.value.reset();
  submitedForm.value = false;
  recomendations.value = [];
}
async function onSubmit() {
  const isValid = await myForm.value.validate();
  if (isValid) {
    submitedForm.value = true;
    const result = await api.getRecomendacao({
      ...formState.value,
      periodo: formState.value.periodo.value,
    });
    recomendations.value = result ? result : [];
  }
  return;
}

async function favorited(filmeSerie: string) {
  // console.log(filmeSerie)
  formState.value.filmeSerie = filmeSerie;
  onReset();
}

const PeriodoOptionsList = computed(() => PeriodoOptions);

const GeneroOptionsList = computed(() => GeneroOptions);

onMounted(async () => {
  return;
});
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
