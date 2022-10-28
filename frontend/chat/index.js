const axiosObj = axios.create({
    baseURL: 'http://localhost:3000'
});

const token = localStorage.getItem('token');

function displayAllMsgs({messages,loginName}){
    const msgsElem=document.querySelector('.messages');
    msgsElem.innerHTML='';
    messages.forEach((msg)=>{
        if(msg.userName==loginName){
            msgsElem.innerHTML+=`<div class="p-2 indimsg " style="background:black;border-bottom:1px dotted snow; color:snow; border-radius:7px; ">
            <span style="margin-left:30%;" >you : 
        </span>
            <span>${msg.msg}</span>
            </div>`;
        }
        else{
            msgsElem.innerHTML+=`<div class="p-2 indimsg " style="background:rgb(8, 87,87); color:snow; border-bottom:1px solid white; border-radius:6px; ">
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

},800);


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