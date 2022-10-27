const axiosObj = axios.create({
    baseURL: 'http://localhost:3000'
});

const token = localStorage.getItem('token');

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