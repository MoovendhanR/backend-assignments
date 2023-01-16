import { useState } from "react";



const Register=()=>{
   const [name,setName]=useState("")
   const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")
   const [age,setAge]=useState("")

      const handleSubmit=()=>{
          const payload={
            name,
            email,
            password,
            age
          }
        //   console.log(payload)

          fetch("http://localhost:5000/users/register",{
             method:"POST",
             body:JSON.stringify(payload),
             headers:{
                "Content-type": "application/json"
             }
          })
          .then(res=>res.json())
          .then(res=>console.log(res))
          .catch(err=>console.log(err))
      }
    //   fetch("http://localhost:5000/users/")
    //   .then(res=>
    //    res.json())
    //  .then(res=>console.log(res))
    //  .catch(err=>console.log(err))
    return(
        <>
           <h1>this is Register page</h1>
           <input type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}/>
           <input type="text" placeholder="Enter email"value={email}onChange={(e)=>setEmail(e.target.value)}/>
           <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
           <input type="text" placeholder="Enetr age" value={age} onChange={(e)=>setAge(e.target.value)}/>
           <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default Register;
