<template>
  <div class="main-container">
    <q-card flat bordered style="width: 600px">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Preencha os campos a baixo</div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form
          @submit="onSubmit"
          class="q-gutter-xs"
          ref="myForm"
        >
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
            :rules="[formRules.required, (v) => v.length === 5 || 'Digite um horário completo']"
            mask="##:##"
          />
          <div>
            <q-btn label="Enviar" type="submit" color="primary"/>
            <q-btn class="float-right" label="Visualizar Base" color="secondary" to="/database"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import api from 'src/api'
import formRules from 'src/formRules'
import { ESTADOS } from 'src/utils'
import { ref } from 'vue'
import {QForm} from 'quasar';

enum EPeriodo {
  DIA = 1,
  TARDE,
  NOITE
}

const PeriodoOptions = [
  {
    value: EPeriodo.DIA, label: 'DIA'
  },
  {
    value: EPeriodo.TARDE, label: 'TARDE'
  },
  {
    value: EPeriodo.NOITE, label: 'NOITE'
  }
]

//@ts-ignore
const myForm = ref<QForm>(null)
const formState = ref({
  idade: null,
  filme_serie: '',
  periodo: {value: EPeriodo.DIA, label: 'DIA'},
  genero_favorito: '',
  estado: '',
  tempo_disponivel: null
})

async function createDB () {
  await api.getDB()
  return true
}

async function onSubmit () {
  await createDB()
  console.log(await myForm.value.validate())
  return
}

</script>

<style scoped>
.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 14px;
  padding: 14px;
}
</style>
