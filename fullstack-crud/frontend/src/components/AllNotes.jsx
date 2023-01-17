import { useEffect } from "react"
import { useState } from "react"

import "../app.css"


const AllNotes=()=>{

    const [notes,allNotes]= useState([])

    useEffect(()=>{
        fetch("http://localhost:5000/notes",{
         headers:{
          "Authorization":localStorage.getItem("token")
         }
        })
        .then((res)=>res.json())
        .then((res)=>{allNotes(res.notes)})
        .catch((err)=>{console.error(err)})
    },[])
      console.log(notes)
       const deleteNotes = (userId)=>{
            fetch(`http://localhost:5000/notes/delete/${userId}`,{
             method: 'DELETE',
             headers: {
               "Authorization":localStorage.getItem("token")
             }
            })
            //.then((res)=>res.json())
           //  .then((res)=>{console.log(res.notes)})
           //  .catch((err)=>{console.error(err)})
       }
      //  useEffect(()=>{
      //         deleteNotes(null);
      //  },[])


  return(
    <>
    <center>

      <h1>All Notes</h1>
      {notes?notes.map((note)=>{
        return(
          <>
            <div className="container">
            <h1>Title:{note.title}</h1>
            <p>Notes:{note.notes}</p>
            <p>Category:{note.category}</p>
            <button onClick={()=>deleteNotes(note._id)}>Delete</button>
            </div>
            </>
        )
      }):<h1>no notes</h1>
      }
      </center>
    </>
  )
}

export default AllNotes;