const token = localStorage.getItem('token');
const axiosObj = axios.create({
    baseURL: 'http://localhost:3000',
    headers:{
        common:{
            Authorization:token
        }
    }
});

function displayAllGrps(groups){
    const grpList=document.querySelector('.group-list');
    groups.forEach((group)=>{
        grpList.innerHTML+=`<div style="padding:10px; background-color:black; margin:1px;border-radius:25px;">
        <a style="display:block;width:100%;color:white;" href="../groupchat/index.html?groupId=${group.groupId}&groupName=${group.groupName}">${group.groupName}</a></div>`;
    })

}
const localLoginName = localStorage.getItem('loginName');
document.querySelector('.logname').innerHTML=localLoginName;
window.addEventListener('load',async()=>{
    const result=await axiosObj.get('get-groups');
    console.log('result:', result);
    displayAllGrps(result.data);
});


document.querySelector('.create-grp-btn').addEventListener('click',async()=>{
    try{
        const result=await axiosObj.post('/create-group',{groupName:document.getElementById('grp-name').value});
        console.log('result:', result)
        document.getElementById('grp-name').value='';
        location.reload();
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