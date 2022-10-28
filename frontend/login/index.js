const axiosObj=axios.create({
    baseURL:'http://localhost:3000'
});

document.querySelector('.loginForm').addEventListener('submit',async(e)=>{
    try{
        e.preventDefault();
        const res=await axiosObj.post('/login',{
            email:e.target.email.value,
            password:e.target.password.value
        });
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('loginName',res.data.loginName);
        console.log(res);
        alert(res.data.message);
        window.location.href='../chat/index.html';
    }
    catch(err){
        console.log(err);
        document.body.innerHTML+=`<div style="color:red;">${err.response.data.message}</div>`;
    }
});