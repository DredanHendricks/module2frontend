<template>
  <div class="employee-detail active">
    <div class="detail-content bg-white">
      <span class="close-btn" @click="$emit('close')">&times;</span>

      <h2 class="mb-2">{{ employee.name }}</h2>

      <div class="mt-3 detail-section border-bottom border-top border-success-subtle">
        <h3 class="mb-1 mt-3">Basic Information</h3>
        <p><strong>Position:</strong> {{ employee.position }}</p>
        <p><strong>Department:</strong> {{ employee.department }}</p>
        <p><strong>Salary:</strong> R {{ employee.salary.toLocaleString() }}</p>
        <p><strong>Contact:</strong> {{ employee.contact }}</p>
      </div>

      <div class="detail-section">
        <h3>Employment History</h3>
        <p>{{ employee.employmentHistory || 'No employment history available' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeDetail',
  props: {
    employee: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>