<template>
  <nav class="navbar navbar-expand-lg rounded shadow-sm bg-white py-2" aria-label="Thirteenth navbar example"> 
      <div class="container-fluid"> 
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation"> 
          <span class="navbar-toggler-icon"></span> 
        </button> 
        <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11"> 
          <div class="navbar-brand d-flex align-items-center gap-2 justify-content-center col-lg-3 me-0 fw-bold fs-4 text-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-fill" viewBox="0 0 16 16">
                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
              </svg>
            <span>HR Simplified</span>
          </div>
          <ul class="navbar-nav col-lg-5 justify-content-lg-center"> 
          </ul> 
          <div class="d-lg-flex col-lg-3 gap-3 justify-content-lg-end"> 
            <button class="btn btn-success" @click="$emit('show-admin-modal')">Hr Staff</button>
          </div> 
        </div> 
      </div> 
   </nav>
</template>

<script>
export default {
  name: 'NavBarComp',
}
</script>
<style scoped>
.brand-logo {
  background: #fff;
  border: 2px solid #198754;
  padding: 2px;
  transition: box-shadow 0.2s;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  color: #198754;
}
.brand-logo:hover {
  box-shadow: 0 4px 16px rgba(25,135,84,0.15);
}
.navbar-brand span {
  letter-spacing: 1px;
  font-family: 'Segoe UI', 'Arial', sans-serif;
}
</style>