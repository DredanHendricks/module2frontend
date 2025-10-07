<template>
  <div id="add-employee-page">
    <div class="container">
      <h2 class="form-title">Add New Employee</h2>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="new-name">Full Name</label>
          <input type="text" id="new-name" v-model="formData.name" required>
        </div>

        <div class="form-group">
          <label for="new-position">Position</label>
          <input type="text" id="new-position" v-model="formData.position" required>
        </div>

        <div class="form-group">
          <label for="new-department">Department</label>
          <select id="new-department" v-model="formData.department" required>
            <option value="Development">Development</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Support">Customer Support</option>
            <option value="QA">QA</option>
          </select>
        </div>

        <div class="form-group">
          <label for="new-salary">Salary (R)</label>
          <input type="number" id="new-salary" v-model="formData.salary" required>
        </div>

        <div class="form-group">
          <label for="new-contact">Contact Email</label>
          <input type="email" id="new-contact" v-model="formData.contact" required>
        </div>

        <div class="form-group">
          <label for="new-history">Employment History</label>
          <textarea id="new-history" v-model="formData.employmentHistory" placeholder="Enter Employment history details"></textarea>
        </div>

        <div class="form-actions">
          <button type="button" @click="$emit('cancel')" class="btn btn-success">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Employee</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeForm',
  data() {
    return {
      formData: {
        name: '',
        position: '',
        department: 'Development',
        salary: 0,
        contact: '',
        employmentHistory: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { ...this.formData })
      this.resetForm()
    },
    resetForm() {
      this.formData = {
        name: '',
        position: '',
        department: 'Development',
        salary: 0,
        contact: '',
        employmentHistory: ''
      }
    }
  }
}
</script>