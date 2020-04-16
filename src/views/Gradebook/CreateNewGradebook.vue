<template>
  <div>
    <h1>Add New Gradebook</h1>
    <div class="container">
      <div class="form-group">
        <label for="title">Gradebook name</label>
        <input type="text" class="form-control" id="title" name="title" v-model="newDiary.title" placeholder="Gradebook name" minlength="2" maxlength="255" required/>
      </div>

      <div class="form-group">
        <label for="professor">Professor</label>
        <select class="form-control" name="professor" id="professor" v-model="newDiary.professor_id">
          <option :value="professor.id" v-for="professor in professors" :key="professor.id">{{ professor.user.firstName }} {{professor.user.lastName}}</option>
        </select>
      </div>

      <div>
      <div v-if="errorList.length > 0" class="alert alert-danger">
        <div v-for="(error, index) in errorList" :key="index">
          Message: {{ error.message }}
          <div v-for="(e, index) in error.errors" :key="index">
            {{ e }}
          </div>
        </div>
      </div>
    </div>

      <div>
        <button class="btn btn-primary" @click="handleDiary">Submit</button>
        <router-link to="/gradebooks"><button class="btn btn-danger">Cancel</button> </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { professorsService } from "@/services/ProfessorsService";
import { diariesService } from "@/services/DiariesService";

export default {
  data() {
    return {
      newDiary: {},
      professors: {},
      id: "",
      errorList: [],
      currentProfessor: []
    };
  },
  methods: {
    handleDiary() {
      if (this.$route.params.id) {
        diariesService.diaryEdit(this.newDiary.id, this.newDiary)
        .then(() => {
          this.$router.push("/gradebooks");
        });
      } else {
        diariesService
          .diaryAdd(this.newDiary)
          .then(() => {
            this.$router.push("/gradebooks");
          })
          .catch(error => {
            this.errorList.push(error.response.data);
          });
      }
      }
    },
    created() {
      if (this.$route.params.id) {
        diariesService
          .get(this.$route.params.id)
          .then(response => {
            this.newDiary = response.data;
            this.currentProfessor.push(response.data.professor);
          })
          .catch(error => {
            this.errorList = error.response.data.errors;
          });
      }
      professorsService
        .getAll()
        .then(response => {
          this.professors = response.data.filter(professor => !professor.diary);
          this.professors = this.professors.concat(this.currentProfessor)
        })
        .catch(error => {
          this.errorList = error.response.data.errors;
        });
    }

};
</script>

<style>
  h1 {
    font-weight: bold;
    padding: 2rem;
  }
</style>
