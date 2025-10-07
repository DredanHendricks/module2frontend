<template>
  <AdminNav />
  <div class="section">
    <!-- Banner Section -->
    <div class="back d-flex flex-column justify-content-center align-items-center">
      <h1 class="display-3 text-white text-center mb-3 animate__animated animate__fadeInLeft">
        Manage Employee Leave Requests with Ease
      </h1>
      <p class="h4 text-white text-center px-3 animate__animated animate__fadeInRight">
        Review, approve, or decline time-off requests all in one place.
      </p>
    </div>

    <!-- Body Section -->
    <div class="body">
      <h2 class="display-4 text-success mb-5 animate__animated animate__fadeInDown">Submitted Requests</h2>
      <div class="card p-4 animate__animated animate__fadeInUp animate__delay-1s">
        <table class="table table-bordered mb-0 bg-white">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Leave</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="request in leaveRequests" :key="request.id">
              <td>{{ request.name }}</td>
              <td>{{ request.type }}</td>
              <td>{{ request.startDate }}</td>
              <td>{{ request.endDate }}</td>
              <td>{{ request.reason }}</td>
              <td>
                <span
                  v-if="request.status === 'Approved'"
                  class="status-icon text-success"
                >✅</span>
                <span
                  v-else-if="request.status === 'Rejected'"
                  class="status-icon text-danger"
                >❌</span>
                <span v-else class="typing-dots">
                  <span class="dot"></span>
                  <span class="dot"></span>
                  <span class="dot"></span>
                </span>
              </td>
              <td>
                <button
                  class="btn btn-success me-2"
                  :disabled="processingRequest === request"
                  @click="approve(request)"
                >
                  Approve
                </button>
                <button
                  class="btn btn-danger"
                  :disabled="processingRequest === request"
                  @click="reject(request)"
                >
                  Reject
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <FooterComp />
</template>

<script>
import AdminNav from '@/components/AdminNav.vue';
import FooterComp from '@/components/FooterComp.vue';

export default {
  components: {
    AdminNav,
    FooterComp,
  },
  data() {
    return {
      processingRequest: null,
    };
  },
  computed: {
    leaveRequests() {
      return this.$store.state.leaveRequests;
    },
  },
  created() {
    this.$store.dispatch('fetchLeaveRequests');
  },
  methods: {
    async approve(request) {
      this.processingRequest = request;
      await this.$store.dispatch('updateLeaveStatus', {
        id: request.id,
        status: 'Approved',
      });
      this.processingRequest = null;
    },
    async reject(request) {
      this.processingRequest = request;
      await this.$store.dispatch('updateLeaveStatus', {
        id: request.id,
        status: 'Rejected',
      });
      this.processingRequest = null;
    },
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
  position: relative;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.body {
  max-width: 2000px;
  margin: 40px auto 80px auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  font-size: 1rem;
}

thead tr {
  background-color: #13895e;
  color: white;
}

th,
td {
  padding: 12px 15px;
  vertical-align: middle;
  text-align: left;
  border: none;
}

tbody tr {
  background-color: #fefefe;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

tbody tr:hover {
  background-color: #e6f2ea;
}

.status-icon {
  font-size: 1.5rem;
  vertical-align: middle;
}

.typing-dots {
  display: inline-block;
  width: 32px;
  text-align: center;
}

.dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 0 2px;
  background: #bbb;
  border-radius: 50%;
  animation: blink 1.4s infinite both;
}
.dot:nth-child(2) {
  animation-delay: 0.2s;
}
.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0%,
  80%,
  100% {
    opacity: 0.3;
  }
  40% {
    opacity: 1;
  }
}

/* Button style consistency */
.btn {
  border-radius: 8px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .body {
    max-width: 100%;
    padding: 0 10px;
  }
  .card {
    padding: 20px;
  }
  table {
    font-size: 0.9rem;
  }
}
</style>
