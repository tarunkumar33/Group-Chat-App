
const axiosObj=axios.create({
    baseURL:'http://localhost:3000'
});

document.querySelector('.signupForm').addEventListener('submit',(async(e)=>{
    try{
        e.preventDefault();
        const res=await axiosObj.post('/user/signUp',{
            name:e.target.name.value,
            email:e.target.email.value,
            phoneNumber:e.target.phoneNumber.value,
            password:e.target.password.value
        });
        console.log('res:', res);
    }
    catch(err){
        console.log(err);
        document.body.innerHTML+=`<h1>${err.response.data.message}</h1>`;
    }
}));
