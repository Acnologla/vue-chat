<template>
  <div>
      
      
      <center>
  <div id ='chat' style='background-color:grey;width:500px;height:500px;overflow-y:auto;' ></div>
    <input v-on:keyup.enter="sendMessage()" id ='msg' style='width:498px;height:50px' placeholder='escreva sua mensagem'>

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
            socket : io('localhost:3001')
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
        })},1000)
        this.socket.on("respondeu",(data) => console.log("pong"))
        this.socket.on('back', (data) => {
        this.messages.push(data)
        document.getElementById("chat").innerHTML += `<div style='position:relative;left:0px'>${data.user}:   ${data.message}</div>`
        });
    }
}
</script>

<style>
html, body, #app, section.section {
  height: 100%;
}
</style>