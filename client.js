const socket = io();

const form = document.getElementById('send-container');
const messageContainer = document.querySelector('.container');
const button= document.querySelector('.btn')
const text=document.getElementById('InputMsg')

let name1;

do{
    name1=prompt(" Enter your name : ");
}while(!name1)

button.addEventListener('click', ()=>{
    
    const msg= text.value;
   
    sendMessage(msg)
    
})
function sendMessage(message)
{
    let msg ={
        user: name1,
        message: message.trim()
    }

    appendMessage(msg, 'Outgoing')
      text.value='' 
      scrollToBottom()
    socket.emit('message',msg);
}
 function appendMessage(msg, type)
 {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message')
 
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup
    messageContainer.appendChild(mainDiv)

 }


socket.on('message', (msg)=>{
    console.log(msg)
    
   appendMessage(msg, 'Incoming');
   scrollToBottom()
})

function scrollToBottom()
{
    messageContainer.scrollTop = messageContainer.scrollHeight;
}