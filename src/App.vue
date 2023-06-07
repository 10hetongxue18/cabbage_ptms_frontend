<script setup>

import {onBeforeMount, onMounted} from "vue";
//浏览器窗口关闭时，自动清理本地token值
// onBeforeMount(()=>{
//   window.addEventListener('beforeunload',()=>{
//     localStorage.removeItem('authorization')
//   })
// })


</script>

<template>

<router-view></router-view>

</template>

<style scoped>


</style>

<style>
/*::-webkit-scrollbar{*/
/*  width: 0 !important;*/
/*}*/
/*::-webkit-scrollbar{*/
/*  width: 0 !important;height: 0;*/
/*}*/
html,body,#app{
  height: 100%;
  margin: 0 auto;
  /*background-color: beige;*/
}

</style>