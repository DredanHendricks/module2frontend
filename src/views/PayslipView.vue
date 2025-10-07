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
      <h2 class="display-4 text-success mb-5">Payslip</h2>
      <div class="card p-4">
        <div class="payslip-info mb-4">
          <div class="mb-3"><strong>Employee Name:</strong> {{ employee.name }}</div>
          <div class="mb-3"><strong>Pay Period:</strong> June 2025</div>
          <div class="mb-3"><strong>Salary:</strong> R{{ employee.salary || '500.00' }}</div>
          <div class="mb-3"><strong>Deduction:</strong> R{{ employee.deductions || '200.00' }}</div>
          <div class="mb-3"><strong>Net Pay:</strong> R{{ employee.netPay || '3,300.00' }}</div>
        </div>
        <button class="btn btn-success w-100 no-print" @click="printPayslip">Print Payslip</button>
      </div>
    </div>
  </div>
  <FooterComp />
</template>

<script>
import NavMain from '@/components/NavMain.vue'
import FooterComp from '@/components/FooterComp.vue'

export default {
  components: {
    NavMain,
    FooterComp,
  },
  computed: {
    employee() {
      const emp = this.$store.state.currentEmployee;
      if (!emp) return {};

      const payslip = this.$store.state.payslips.find(
        p => p.employeeId === emp.id || p.name === emp.name
      );

      if (!payslip) {
        return {
          name: emp.name,
          salary: 0,
          deductions: 0,
          netPay: 0,
        };
      }

      const salary = payslip.salary || 0;
      const deductions = payslip.deductions || 0;
      const netPay = salary - deductions;

      return {
        name: emp.name,
        salary,
        deductions,
        netPay,
      };
    }
  },
  created() {
    this.$store.dispatch('fetchPayslips');
  },
  methods: {
    printPayslip() {
      window.print();
    }
  }
}
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
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.body {
  max-width: 800px;
  margin: 40px auto 80px auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  width: 100%;
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* Text styling consistent with other pages */
.payslip-info div {
  font-size: 1.1rem;
  color: #333;
}

.btn {
  border-radius: 8px;
  font-weight: 600;
  width: 150px;
  align-self: center;
}

.no-print {
  display: block;
}

@media print {
  .no-print {
    display: none !important;
  }
}

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
