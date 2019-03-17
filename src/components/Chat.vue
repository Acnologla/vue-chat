<template>
  <div>
      
      <div  id ='players' style="width:200px;border:1px solid black">
      </div>    
      <center>
  <div id ='chat' style=';background-color:grey;width:900px;height:500px;overflow-y:auto;' ></div>
    <input v-on:keyup.enter="sendMessage()" id ='msg' style=';width:898px;height:50px' placeholder='escreva sua mensagem'>

</center>
</div>
</template>


<script>
import io from 'socket.io-client';
export default {
    data() {
        return {
            user: '',
            message: '',
            messages: [],
            socket : io(window.location.hostname)
        }
    },
    methods: {
        sendMessage(e) {
            this.socket.emit('send', {
                user: localStorage.username,
                message: document.getElementById("msg").value
            });
            this.message = ''
            document.getElementById("msg").value = ''
        }
    },
    mounted() {
        if (!localStorage.username) return this.$router.push('/') 
        let _this = this
        setInterval(function(){
        _this.socket.emit("send2",{
            user: localStorage.username || "anonimo"
        })},1000)
        this.socket.on("respondeu",(data) => console.log("pong"))
        this.socket.on('back', (data) => {
        this.messages.push(data)
        document.getElementById("chat").innerHTML += `<div style='position:relative;left:0px'>${data.user}:   ${data.message}</div>`
        });
        this.socket.on("novo",(user) =>{
           
            $("#players").text("")
            $("#players").text(user.users.join("\n"))
        })
    }
}
</script>

<style>
html, body, #app, section.section {
  height: 100%;
}
</style>
