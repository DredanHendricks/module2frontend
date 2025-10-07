<template>
  <div class="confirmation-modal active">
    <div class="modal-content bg-white">
      <h3>Confirm Deletion</h3>
      <p>Are you sure you want to delete this employee?</p>
      <div class="modal-actions">
        <button @click="$emit('cancel')" class="btn btn-secondary">Cancel</button>
        <button @click="$emit('confirm')" class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationModal'
};
</script>

<style scoped>
/* Add styles here if needed */
</style>