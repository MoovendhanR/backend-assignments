import { useState } from "react";



const Login=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("");
  

      const handleSubmit=()=>{
          const payload={
            email,
            password
          }
        //   console.log(payload)

          fetch("http://localhost:5000/users/login",{
             method:"POST",
             body:JSON.stringify(payload),
             headers:{
                "Content-type": "application/json"
             }
          })
          .then(res=>res.json())
          .then(res=>{
            console.log(res)
            localStorage.setItem("token",res.token);
        })
          .catch(err=>console.log(err))
      }
    //   fetch("http://localhost:5000/users/")
    //   .then(res=>
    //    res.json())
    //  .then(res=>console.log(res))
    //  .catch(err=>console.log(err))
    return(
        <>
           <h1>this is Login page</h1>
           <input type="text" placeholder="Enter email"value={email}onChange={(e)=>setEmail(e.target.value)}/>
           <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
           <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default Login;
