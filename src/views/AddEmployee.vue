<template>
  <admin-nav/>
  <div id="add-employee-page" class="bg-light py-5 min-vh-100">
    <div class="container bg-white shadow rounded p-4" style="max-width: 600px;">
      <h2 class="text-center mb-4 text-success fw-bold">Add New Employee</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="new-name" class="form-label">Full Name</label>
          <input type="text" id="new-name" v-model="formData.name" required class="form-control text-success border border-success-subtle">
        </div>
        <div class="mb-3">
          <label for="new-position" class="form-label">Position</label>
          <input type="text" id="new-position" v-model="formData.position" required class="form-control text-success border border-success-subtle">
        </div>
        <div class="mb-3">
          <label for="new-department" class="form-label text-success">Department</label>
          <select id="new-department" v-model="formData.department" required class="form-select border border-success-subtle">
            <option value="Development">Development</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Support">Customer Support</option>
            <option value="QA">QA</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="new-salary" class="form-label text-success">Salary (R)</label>
          <input type="number" id="new-salary" v-model="formData.salary" required class="form-control border border-success-subtle" min="0">
        </div>
        <div class="mb-3">
          <label for="new-contact" class="form-label text-success">Contact Email</label>
          <input type="email" id="new-contact" v-model="formData.contact" required class="form-control border border-success-subtle">
        </div>
        <div class="mb-4">
          <label for="new-history" class="form-label text-success">Employment History</label>
          <textarea id="new-history" v-model="formData.employmentHistory" class="form-control border border-success-subtle" rows="3"></textarea>
        </div>
        <div class="d-flex justify-content-between">
          <router-link to="/employee" class="btn btn-secondary px-4">Cancel</router-link>
          <button 
            type="submit" 
            class="btn btn-outline-success px-4"
            :disabled="saving"
          >
            {{ saving ? 'Saving...' : 'Save Employee' }}
          </button>
        </div>
      </form>
    </div>
  </div>
  <footer-comp/>
</template>

<script>
import AdminNav from '@/components/AdminNav.vue';
import FooterComp from '@/components/FooterComp.vue';

export default {
  name: 'AddEmployee',
  data() {
    return {
      formData: {
        name: '',
        position: '',
        department: 'Development',
        salary: 0,
        contact: '',
        employmentHistory: ''
      },
      saving: false,  // added saving state
    }
  },
  methods: {
    async handleSubmit() {
      this.saving = true;
      try {
        await this.$store.dispatch('addEmployee', this.formData);
        this.$router.push('/employee');
      } catch (error) {
        console.error("Failed to add employee:", error);
      } finally {
        this.saving = false;
      }
    }
  },
  components:{
    AdminNav,
    FooterComp
  }
}
</script>

<style scoped>
</style>
