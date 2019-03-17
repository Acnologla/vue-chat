<template>
<div>
<input id ='name' placeholder='nome'>
<button id ='button' v-on:click='redirect()'>Entrar</button>
</div>
</template>
<script>
export default{
    methods: {
     redirect(){
         localStorage.username = document.getElementById("name").value
     this.$router.push('chat') 
     }
     }
}
</script>
