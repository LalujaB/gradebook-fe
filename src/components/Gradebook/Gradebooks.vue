<template>
  <div class=container>
    <h1>All Gradebooks</h1>
    <div class="form-group">
      <label  class="form-check-label" for="term">Gradebook Search</label>
      <input type="text" v-model="term" @keyup.enter="search(1)" autofocus placeholder="Search gradebook" class="form-control" />
      <button class="btn btn-md btn-primary mt-3" @click="search(1)">Search</button>
    </div>
      <table class="table table-striped table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>Gradebook</th>
            <th>Professor</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody v-for="diary in diaries" :key="diary.id">
          <tr>
            <td>
              <router-link :to="{ name: 'single-gradebook', params: { id: diary.id }}" style="color: black">
                {{diary.title}}
              </router-link>
            </td>
            <td>
              <router-link :to="{ name: 'single-professor', params: { id: diary.professor.id }}"  style="color: black">
                {{diary.professor.user.firstName}} {{diary.professor.user.lastName}}
              </router-link>
            </td>
            <td>{{humanFormat(diary.created_at)}}</td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-md btn-primary mr-2" :disabled="currentPage === 1" @click="getDiaries(false)">Previous</button>
      <button :disabled="currentPage >= lastPage" class="btn btn-md btn-primary ml-2" @click="getDiaries(true)">Next</button>
    </div>
</template>

<script>
import { diariesService } from "@/services/DiariesService";
import { dataMixin } from "@/mixins/mixin";


export default {
  mixins: [dataMixin],
  data() {
    return {
      diaries: [],
      paginate: ["diaries"],
      term: "",
      currentPage: 1,
      lastPage: 0,
      canFetchNext: true
    };
  },
  methods: {
    getDiaries(isNext) {
      if (isNext) {
        if (this.currentPage < this.lastPage) {
          this.currentPage ++;
        }
      } else if (this.currentPage > 1) {
        this.currentPage --;
      }
      this.search(this.currentPage);
    },
    search(currentPage) {
      diariesService.searchDiary(this.term, currentPage).then(response => {
        this.currentPage = response.data.current_page;
        this.diaries = response.data.data;
        this.lastPage = response.data.last_page;
      })
    }
  },
  beforeRouteEnter(to, from, next) {
      if(window.localStorage.getItem('loginToken')) {
         diariesService.searchDiary("", 1).then(response => {
          next(vm => {
            vm.currentPage = response.data.current_page;
            vm.diaries = response.data.data;
            vm.lastPage = response.data.last_page;
          });
        });
      }

  }
};
</script>
<style>
  h1 {
    font-weight: bold;
    padding: 2rem;
  }
</style>
