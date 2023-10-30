<template>
    <div class="loader_spinner_block">
         <Loader :loading="true" :color="'#293f11'" :height="'40px'" :width="'40px'"></Loader>
    </div> 
 </template>
 
 <script>
 import Loader from 'vue-spinner/src/ClipLoader.vue';
 
 export default {
     name: 'LoaderSpinner',
     components: {
         Loader,
     },
 }
 </script>
 
 <style>
 .loader_spinner_block {
     min-height: 40vh;
     display: flex;
     align-items: center;
     justify-content: center;
 }
 </style>