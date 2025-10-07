<template>
  <AdminNav />
  <div class="section">
    <div class="back d-flex flex-column position-relative justify-content-center align-items-center bg-success">
      <h1 class="display-3 text-white animate__animated animate__fadeInLeft">
        View All Employees In One Place
      </h1>
      <p class="h4 text-white animate__animated animate__fadeInRight">
        Discover who's who in your organization and connect with colleagues easily
      </p>
    </div>

    <div class="body mt-2 d-flex flex-column align-items-center flex-wrap justify-content-center">
      <h1 class="display-4 text-success animate__animated animate__fadeInLeft animate__delay-1s">
        Employees
      </h1>
      <div class="container animate__animated animate__fadeInRight animate__delay-1s">
        <div class="search-box">
          <input type="text" class="text-success" v-model="searchTerm" placeholder="Search by name or department..." />
        </div>

        <div class="employee-grid">
          <EmployeeCard v-for="employee in filteredEmployees" :key="employee.employeeId" :employee="employee" @view="showEmployeeDetail" @delete="showConfirmationModal"/>
        </div>

        <ConfirmationModal v-if="showModal" @confirm="confirmDelete" @cancel="cancelDelete"/>

        <div v-if="!employees.length" class="text-muted text-center mt-5">
          Loading employees...
        </div>
      </div>
    </div>
  </div>

  <EmployeeDetail v-if="selectedEmployee" :employee="selectedEmployee" @close="selectedEmployee = null" />

  <FooterComp />
</template>

<script>
import AdminNav from '@/components/AdminNav.vue';
import EmployeeCard from '@/components/EmployeeCard.vue';
import EmployeeDetail from '@/components/EmployeeDetail.vue';
import FooterComp from '@/components/FooterComp.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

export default {
  name: 'EmployeeList',
  components: {
    EmployeeCard,
    EmployeeDetail,
    AdminNav,
    FooterComp,
    ConfirmationModal
  },
  data() {
    return {
      searchTerm: '',
      selectedEmployee: null,
      showModal: false,          // Modal visibility
      deleteId: null             // Store employee ID to delete
    };
  },
  computed: {
    employees() {
      const employeesData = this.$store.state.employees;
      return Array.isArray(employeesData) ? employeesData : [];
    },
    filteredEmployees() {
      return this.employees.filter((emp) => {
        const name = emp?.name?.toLowerCase() || '';
        const dept = emp?.department?.toLowerCase() || '';
        const term = this.searchTerm.toLowerCase();
        return name.includes(term) || dept.includes(term);
      });
    },
  },
  methods: {
    showEmployeeDetail(employee) {
      this.selectedEmployee = employee;
    },

    showConfirmationModal(name) {
      this.name = name;
      this.showModal = true;
    },

    async confirmDelete() {
      await this.$store.dispatch('deleteEmployee', this.name);
      this.showModal = false;
      this.name = null;
    },

    cancelDelete() {
      this.showModal = false;
      this.name = null;
    }
  },
  mounted() {
    this.$store.dispatch('fetchemployees');
  }
};
</script>

<style>
.section {
  min-height: 80vh;
  max-width: 100%;
}
.back {
  height: 250px;
  background-image: linear-gradient(to right, #0a4d34, #13895e);
}
.body {
  height: auto;
}
.card {
  height: auto;
  width: fit-content;
  box-shadow: 10px 10px 50px rgb(209, 209, 209);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

#main-page .container {
  background-color: var(--card-bg);
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.search-box {
  margin-bottom: 25px;
}

.search-box input {
  width: 100%;
  padding: 12px 15px;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  border: none;
  box-shadow: 10px 10px 50px rgb(209, 209, 209);
}

/* Clean & professional styling for employee cards */
.employee-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 10px 0;
}

.employee-card {
  background: #fff;
  border-radius: 10px;
  padding: 20px 18px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  cursor: pointer;
  color: #212529;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.employee-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateY(-3px);
}

.employee-card h3 {
  margin: 0 0 8px 0;
  font-weight: 600;
  font-size: 1.15rem;
  color: #13895e;
}

.employee-card p {
  margin: 4px 0;
  font-size: 0.9rem;
  color: #555;
}

.card-actions {
  margin-top: 12px;
  display: flex;
  gap: 10px;
}

.card-actions button {
  background: transparent;
  border: 1.5px solid #13895e;
  color: #13895e;
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.card-actions button:hover {
  background-color: #13895e;
  color: #fff;
}

.card-actions button.delete-btn {
  border-color: #dc3545;
  color: #dc3545;
}

.card-actions button.delete-btn:hover {
  background-color: #dc3545;
  color: #fff;
}

/* Keep other styles unchanged */

.employee-detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.employee-detail.active {
  opacity: 1;
  pointer-events: all;
}

.detail-content {
  background: var(--card-bg);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  padding: 30px;
  border-radius: 10px;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: var(--text-light);
}

.confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.confirmation-modal.active {
  opacity: 1;
  pointer-events: all;
}

.modal-content {
  background: var(--card-bg);
  width: 90%;
  max-width: 400px;
  padding: 30px;
  border-radius: 10px;
  position: relative;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 25px;
}

#add-employee-page .container {
  background-color: var(--card-bg);
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.hidden {
  display: none;
}
</style>
