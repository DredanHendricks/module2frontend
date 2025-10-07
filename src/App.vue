<template>

    <router-view 
      v-slot="{ Component, route }"
      @show-detail="showEmployeeDetail"
      @show-confirmation="showConfirmationModal"
    >
      <component 
        :is="Component" 
        @show-detail="showEmployeeDetail"
        @show-confirmation="showConfirmationModal"
      />
    </router-view>
    <EmployeeDetail 
      v-if="showDetail && selectedEmployee" 
      :employee="selectedEmployee" 
      @close="closeDetailView" 
    />
    <ConfirmationModal 
      v-if="showConfirmation" 
      @cancel="closeConfirmationModal" 
      @confirm="confirmDelete" 
    />

</template>

<script>
import EmployeeDetail from '@/components/EmployeeDetail.vue'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import EmployeeCard from './components/EmployeeCard.vue'
import EmployeeForm from './components/EmployeeForm.vue'

export default {
  components: {
    EmployeeDetail,
    ConfirmationModal,
    EmployeeCard,
    EmployeeForm
  },
  data() {
    return {
      showDetail: false,
      showConfirmation: false,
      employeeToDelete: null,
      selectedEmployee: null
    }
  },
  computed: {
    isMainView() {
      return this.$route.path === '/employee'
    }
  },
  methods: {
    goToAddEmployee() {
      this.$router.push('/add-employee');
    },
    goToEmployeeList() {
      this.$router.push('/employee');
    },
    showEmployeeDetail(employeeId) {
      this.selectedEmployee = this.$store.getters['employees/allEmployees'].find(
        emp => emp.employeeId === employeeId
      )
      this.showDetail = true
    },
    closeDetailView() {
      this.showDetail = false
      this.selectedEmployee = null
    },
    showConfirmationModal(employeeId) {
      this.employeeToDelete = employeeId
      this.showConfirmation = true
    },
    closeConfirmationModal() {
      this.showConfirmation = false
      this.employeeToDelete = null
    },
    confirmDelete() {
      if (this.employeeToDelete) {
        this.$store.dispatch('employees/deleteEmployee', this.employeeToDelete)
        this.closeConfirmationModal()
      }
    }
  }
}
</script>

<style>
#app {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.footer{
  width: 100%;
}
.navbar-brand{
  color: #0e5a3e;
  cursor: context-menu;
}
.navbar-brand:hover{
  color: #0e5a3e;
}
.nav-link{
  color: rgb(100, 99, 99);
}
.nav-link:hover{
  color: #0e5a3e
}
.active{
    color: #0e5a3e
}

nav a.router-link-exact-active {
  color: #0e5a3e;
}

</style>
