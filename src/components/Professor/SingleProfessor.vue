<template>
  <div>
    <h1>Single Professor</h1>
    <table class="table table-striped table-bordered" style="width:100%">
      <thead class="thead-dark">
      <tr>
        <th>Image</th>
        <th>Professor</th>
        <th>Gradebook</th>
        <th>Number of students</th>
      </tr>
      </thead>
      <tbody v-if="professor && professor.professor_has_many_images">
      <td v-for="image in professor.professor_has_many_images.slice(0,1)" :key="image.id"><img :src="image.url" alt width="64" height="64" /></td>
      <template v-if="professor && professor.user">
        <td>{{ professor.user.firstName }} {{ professor.user.lastName }}</td>
      </template>
      <td v-if="professor && professor.diary">
        <router-link :to="{ name: 'single-gradebook', params: { id: professor.diary.id }}">{{professor.diary.title}}</router-link>
      </td>
      <td v-if="professor && professor.diary && professor.diary.students">{{ professor.diary.students.length }}</td>
      <div v-if="errorsList.length > 0" class="alert alert-danger">
        <p v-for="(error, index) in errors" :key="index">Message: {{ error.message }}
          <br/>
          <span v-for="(err, i) in errors[index].errors" :key="i">
              <span v-for="(e, j) in err" :key="j">
                Error: {{ err[j] }}
                <br />
              </span>
            </span>
        </p>
      </div>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { professorsService } from "@/services/ProfessorsService";
  export default {
    data() {
      return {
        professor: {},
        errorsList: []
      };
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        professorsService
                .get(vm.$route.params.id)
                .then(response => {
                  vm.professor = response.data;
                })
                .catch(error => {
                  console.log(error);
                });
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
