<template>
<AdminNav/>
<div class="section animate__animated animate__fadeIn">
  <div class="back d-flex flex-column position-relative justify-content-center align-items-center bg-success">
    <h1 class="display-3 text-white animate__animated animate__fadeInLeft">Driving Success Through Performance</h1>
    <p class="h4 text-white animate__animated animate__fadeInRight">Empowering employee development through performance insights</p>
  </div> 
    <div class="body mt-5 d-flex flex-column align-items-center flex-wrap justify-content-center">
    <div class="card mt-5 mb-5 d-flex flex-column flex-wrap align-content-around justify-content-around w-50 border-0 animate__animated animate__fadeInUp animate__delay-1s">
    <h1 class="display-5 text-success animate__animated animate__fadeInLeft animate__delay-1s">Employees Performance</h1>
      <div class="w-100 d-flex flex-row justify-content-center align-items-center mt-4">
        <div class="legend-list me-4">
          <ul class="list-unstyled">
            <li v-for="(item, idx) in performanceData" :key="item.label" class="d-flex align-items-center ms-3 mb-2">
              <span class="legend-color me-2" :style="{background: chartColors[idx % chartColors.length]}" />
              <span>{{ item.label }}</span>
            </li>
          </ul>
        </div>
        <PerformancePieChart :data="performanceData" style="max-width:400px;margin-bottom:40px;" />
      </div>
    </div>
  </div>
</div>
<FooterComp/>
</template>
<script>
import AdminNav from '@/components/AdminNav.vue'
import FooterComp from '@/components/FooterComp.vue'
import PerformancePieChart from '@/components/PerformancePieChart.vue'
export default{
    components:{
        AdminNav,
        FooterComp,
        PerformancePieChart
    },
    data() {
      return {
        // Use employee names as labels, and mock a value for each
        performanceData: [
          { label: 'Sibongile Nkosi', value: 13 },
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
          '#4caf50', '#ff9800', '#f44336', '#2196f3', '#9c27b0', '#e91e63', '#00bcd4', '#8bc34a', '#ffc107', '#795548'
        ]


      }
    },


}
</script>
<style scoped>
.section{
  min-height: 80vh;
  max-width: 100%;
}
.back{
  height: 250px;
  background-image: linear-gradient(to right, #0a4d34, #13895e);
}

.body{
  height: auto;
}
.card{
  height: auto;
  box-shadow: 10px 10px 50px rgb(209, 209, 209);
}
.legend-list {
  min-width: 150px;
}
.legend-color {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  margin-right: 8px;
}
</style>