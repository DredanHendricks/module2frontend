<template>
  <AdminNav />
  <div class="section">
    <div class="back d-flex flex-column position-relative justify-content-center align-items-center bg-success">
      <h1 class="display-3 text-white animate__animated animate__fadeInLeft">
        Effortless Payroll Management Starts Here
      </h1>
      <p class="h4 text-white animate__animated animate__fadeInRight">
        Access and verify employee payroll data before final processing.
      </p>
    </div>

    <div class="body mt-5 d-flex flex-column align-items-center flex-wrap justify-content-center">
      <div class="payroll-container animate__animated animate__fadeInUp animate__delay-1s">
        <div class="d-flex justify-content-end mb-3 pe-2">
          <button v-if="!isEditing" class="btn btn-outline-success" @click="startEdit">Edit</button>
          <div v-else>
            <button class="btn btn-success me-2" @click="saveEdit">Save</button>
            <button class="btn btn-secondary" @click="cancelEdit">Cancel</button>
          </div>
        </div>

        <table class="payroll-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Hours Worked</th>
              <th>Leave Deductions</th>
              <th>Earned/Hour</th>
              <th>Monthly Salary</th>
              <th>Annual Salary</th>
              <th>Payslip</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(person, idx) in payrollDataWithBase" :key="person.employeeId">
              <td>{{ person.name }}</td>
              <td>{{ person.hoursWorked }}</td>
              <td>{{ person.leaveDeductions }}</td>
              <td>{{ person.hrlyPay }}</td>
              <td>R{{ person.monthlySalary }}</td>
              <td>
                <input type="number" class="form-control form-control-sm" v-model.number="payrollData[idx].finalSalary" min="0" :disabled="!isEditing" />
              </td>
              <td>
                <button class="btn btn-outline-success btn-sm no-print" @click="printPayslip(idx)">Download</button>
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
import FooterComp from '@/components/FooterComp.vue';
import AdminNav from '@/components/AdminNav.vue';
import payrollDataJson from '@/assets/payroll_data.json';

export default {
  components: {
    AdminNav,
    FooterComp
  },
  data() {
    return {
      payrollData: payrollDataJson.payrollData,
      originalPayrollData: JSON.parse(JSON.stringify(payrollDataJson.payrollData)),
      isEditing: false
    };
  },
  computed: {
    payrollDataWithBase() {
      const deductionValue = 500;
      return this.payrollData.map(person => {
        const annualSalary = person.finalSalary;
        const monthlySalary = Math.round((annualSalary + (person.leaveDeductions * deductionValue)) / 12);
        const hrlyPay = Math.round(monthlySalary / person.hoursWorked);
        return {
          ...person,
          annualSalary,
          monthlySalary,
          hrlyPay
        };
      });
    }
  },
  methods: {
    startEdit() {
      this.isEditing = true;
      this.originalPayrollData = JSON.parse(JSON.stringify(this.payrollData));
    },
    saveEdit() {
      this.isEditing = false;
    },
    cancelEdit() {
      this.payrollData = JSON.parse(JSON.stringify(this.originalPayrollData));
      this.isEditing = false;
    },
    printPayslip(idx) {
      const person = this.payrollDataWithBase[idx];
      if (!person) return;

      const payslipHtml = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:40px auto;padding:2.5em 2em 2em 2em;border-radius:8px;box-shadow:0 0 0 2px #eee, 0 0 20px #bbb;background:#fff; border:1px solid #ccc; min-height:700px; position:relative;">
          <div style='position:absolute;top:30px;right:40px;font-size:1.1em;color:#888;'>Payslip</div>
          <h2 style="color:#198754;text-align:center;margin-bottom:0.5em;">HR Simplified</h2>
          <div style='text-align:center;font-size:1.1em;margin-bottom:1.5em;'>Official Employee Payslip</div>
          <hr style='margin-bottom:2em;'>
          <div style='margin-bottom:1.2em;'><strong>Employee Name:</strong> ${person.name}</div>
          <div style='margin-bottom:1.2em;'><strong>Pay Period:</strong> June 2025</div>
          <div style='margin-bottom:1.2em;'><strong>Salary:</strong> R${person.monthlySalary}</div>
          <div style='margin-bottom:1.2em;'><strong>Deduction:</strong> R${person.leaveDeductions * 500}</div>
          <div style='margin-bottom:2em;'><strong>Net Pay:</strong> <span style='font-weight:bold;color:#198754;'>R${person.monthlySalary - (person.leaveDeductions * 500)}</span></div>
          <div style='position:absolute;bottom:30px;left:40px;font-size:0.95em;color:#aaa;'>Generated on: ${new Date().toLocaleDateString()}</div>
        </div>
      `;
      const printWindow = window.open('', '', 'width=700,height=900');
      printWindow.document.write('<html><head><title>Payslip</title>');
      printWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">');
      printWindow.document.write('<style>@media print { body { background: #fff !important; } }</style>');
      printWindow.document.write('</head><body style="background:#f5f5f5;">');
      printWindow.document.write(payslipHtml);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  }
};
</script>

<style scoped>
.section {
  min-height: 80vh;
  max-width: 100%;
}

.back {
  height: 250px;
  background-image: linear-gradient(to right, #0a4d34, #13895e);
}

.body {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.payroll-container {
  width: 100%;
  max-width: 1100px;
  margin-right: 100px;
}

.payroll-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 10px 10px 50px rgb(209, 209, 209);
  border-radius: 8px;
  overflow: hidden;
}

.payroll-table th{
  height: 60px;
  text-align: center;
  background-color: #13895e;
  color: white;
  border: 1px solid #e0e0e0;
  padding: 4px;
  vertical-align: middle;
  font-size: 1em;
}
.payroll-table td {
  height: 60px;
  text-align: center;
  border: 1px solid #e0e0e0;
  padding: 4px;
  vertical-align: middle;
}


.payroll-table td {
  font-size: 0.96em;
}

input.form-control-sm {
  max-width: 100px;
  margin: 0 auto;
}

.no-print {
  display: block;
}
@media print {
  .no-print {
    display: none !important;
  }
}
</style>
