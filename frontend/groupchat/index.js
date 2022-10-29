const token = localStorage.getItem('token');
const groupId= location.href.split("groupId=")[1].split('&')[0];
const groupName= location.href.split("groupName=")[1];
const localLoginName = localStorage.getItem('loginName');

document.querySelector('.logname').innerHTML=localLoginName;

const axiosObj = axios.create({
    baseURL: 'http://localhost:3000',
    headers:{
        common:{
            Authorization:token
        }
    }
});

document.querySelector('.members').addEventListener('click',async(e)=>{
    try{
        if(e.target.classList.contains('makeadmin')){
            const result=await axiosObj.post(`/make-admin/${groupId}`,{id:e.target.id});
            console.log('res:', result)
            alert(result.data);
            location.reload();
        }
        if (e.target.classList.contains("delmem")) {
            const result=await axiosObj.post(`/remove-member/${groupId}`,{id:e.target.id});
            console.log('res:', result)
            alert(result.data);
            location.reload();
        }
    }
    catch(err){
        console.log(err);
    }
})

function displayParticipants(users){
    const membersElem=document.querySelector('.members');
    users.forEach((user)=>{
        if(user.groupmember.admin){
            membersElem.innerHTML+=`
            <div style="border-bottom:1px solid black; padding:6px; display:flex;">
            <p>${user.name}</p>
            </div>`;
        }
        else{
            membersElem.innerHTML+=`
            <div style="border-bottom:1px solid black; padding:6px; display:flex;">
            <p>${user.name}</p>
            <button style="background-color:green;color:white;padding:4px; border-radius:5px; margin-left:auto; margin-right:8px;" class="makeadmin" id="${user.id}">make admin</button>
            <button style="background-color:red;color:white; padding:3px; border-radius:5px; margin-right:8px; " class="delmem" id="${user.id}">remove</button>
            </div>`;
        }
        
    })
}
async function getGrpMembers(){
    const result=await axiosObj.get(`/group-members/${groupId}`);
    console.log('resultmem:', result)
    displayParticipants(result.data);
}
window.addEventListener('load',getGrpMembers());

document.querySelector('.grp-header').innerHTML=groupName;

document.querySelector('.addmem-form').addEventListener('submit',async(e)=>{
    try{
        e.preventDefault();
        console.log('e.target.email.value:', e.target.email.value)
        const result=await axiosObj.post(`/add-member/${groupId}`,{email:e.target.email.value,admin:e.target.adminvalue.value});
        e.target.email.value='';
        console.log('result:', result);
        location.reload();
    }
    catch(err){
        console.log(err);
    }
})

// messages
function displayAllMsgs({messages,loginName}){
    const msgsElem=document.querySelector('.messages');
    msgsElem.innerHTML='';
    messages.forEach((msg)=>{
        if(msg.user.name==loginName){
            msgsElem.innerHTML+=`<div style="background:black;color:white; border-radius:25px; padding:5px; margin:1px;margin-right:80%">
            <span >you : 
        </span>
            <span>${msg.msg}</span>
            </div>`;
        }
        else{
            msgsElem.innerHTML+=`<div style="background:orange; color:white; border-radius:25px; padding:5px;margin:1px; margin-left:80%">
            <span  >${msg.user.name} : 
        </span>
            <span>${msg.msg}</span>
            </div>`;
        }
    });
}
setInterval(async()=>{
    const result=await axiosObj.get(`/group-msgs/${groupId}`);
    console.log('result:', result.data);
    displayAllMsgs(result.data);
},1000);

document.querySelector('.sendmsgbtn').addEventListener('click',async()=>{
    try{
        const result=await axiosObj.post(`/grpmsg/${groupId}`,{msg:document.getElementById('msg').value});
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