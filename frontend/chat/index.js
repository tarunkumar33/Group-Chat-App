const axiosObj = axios.create({
    baseURL: 'http://localhost:3000'
});

const token = localStorage.getItem('token');

function displayAllMsgs({messages,loginName}){
    const msgsElem=document.querySelector('.messages');
    msgsElem.innerHTML='';
    messages.forEach((msg)=>{
        if(msg.userName==loginName){
            msgsElem.innerHTML+=`<div style="background:black;color:white; border-radius:25px; padding:5px; margin-right:80%">
            <span >you : 
        </span>
            <span>${msg.msg}</span>
            </div>`;
        }
        else{
            msgsElem.innerHTML+=`<div style="background:orange; color:white; border-radius:25px; padding:5px; margin-left:80%">
            <span  >${msg.userName} : 
        </span>
            <span>${msg.msg}</span>
            </div>`;
        }
    });
}

setInterval(async()=>{
    const result=await axiosObj.get('/getMessages',{headers:{authorization:token}});
    console.log('result:', result);
    displayAllMsgs(result.data);

},1000);


document.querySelector('.sendmsgbtn').addEventListener('click',async()=>{
    try{
        const result=await axiosObj.post('/message',{msg:document.getElementById('msg').value},{headers:{authorization:token}});
        console.log('result:', result);
        document.getElementById('msg').value='';
    }
    catch(err){
        console.log(err);
        document.body.innerHTML+=`<div style="color:red;">${err.response.data.message}</div>`;
    }
});

document.getElementById('logout').addEventListener('click',()=>{
    localStorage.clear();
    location.replace('../login/index.html');
});