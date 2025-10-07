import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '@/views/MainView.vue'
import TimeOffView from '@/views/TimeOffView.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import PerformanceView from '@/views/PerformanceView.vue'
import HrStaffView from '@/views/HrStaffView.vue'
import PayrollView from '@/views/PayrollView.vue'
import PayslipView from '@/views/PayslipView.vue'
import EmployeeList from '@/views/EmployeeList.vue'
import AddEmployee from '@/views/AddEmployee.vue'
import ReviewView from '@/views/ReviewView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/main',
    name: 'main',
    component: MainView
  },
  {
    path: '/review',
    name: 'review',
    component: ReviewView
  },
  {
    path: '/payslip',
    name: 'payslip',
    component: PayslipView
  },
  {
    path: '/payroll',
    name: 'payroll',
    component: PayrollView
  },
  {
    path: '/employee',
    name: 'EmployeeList',
    component: EmployeeList
  },
  {
    path: '/add-employee',
    name: 'AddEmployee',
    component: AddEmployee
  },
  {
    path: '/hrstaff',
    name: 'hrstaff',
    component: HrStaffView
  },
  {
    path: '/performance',
    name: 'performance',
    component: PerformanceView
  },
  {
    path: '/timeoff',
    name: 'timeoff',
    component: TimeOffView
  },
  {
    path: '/attendance',
    name: 'attendance',
    component: AttendanceView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
