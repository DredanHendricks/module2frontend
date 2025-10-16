<template>
  <div class="form d-flex align-items-center justify-content-start flex-column w-100">
    <h1 class="text-light display-4 mt-4 fw-bold text-shadow">Good to see you again 🫠</h1>
    <div class="login d-flex align-items-start mt-5 justify-content-center bg-white shadow-lg rounded-4 border-0 p-4">
      <form class="d-flex flex-column justify-content-center w-100" @submit.prevent="handleSignIn">
        <h2 class="display-6 text-success mb-4 fw-bold text-center">Sign in</h2>
        <p>For demo purposes the username:fatima; password:patel456;</p>
        <div class="mb-3">
          <label class="form-label text-success fw-semibold" for="Username">Username</label>
          <input
            class="form-control form-control-lg rounded-3 border-success"
            type="text"
            id="Username"
            v-model="username"
            required
          >
        </div>
        <div class="mb-3 position-relative">
          <label class="form-label text-success fw-semibold" for="Password">Password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            class="form-control form-control-lg rounded-3 border-success"
            id="Password"
            v-model="password"
            required
          >
          <span class="toggle-password" @click="showPassword = !showPassword" role="button" tabindex="0">
            <span v-if="showPassword">
              <!-- Eye Slash SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 -2 16 16">
                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
              </svg>
            </span>
            <span v-else>
              <!-- Eye SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 -2 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4.5c-2.485 0-4.5-2.015-4.5-4.5S5.515 3.5 8 3.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zm0-7A2.5 2.5 0 1 0 8 11a2.5 2.5 0 0 0 0-5z"/>
              </svg>
            </span>
          </span>
        </div>
        <div v-if="errorMessage" class="alert alert-danger py-2 mb-2 text-center">
          {{ errorMessage }}
        </div>
        <button type="submit" class="btn btn-success w-100 py-2 fw-bold rounded-3 mb-2 text-center">Sign in</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      showPassword: false
    }
  },
  methods: {
    ...mapActions(['login']),
    async handleSignIn() {
      const result = await this.login({
        username: this.username,
        password: this.password
      })

      if (result.success) {
        this.errorMessage = ''
        this.$router.push('/main')
      } else {
        this.errorMessage = 'Invalid username or password'
      }
    }
  }
}
</script>

<style scoped>
/* your existing styles unchanged */
.form {
  height: 85vh;
  background-image: linear-gradient(to right, #0a4d34, #13895e);
}
.login {
  width: 28%;
  min-width: 320px;
  border: none;
}
.text-shadow {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
}
.toggle-password {
  position: absolute;
  right: 18px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1.4rem;
  user-select: none;
  color: #198754;
  line-height: 1;
}
.toggle-password svg {
  margin-top: 25px;
}
@media screen and (max-width: 768px) {
  .login {
    width: 95%;
    min-width: unset;
  }
}
</style>
