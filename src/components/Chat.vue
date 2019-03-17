<template>
  <div style="display:-webkit-box"> 
        <div id='players'>
         <div class="plr" v-for="(player) in users">
            {{ formatPlayers(player)}}
         </div>
        </div>
        <div class='chatbox'>
            <div id ='chat'>
            <div v-for="(msg) in messages">
                <div class='msgi' :style='"background-color:"+ msg.color'><div class="author">{{formatPlayers(msg.user)}}</div><div class="mes">{{formatPlayers(msg.message)}}</div></div>
                </div>
                </div>
            <input  v-model="message"  type='text' v-on:keyup.enter="sendMessage()" id ='msg' placeholder='Write here!!'>
        </div>
      </div>
    </div>
</template>


<script>
const colors =['#4873d5','#d94e4e','#41c95e','#8450bc','#47bc96',"#eaad3e"]
import io from 'socket.io-client';
export default {
    data() {
        return {
            user: localStorage.username,
            message: '',
            color: colors[Math.floor(Math.random() * colors.length)],
            messages: [],
            code:window.location.href.split("/").pop(),
            socket : io(window.location.hostname,{
                query:`username=${localStorage.username || 'Anonimo'}&code=${window.location.href.split("/").pop()}`
            })
        }
    },
    methods: {
        formatPlayers(player){
            return $("<div></div>").text(player).text()
        },
        sendMessage(e) {
            this.socket.emit('send', {
                user: this.user,
                message: this.message,
                color: this.color
            });
            this.message = ''
            }
    },
    mounted() { 

        if (!localStorage.username) return this.$router.push('/?redirect='+this.code) 
        let _this = this
        this.socket.on("messages",function(messages){
            messages.forEach(message => _this.messages.push(message))
        })
        setInterval(function(){_this.socket.emit("send2",{})},1000)
        this.socket.on('back', (data) => {
            var elem = document.getElementById('chat');
             var istrue = false
             
              if (elem.scrollTop+elem.clientHeight == elem.scrollHeight){
                istrue = true
               }
            this.messages.push(data)
            if(this.messages.length > 10){
                
            }
            if (istrue){
                  setTimeout(function(){
                  elem.scrollTop = document.getElementById('chat').scrollHeight},100)
            }
        });
        this.socket.on("novo",(e) =>{
            if (!e.users) return this.socket.emit("users")
            _this.users = []
            e.users.forEach(c => _this.users.includes(c) ? null : _this.users.push((c)))
        })
    }
}

</script>

<style>
    html, body, #app, section.section {
        height: 100%;
        overflow:hidden;
    }
    #app,body{
        margin: 0px;
        color:#fff !important;
    }
    #players{
        height:100vh;
        width:200px;
        background-color:#222222;
        color:#fff;
    }
    .chatbox{
        width: calc(100vw - 200px);
        height: calc(100vh);
        background-color:#2e2e2e;
    }
    #chat{
        margin: 0px;
        margin-top:10px;
        width: calc(100vw - 200px);
        height: calc(100vh - 110px);
        overflow-y: auto;
        padding: 0px;
        color:#fff;
    }
    #msg{
        width:calc(100vw - 280px);
        margin:25px;
        padding:15px;
        color:#fff;
        border:none;
        background-color:#242424;
        border-radius:10px;
        text-align:left !important;
    }

    .msgi{
        margin:4px;
        padding: 10px;
        width: fit-content;
        border-radius: 10px;
        margin-left: 20px;
        text-align:center;
    }


    .author {
        TEXT-ALIGN: left;
        font-size: 15px;
        color: #ddd;
        margin-bottom: 5px;
    }

    .mes{
        text-align:left !important;
    }

    .plr{
        margin:15px;
    }
</style>
