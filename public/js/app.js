console.log('client side javascript file is loaded');

const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');

weatherForm.addEventListener('submit',function(e){
    e.preventDefault();

    messageOne.textContent='loading...'
    messageTwo.textContent=''
    fetch('/weather?address='+search.value).then(function(response){
        response.json().then(function(data){
            if(data.error){
                messageOne.textContent=data.error;
            }else{
                messageOne.textContent=data.forecast;
                messageTwo.textContent=data.location;
            }
        })
    })
})