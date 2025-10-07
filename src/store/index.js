import { createStore } from 'vuex'
import employeeModule from './modules/employees' // ✅ renamed to avoid conflict
import axios from 'axios'

// Load saved employee and token from localStorage
const savedUser = localStorage.getItem('currentEmployee')
const savedToken = localStorage.getItem('token')

if (savedToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`
}

export default createStore({
  state: {
    users: [],
    leaveRequests: [],
    attendance: [],
    employees: [],
    addedEmployee: [],
    payslips: [],
    currentEmployee: savedUser ? JSON.parse(savedUser) : null,
  },
  getters: {
    currentEmployee: state => state.currentEmployee,
    employees: (state) => state.employees, 
    allEmployees: (state) => state.employees,
  },
  mutations: {
    setCurrentEmployee(state, employee) {
      state.currentEmployee = employee
    },
    updateLeaveStatus(state, { id, status }) {
      const request = state.leaveRequests.find((req) => req.id === id)
      if (request) {
        request.status = status
      }
    },
    setPayslips(state, payslips) {
      state.payslips = payslips
    },
    setAddedEmployee(state, addedEmployee) {
      state.addedEmployee = addedEmployee
    },
    setEmployees(state, employees) {
      state.employees = employees 
    },
    setAttendance(state, attendance) {
      state.attendance = attendance
    },
    setLeaveRequests(state, requests) {
      state.leaveRequests = requests
    },
    addLeaveRequest(state, leaveRequest) {
      state.leaveRequests.push(leaveRequest)
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const res = await axios.post('http://localhost:9090/login', { username, password })
        const user = res.data.user

        if (!user) {
          console.error('No user found in login response.')
          return { success: false }
        }

        localStorage.setItem('token', res.data.token)
        localStorage.setItem('currentEmployee', JSON.stringify(user))
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
        commit('setCurrentEmployee', user)

        return { success: true }
      } catch (error) {
        console.error('Login failed:', error)
        return { success: false }
      }
    },

    initializeStore({ commit }) {
      const savedUser = localStorage.getItem('currentEmployee')
      const token = localStorage.getItem('token')

      if (savedUser) {
        commit('setCurrentEmployee', JSON.parse(savedUser))
      }

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    },

    async submitLeaveRequest({ commit }, payload) {
      try {
        const res = await axios.post('http://localhost:9090/hrstaff', payload)
        commit('addLeaveRequest', res.data)
        return { success: true }
      } catch (error) {
        console.error('Submit leave request error:', error)
        return { success: false }
      }
    },

    async addEmployee({ commit }, payload) {
      try {
        const res = await axios.post('http://localhost:9090/employee', payload)
        commit('setAddedEmployee', res.data)
      } catch (error) {
        return error
      }
    },

    async deleteEmployee({ dispatch }, name) {
      try {
        await axios.delete(`http://localhost:9090/employee/${name}`)
        dispatch('fetchemployees')
      } catch (error) {
        console.error('Error deleting employee:', error)
      }
    },

    async fetchLeaveRequests({ commit }) {
      try {
        const res = await axios.get('http://localhost:9090/leave-requests')
        commit('setLeaveRequests', res.data.data)
      } catch (error) {
        return error
      }
    },

    async fetchAttendance({ commit }) {
      try {
        const res = await axios.get('http://localhost:9090/attendance')
        commit('setAttendance', res.data.data)
      } catch (error) {
        return error
      }
    },

    async fetchemployees({ commit }) {
      try {
        const res = await axios.get('http://localhost:9090/employees')
        commit('setEmployees', res.data.data || res.data)
      } catch (error) {
        console.error('Error fetching employees:', error)
      }
    },

    async fetchPayslips({ commit }) {
      try {
        const res = await axios.get('http://localhost:9090/payslips')
        commit('setPayslips', res.data)
        return { success: true }
      } catch (error) {
        console.error('Error fetching payslips:', error)
        return { success: false }
      }
    },

    async updateLeaveStatus({ commit }, { id, status }) {
      try {
        await axios.patch('http://localhost:9090/leave-requests/update-status', { id, status })
        commit('updateLeaveStatus', { id, status })
        return { success: true }
      } catch (error) {
        console.error('Update leave status error:', error)
        return { success: false }
      }
    },
  },
  modules: {
    employeeModule, 
  },
})
