const axiosObj = axios.create({
    baseURL: 'http://localhost:3000'
});

const token = localStorage.getItem('token');
const localLoginName = localStorage.getItem('loginName');
const msgsElem=document.querySelector('.messages');
window.addEventListener('load',()=>{
    console.log("Refreshed");
    const localMsgs=JSON.parse(localStorage.getItem('messages')) || [];
    msgsElem.innerHTML='';
    if(localMsgs.length>0){
        displayAllMsgs({messages:localMsgs,loginName:localLoginName});
    }
});

function displayAllMsgs({messages,loginName}){
    messages.forEach((msg)=>{
        if(msg.userName==loginName){
            msgsElem.innerHTML+=`<div style="background:black;color:white; border-radius:25px; padding:5px; margin:1px;margin-right:80%">
            <span >you : 
        </span>
            <span>${msg.msg}</span>
            </div>`;
        }
        else{
            msgsElem.innerHTML+=`<div style="background:orange; color:white; border-radius:25px; padding:5px;margin:1px; margin-left:80%">
            <span  >${msg.userName} : 
        </span>
            <span>${msg.msg}</span>
            </div>`;
        }
    });
}

setInterval(async()=>{
    const localMsgs=JSON.parse(localStorage.getItem('messages')) || [];
    console.log('localMsgs:', localMsgs)
    let lastMsgId;
    if(localMsgs.length>0){
        lastMsgId=localMsgs[localMsgs.length-1].id;
        console.log('lastMsgId:', lastMsgId)
    }
    const result=await axiosObj.get(`/getMessages?lastMsgId=${lastMsgId}`,{headers:{authorization:token}});
    console.log('result:', result);
    
    
    localStorage.setItem('messages',JSON.stringify(localMsgs.concat(result.data.messages)));

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