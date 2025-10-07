<template>
  <AdminNav />
  <div class="section">
    <div class="back d-flex flex-column position-relative justify-content-center align-items-center bg-success">
      <h1 class="display-3 text-white animate__animated animate__fadeInLeft">
        Monitor Growth and Provide Feedback
      </h1>
      <p class="h4 text-white animate__animated animate__fadeInRight">
        Detailed feedback, highlight strengths, and guide employees toward continuous improvement.
      </p>
    </div>

    <div class="body mt-5 d-flex flex-column align-items-center flex-wrap justify-content-center">
      <!-- Performance Pie Chart -->
      <div
        class="performance-card mt-5 mb-5 d-flex flex-column flex-wrap align-content-around justify-content-around border-0 animate__animated animate__fadeInUp animate__delay-1s"
      >
        <h1
          class="display-5 text-success animate__animated animate__fadeInLeft animate__delay-1s"
        >
          Employees Performance
        </h1>
        <div
          class="w-100 d-flex flex-row justify-content-center align-items-center mt-4 flex-wrap"
        >
         <div class="legend-list me-5 ms-3">
            <ul class="legend-ul">
              <li
                v-for="(item, idx) in performanceData"
                :key="item.label"
                class="legend-item"
              >
                <span
                  class="legend-color"
                  :style="{ background: chartColors[idx % chartColors.length] }"
                ></span>
                <span class="legend-label">{{ item.label }}</span>
              </li>
            </ul>
          </div>
          <PerformancePieChart :data="performanceData" />
        </div>
      </div>

      <!-- Reviews -->
      <h2
        class="display-3 text-success mb-4 animate__animated animate__fadeInLeft animate__delay-1s"
      >
        Reviews
      </h2>

      <form
        @submit.prevent="addReview"
        class="add-review-form mb-4 p-4 shadow rounded bg-light w-100"
        style="max-width:500px;"
      >
        <div class="form-group mb-3">
          <label for="employeeSelect" class="form-label">Select Employee</label>
          <select
            v-model="newReview.employeeId"
            id="employeeSelect"
            class="form-select"
            required
          >
            <option value="" disabled>Select an employee</option>
            <option
              v-for="emp in employeeOptions"
              :key="emp.employeeId"
              :value="emp.employeeId"
            >
              {{ emp.actionName || emp.name || 'Unnamed employee' }}
            </option>
          </select>
        </div>
        <div class="form-group mb-3">
          <label for="reviewComment" class="form-label">Review Comment</label>
          <textarea
            v-model="newReview.comment"
            id="reviewComment"
            class="form-control"
            rows="3"
            required
            placeholder="Write feedback..."
          ></textarea>
        </div>
        <button type="submit" class="btn btn-success">Add Review</button>
        <span v-if="reviewAdded" class="text-success ms-3">Review added!</span>
      </form>

      <!-- Reviews List as Grid -->
      <div
        class="reviews-grid mt-3 mb-5 animate__animated animate__fadeInRight animate__delay-1s"
      >
        <div
          v-for="(review, idx) in reviews"
          :key="review.employeeId + '-' + review.comment + '-' + idx"
          class="review-card"
        >
          <div class="d-flex align-items-center mb-2">
            <div class="ms-5">
              <h4 class="mb-0" style="margin-left: 75px;">
                {{ review.actionName || review.name }}
              </h4>
              <small class="text-muted ms-5">
                {{ review.position }} - {{ review.department }}
              </small>
            </div>
          </div>
          <div v-if="editIndex === idx">
            <textarea
              v-model="editComment"
              class="form-control mb-2"
              rows="3"
            ></textarea>
            <button class="btn btn-success btn-sm me-2" @click="saveEdit(idx)">
              Save
            </button>
            <button class="btn btn-secondary btn-sm" @click="cancelEdit">
              Cancel
            </button>
          </div>
          <div v-else class="d-flex align-items-center justify-content-between">
            <p class="mt-3 mb-0 flex-grow-1">{{ review.comment }}</p>
            <button
              class="btn btn-outline-success btn-sm ms-2"
              @click="startEdit(idx, review.comment)"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterComp />
  <router-view></router-view>
</template>

<script>
import FooterComp from '@/components/FooterComp.vue';
import AdminNav from '@/components/AdminNav.vue';
import PerformancePieChart from '@/components/PerformancePieChart.vue';

export default {
  components: {
    AdminNav,
    FooterComp,
    PerformancePieChart
  },
  data() {
    return {
      reviews: [],
      newReview: {
        employeeId: '',
        comment: ''
      },
      reviewAdded: false,
      editIndex: null,
      editComment: '',
      performanceData: [
        { label: 'Sibongile Nkosi', value: 8 },
        { label: 'Lungile Moyo', value: 7 },
        { label: 'Thabo Molefe', value: 6 },
        { label: 'Keshav Naidoo', value: 5 },
        { label: 'Zanele Khumalo', value: 7 },
        { label: 'Sipho Zulu', value: 8 },
        { label: 'Naledi Moeketsi', value: 6 },
        { label: 'Farai Gumbo', value: 5 },
        { label: 'Karabo Dlamini', value: 7 },
        { label: 'Fatima Patel', value: 8 }
      ],
      chartColors: [
        '#4caf50', '#ff9800', '#f44336', '#2196f3', '#9c27b0', '#e91e63',
        '#00bcd4', '#8bc34a', '#ffc107', '#795548'
      ],
      motivationalComments: [
        name => `${name} consistently demonstrates a strong work ethic and a dedication to success. Keep up the great work!`,
        name => `${name} is a valuable team player who always brings positive energy to the workplace. Your contributions are appreciated!`,
        name => `${name} shows impressive growth and adaptability. Continue striving for excellence!`,
        name => `Outstanding performance by ${name}. Your commitment to quality and improvement is inspiring!`,
        name => `${name} is always willing to help others and goes above and beyond expectations. Well done!`,
        name => `Great job, ${name}! Your professionalism and motivation set a great example for the team.`,
        name => `${name} takes initiative and delivers results. Your hard work does not go unnoticed!`,
        name => `Thank you, ${name}, for your dedication and positive attitude. You make a difference every day!`,
        name => `${name} continues to impress with creative solutions and a can-do attitude. Keep it up!`
      ]
    };
  },
  computed: {
    employeeOptions() {
      const list = this.$store.state.employees;
      return Array.isArray(list) ? list : [];
    }
  },
  mounted() {
    this.$store.dispatch('fetchemployees').then(() => {
      this.generateMotivationalReviews();
    });
  },
  methods: {
    generateMotivationalReviews() {
      if (!Array.isArray(this.employeeOptions)) {
        return;
      }

      this.reviews = this.employeeOptions
        .filter(emp => emp && (emp.actionName || emp.name))
        .map((emp, idx) => ({
          ...emp,
          comment: this.motivationalComments[idx % this.motivationalComments.length](emp.actionName || emp.name)
        }));
    },
    addReview() {
      const emp = this.employeeOptions.find(e => e.employeeId === this.newReview.employeeId);
      if (emp && this.newReview.comment.trim()) {
        this.reviews.unshift({
          ...emp,
          comment: this.newReview.comment.trim()
        });
        this.newReview.employeeId = '';
        this.newReview.comment = '';
        this.reviewAdded = true;
        setTimeout(() => { this.reviewAdded = false; }, 1500);
      }
    },
    startEdit(idx, comment) {
      this.editIndex = idx;
      this.editComment = comment;
    },
    saveEdit(idx) {
      if (this.editComment.trim()) {
        this.reviews[idx].comment = this.editComment.trim();
        this.editIndex = null;
        this.editComment = '';
      }
    },
    cancelEdit() {
      this.editIndex = null;
      this.editComment = '';
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
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.performance-card {
  width: 80%;
  max-width: 1000px;
  padding: 2rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}

.performance-card h1 {
  text-align: center;
}

.performance-card .legend-list {
  min-width: 200px;
}

.performance-card .d-flex {
  flex-wrap: wrap;
}

.performance-card .d-flex > * {
  flex: 1;
  min-width: 300px;
  margin: 1rem 0;
}

.add-review-form {
  background: #f8f9fa;
  border-radius: 1rem;
  box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.08);
}

.legend-list {
  padding: 1.25rem;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  min-width: 220px;
  max-width: 300px;
}

.legend-ul {
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  transition: all 0.2s ease;
}

.legend-item:hover {
  transform: translateX(4px);
  color: #0a4d34;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  margin-right: 12px;
  box-shadow: 0 0 0 1px #ccc;
  flex-shrink: 0;
}

.legend-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* New styles for the reviews grid */
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.review-card {
  background: white;
  box-shadow: 0 4px 16px rgba(31, 38, 135, 0.08);
  border-radius: 1rem;
  padding: 1.5rem;
  min-width: 350px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
