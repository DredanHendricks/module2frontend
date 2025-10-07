<template>
      <nav class="navbar navbar-expand-lg sticky-top bg-white" aria-label="Thirteenth navbar example"> 
      <div class="container-fluid"> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation"> 
        <span class="navbar-toggler-icon"></span> 
        </button> 
        <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11"> 
          <div class="navbar-brand d-flex align-items-center justify-content-center col-lg-3 me-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-fill" viewBox="0 0 16 16">
            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
            </svg>HR Simplified
          </div>
          <ul class="navbar-nav col-lg-6 justify-content-lg-center"> 
            <li class="nav-item"> <router-link class="nav-link" to="/main">Profile</router-link> </li> 
            <li class="nav-item"> <router-link class="nav-link" to="/timeoff">Time Off</router-link> </li> 
            <li class="nav-item"> <router-link class="nav-link" to="/payslip">Payslip</router-link> </li> 
            </ul> 
            <div class="d-lg-flex col-lg-3 gap-3 justify-content-lg-end"> 
              <router-link class="btn btn-success w-25" to="/">Log out</router-link>
           </div> 
        </div> 
      </div> 
   </nav>
</template>