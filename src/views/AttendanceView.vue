<template>
  <AdminNav />
  <div class="section">
    <!-- Banner Section -->
    <div class="back d-flex flex-column justify-content-center align-items-center text-center px-3">
      <h1 class="display-3 text-white mb-3 animate__animated animate__fadeInLeft">
        Be Present, Be Informed
      </h1>
      <p class="h4 text-white animate__animated animate__fadeInRight">
        Easily view your employees attendance status and track their clock-ins.
      </p>
    </div>

    <!-- Body Section -->
    <div class="body">
      <div class="card calendar-container animate__animated animate__fadeInUp animate__delay-1s">
        <table class="calendar-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th v-for="date in dates" :key="date">{{ date }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in attendance" :key="employee.employee">
              <td>{{ employee.employee }}</td>
              <td v-for="date in dates" :key="date">
                <span v-if="employee[date] === 'Present'" class="present-tag">Present</span>
                <span v-else-if="employee[date] === 'Absent'" class="absent-tag">Absent</span>
                <span v-else>-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <FooterComp />
  <router-view />
</template>

<script>
import FooterComp from '@/components/FooterComp.vue';
import AdminNav from '@/components/AdminNav.vue';

export default {
  components: {
    AdminNav,
    FooterComp,
  },
  computed: {
    attendance() {
      return this.$store.state.attendance;
    },
    dates() {
      if (this.attendance.length > 0) {
        return Object.keys(this.attendance[0]).filter((key) => key !== 'employee');
      }
      return [];
    },
  },
  created() {
    this.$store.dispatch('fetchAttendance').then(() => {
      console.log('Attendance fetched:', this.attendance);
    });
  },
};
</script>

<style scoped>
.section {
  width: 100%;
  background-color: #f8f9fa;
}

.back {
  height: 280px;
  background-image: linear-gradient(to right, #0a4d34, #13895e);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem 1rem;
}

.body {
  max-width: 1000px;
  margin: 40px auto 80px auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
}

.card {
  width: 100%;
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  overflow-x: auto;
}

/* Table styles */
.calendar-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  font-size: 1rem;
}

.calendar-table thead tr {
  background-color: #13895e;
  color: white;
}

.calendar-table th,
.calendar-table td {
  padding: 12px 15px;
  vertical-align: middle;
  text-align: center;
  border: none;
}

.calendar-table tbody tr {
  background-color: #fefefe;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.calendar-table tbody tr:hover {
  background-color: #e6f2ea;
}

.present-tag {
  display: inline-block;
  background: #28a745;
  color: #fff;
  border-radius: 8px;
  padding: 4px 10px;
  font-size: 0.85em;
}

.absent-tag {
  display: inline-block;
  background: #dc3545;
  color: #fff;
  border-radius: 8px;
  padding: 4px 10px;
  font-size: 0.85em;
}

/* Responsive */
@media (max-width: 768px) {
  .body {
    max-width: 100%;
    padding: 0 10px;
  }
  .card {
    padding: 20px;
  }
  .calendar-table {
    font-size: 0.9rem;
  }
  .calendar-table th,
  .calendar-table td {
    padding: 8px 10px;
  }
}
</style>
