<template>
  <NavMain />
  <div class="section">
    <!-- Banner Section -->
    <div class="back d-flex flex-column justify-content-center align-items-center">
      <h1 class="display-3 text-white mb-3">Recharge. Refresh. Return Better.</h1>
      <p class="h4 text-white text-center px-3">
        Taking care of yourself starts with taking time for yourself.
      </p>
    </div>

    <!-- Body Section -->
    <div class="body">
      <h2 class="display-4 text-success mb-5">Leave Request Form</h2>
      <div class="card p-4">
        <form @submit.prevent="submitForm" class="leave-form">
          <label class="label" for="name">Name</label>
          <input id="name" class="form-control" v-model="leaveForm.name" disabled />

          <label class="label" for="type">Type</label>
          <select
            id="type"
            class="form-control"
            v-model="leaveForm.type"
            required
          >
            <option disabled value="">Select type</option>
            <option>Sick</option>
            <option>Annual</option>
            <option>Unpaid</option>
            <option>Maternity</option>
            <option>Paternity</option>
          </select>

          <label class="label" for="startDate">Start Date</label>
          <input
            id="startDate"
            type="date"
            class="form-control"
            v-model="leaveForm.startDate"
            required
          />

          <label class="label" for="endDate">End Date</label>
          <input
            id="endDate"
            type="date"
            class="form-control"
            v-model="leaveForm.endDate"
            required
          />

          <label class="label" for="reason">Reason</label>
          <textarea
            id="reason"
            class="form-control"
            v-model="leaveForm.reason"
            required
            rows="4"
          ></textarea>

          <button class="btn btn-success mt-4" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
  <FooterComp />
</template>

<script>
import NavMain from '@/components/NavMain.vue'
import FooterComp from '@/components/FooterComp.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    NavMain,
    FooterComp,
  },
  data() {
    return {
      leaveForm: {
        name: '',
        type: '',
        startDate: '',
        endDate: '',
        reason: '',
      },
    }
  },
  computed: {
    ...mapGetters(['currentEmployee']),
    employee() {
      return this.currentEmployee || { name: '' }
    },
  },
  created() {
    if (this.employee && this.employee.name) {
      this.leaveForm.name = this.employee.name
    }
  },
  methods: {
    async submitForm() {
      if (this.employee && this.employee.name) {
        this.leaveForm.name = this.employee.name
      }

      const result = await this.$store.dispatch('submitLeaveRequest', this.leaveForm)
      if (result && result.success) {
        alert('Leave request submitted successfully!')
        this.leaveForm.type = ''
        this.leaveForm.startDate = ''
        this.leaveForm.endDate = ''
        this.leaveForm.reason = ''
      } else {
        alert('Failed to submit leave request.')
      }
    },
  },
}
</script>

<style scoped>
.section {
  width: 100%;
  background-color: #f8f9fa;
}

/* Banner styling matching main page's color scheme */
.back {
  height: 280px;
  background-image: linear-gradient(to right, #0a4d34, #13895e);
  position: relative;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Body styling consistent with main page */
.body {
  max-width: 800px;
  margin: 40px auto 80px auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Card styling same as main page */
.card {
  width: 100%;
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* Form label styling consistent */
.label {
  font-weight: 600;
  color: #13895e;
  margin-bottom: 8px;
  margin-top: 16px;
  display: block;
}

/* Form controls styling consistent */
.form-control {
  border-radius: 8px;
  border: 1px solid #ced4da;
  padding: 0.5rem;
  font-size: 1rem;
}

/* Button styling consistent */
.btn {
  border-radius: 8px;
  font-weight: 600;
  width: 150px;
  align-self: center;
}

/* Responsive */
@media (max-width: 600px) {
  .body {
    margin-top: 20px;
    padding: 0 10px;
  }

  .card {
    padding: 20px;
  }
}
</style>
