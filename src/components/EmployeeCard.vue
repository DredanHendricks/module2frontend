<template>
  <div class="employee-card">
    <h3>{{ employee.name }}</h3>
    <p>{{ employee.department }}</p>

    <button class="btn btn-success me-2" @click="$emit('view', employee)">View Details</button>
    <button class="btn btn-danger" @click="$emit('delete', employee.name)">Delete</button>
  </div>
</template>

<script>
export default {
  name: 'EmployeeCard',
  props: {
    employee: Object
  },


};
</script>

<style scoped>
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
}

.employee-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    
}

.employee-card {
    border-radius: 8px;
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.employee-card:hover {
    transform: translateY(-5px);
    box-shadow: 5px 5px 30px rgb(209, 209, 209);
}

.employee-card h3 {
    color: var(--primary-dark);
    margin-top: 0;
    margin-bottom: 10px;
}

.employee-card p {
    margin: 8px 0;
    color: var(--text-light);
}

.employee-card .salary {
    color: var(--primary);
    font-weight: 600;
}

.card-actions {
    margin-top: 15px;
    display: flex;
    gap: 10px;
}


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

.detail-content h2 {
    color: var(--primary-dark);
    margin-top: 0;
}

.detail-section {
    margin-bottom: 20px;
}

.detail-section h3 {
    color: var(--primary);
    border-bottom: 1px solid var(--border);
    padding-bottom: 5px;
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

.hidden {
    display: none;
}

</style>