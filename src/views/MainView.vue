<template>
  <NavMain />
  <div class="section">
    <!-- Banner Section -->
    <div class="back d-flex justify-content-center align-items-center">
      <div class="prof-circ animate__animated animate__fadeInDown">
        <img :src="employee.profileImages || 'default-profile.png'" alt="Profile" />
      </div>
    </div>

    <!-- Info Section -->
    <div class="body animate__animated animate__fadeInUp">
      <div class="header-row d-flex justify-content-between align-items-center w-100 mb-4">
        <h1 class="display-5 text-success greeting">Hi {{ employee.name }}</h1>
        <button @click="toggleEdit" class="btn btn-outline-success">
          <i class="fas fa-user-edit me-2"></i> {{ isEditing ? 'Save' : 'Edit' }}
        </button>
      </div>

      <div class="info-card">
        <div class="info" v-for="(value, key) in displayFields" :key="key">
          <h5 class="label">
            <i :class="icons[key]" class="me-2"></i>{{ key }}
          </h5>

          <div v-if="isEditing">
            <input v-model="editableFields[key]" class="form-control" />
          </div>
          <p v-else>{{ value }}</p>
        </div>
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
      isEditing: false,
      editableFields: {},
      savedLocalCopy: {}, 
    }
  },
  computed: {
    ...mapGetters(['currentEmployee', 'employees']),
    employee() {
      const current = this.currentEmployee || {}
      return (this.employees || []).find((u) => u.username === current.username) || current
    },
    displayFields() {
      // Show saved local copy if it exists
      return this.isEditing
        ? this.editableFields
        : (Object.keys(this.savedLocalCopy).length > 0 ? this.savedLocalCopy : {
            Position: this.employee.position,
            Department: this.employee.department,
            'Employment History': this.employee.employmentHistory,
            contact: this.employee.contact,
          })
    },
    icons() {
      return {
        Position: 'fas fa-briefcase',
        Department: 'fas fa-building',
        'Employment History': 'fas fa-history',
        contact: 'fas fa-envelope',
      }
    },
  },
  methods: {
    toggleEdit() {
      if (!this.isEditing) {
        // Entering edit mode: fill editable fields
        this.editableFields = {
          Position: this.displayFields.Position,
          Department: this.displayFields.Department,
          'Employment History': this.displayFields['Employment History'],
          contact: this.displayFields.contact,
        }
      } else {
        // Saving changes locally (not to backend)
        this.savedLocalCopy = { ...this.editableFields }
        console.log('Saved locally:', this.savedLocalCopy)
      }
      this.isEditing = !this.isEditing
    },
  },
  mounted() {
    this.$store.dispatch('fetchemployees')
  },
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
}

.prof-circ {
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: -100px;
}

.prof-circ img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.body {
  max-width: 1200px;
  margin: 120px auto 40px auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.greeting {
  margin-bottom: 30px;
  font-weight: 600;
}

.info-card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  width: 100%;
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.info {
  text-align: left;
}

.label {
  font-weight: 600;
  color: #13895e;
  margin-bottom: 8px;
  display: block;
}

.form-control {
  border-radius: 8px;
  border: 1px solid #ced4da;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.btn {
  border-radius: 8px;
  font-weight: 600;
  background-color: #13895e;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0a4d34;
}

.header-row {
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 1024px) {
  .info-card {
    grid-template-columns: 1fr;
  }

  .prof-circ {
    width: 160px;
    height: 160px;
    bottom: -80px;
  }
}

@media (max-width: 600px) {
  .body {
    margin-top: 100px;
  }

  .greeting {
    font-size: 2rem;
  }
}
</style>

