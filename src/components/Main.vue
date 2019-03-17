<template>
    <div>
        <div class="imagebg"></div>
        <div style="position:relative;display:inline-grid;margin:calc(25% - 150PX)">
            <input id ='name' placeholder='nome'>
            <button id ='button' v-on:click='redirect()'>Entrar</button>
        </div>
    </div>
</template>
<script>

function gen(){
   return Math.random().toString(16).slice(2)
}
export default{
    methods: {
     redirect(){
    localStorage.username = document.getElementById("name").value
    if (window.location.href.split("=")[1]) this.$router.push(`/chat/${window.location.href.split("=")[1]}`)
    else this.$router.push(`/chat/${gen()}`) 
     }
     }
}
</script>

<style>

.imagebg {
    background-size: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    background-position: center;
    transform: scale(1.1);
    filter: blur(10px);
    background-image: url(http://altosadventure.com/resources/screenshots/4_Night.png);
  }

body{
    overflow:hidden;
}

input{
    padding:15px;
    margin:10px;
    border:none;
    border-radius:10px;
}

button{
    padding:15px;
    margin:10px;
    border:none;
    border-radius:10px;
    width:200px !important;
}

</style>