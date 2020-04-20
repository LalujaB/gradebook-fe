import Vue from 'vue'
import Router from 'vue-router'
import Gradebooks from './components/Gradebook/Gradebooks'
import Login from './components/User/Login'
import Register from './components/User/Register'
import AddNewStudent from './components/Student/AddNewStudent'
import AllProfessors from './components/Professor/AllProfessors'
import CreateNewGradebook from './components/Gradebook/CreateNewGradebook'
import CreateNewProfessor from './components/Professor/CreateNewProfessor'
import MyGradeBook from './components/Gradebook/MyGradeBook'
import SingleGradebook from './components/Gradebook/SingleGradebook'
import SingleProfessor from './components/Professor/SingleProfessor'
import WelcomeScreen from './components/WelcomeScreen'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeScreen
    },
    {
      path: '/gradebooks',
      name: 'gradebooks',
      component: Gradebooks
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/add-student/:id',
      name: 'add-student',
      component: AddNewStudent
    },
    {
      path: '/my-gradebook/add-student/:id',
      name: 'add-student',
      component: AddNewStudent
    },
    {
      path: '/all-professors',
      name: 'allprofessors',
      component: AllProfessors
    },
    {
      path: '/create-gradebook',
      name: 'create-gradebook',
      component: CreateNewGradebook
    },
    {
      path: '/create-professor',
      name: 'create-professor',
      component: CreateNewProfessor
    },
    {
      path: '/my-gradebook/:id',
      name: 'my-gradebook',
      component: MyGradeBook
    },
    {
      path: '/single-gradebook/:id',
      name: 'single-gradebook',
      component: SingleGradebook
    },
    {
      path: '/single-professor/:id',
      name: 'single-professor',
      component: SingleProfessor
    },
    {
      path: '/single-gradebook/:id/edit',
      name: 'edit-gradebook',
      component: CreateNewGradebook
    },
  ]
})
