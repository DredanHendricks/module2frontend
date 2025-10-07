<template>
 <NavBarComp @show-admin-modal="showAdminModal = true"/>
 <div class="section d-flex flex-column justify-content-center">
   <LoginFormComp/>
 </div>
 <FooterComp/>

 <!-- Admin Modal -->
 <div class="modal fade" :class="{ show: showAdminModal }" tabindex="-1" v-if="showAdminModal" style="display: block; background: rgba(0,0,0,0.7);">
  <div class="modal-dialog modal-dialog-centered d-flex justify-content-center align-items-center">
    <div class="modal-content border-0 rounded-4 mx-auto">
      <div class="modal-header bg-success text-white rounded-top-4 border-0 d-flex align-items-center justify-content-between">
        <h5 class="modal-title fw-bold">Admin Login</h5>
        <button type="button" class="btn-close btn-close-white ms-2" @click="showAdminModal = false" aria-label="Close"></button>
      </div>
      <div class="modal-body p-4 bg-light rounded-bottom-4">
        <form @submit.prevent="submitAdminDetails">
          <div class="mb-3">
            <label for="adminUsername" class="form-label text-success fw-semibold">Username</label>
            <input type="text" class="form-control form-control-lg rounded-3 border-success" id="adminUsername" v-model="adminUsername" required autocomplete="username">
          </div>
          <div class="mb-3 position-relative">
            <label for="adminPassword" class="form-label text-success fw-semibold">Password</label>
            <input :type="showAdminPassword ? 'text' : 'password'" class="form-control form-control-lg rounded-3 border-success" id="adminPassword" v-model="adminPassword" required autocomplete="current-password">
            <span class="toggle-password position-absolute top-50 end-0 translate-middle-y me-3" @click="showAdminPassword = !showAdminPassword" style="cursor:pointer;">
              <span v-if="showAdminPassword">
                <!-- Bootstrap eye-slash SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" style="margin-top: 25px;" width="22" height="22" fill="#198754" class="bi bi-eye-slash-fill" viewBox="0 -2 16 16">
                  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                </svg>
              </span>
              <span v-else>
                <!-- Bootstrap eye SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" style="margin-top: 25px;" width="22" height="22" fill="#198754" viewBox="0 -2 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4.5c-2.485 0-4.5-2.015-4.5-4.5S5.515 3.5 8 3.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zm0-7A2.5 2.5 0 1 0 8 11a2.5 2.5 0 0 0 0-5z"/>
                </svg>
              </span>
            </span>
          </div>
          <div v-if="errorMessage" class="alert alert-danger py-2 rounded-3">{{ errorMessage }}</div>
          <button type="submit" class="btn btn-success w-100 py-2 fw-bold rounded-3">Login</button>
        </form>
      </div>
    </div>
  </div>
 </div>
</template>

<script>
import LoginFormComp from '../components/LoginFormComp.vue'
import NavBarComp from '../components/NavBarComp.vue'
import FooterComp from '../components/FooterComp.vue'
export default{
  components:{
    NavBarComp,
    FooterComp,
    LoginFormComp
  },
  data() {
    return {
      showAdminModal: false,
      adminUsername: '',
      adminPassword: '',
      showAdminPassword: false,
      errorMessage: '',
      adminCredentials: {
        username: 'admin',
        password: 'admin123'
      }
    }
  },
  methods: {
    submitAdminDetails() {
      // Check admin credentials
      if (this.adminUsername === this.adminCredentials.username && this.adminPassword === this.adminCredentials.password) {
        this.errorMessage = '';
        this.showAdminModal = false;
        this.$router.push('/hrstaff');
      } else {
        this.errorMessage = 'Put in the correct username or password';
      }
    }
  }
  }

</script>
<style scoped>
.section {
  min-height: 80vh;
  max-width: 100%;
}
.modal-content {
  border-radius: 1.5rem;
  border: none;
}
.modal-header {
  border-bottom: none;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
}
.btn-close {
  filter: invert(1);
}
.toggle-password {
  z-index: 2;
}
</style>
