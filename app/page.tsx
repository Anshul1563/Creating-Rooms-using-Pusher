"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';


function Home() {
    const [username,setUsername] = useState("")
    const [roomID,setRoomID] = useState("")
    const router = useRouter()

    function handleSubmit(e : any){
      e.preventDefault()
      router.push(`/room/${roomID}?username=${username}`)
    }

	return (
		<div className="flex flex-col justify-center items-center h-screen">
      <form className="flex flex-col gap-4 justify-center items-center" onSubmit={handleSubmit}>
        <input className = "p-2 h-fit bg-slate-200 rounded-md" type = "text" onChange={(e)=> setUsername(e.target.value)} value = {username} placeholder ="Enter Username" ></input>
        <div className="flex gap-4 justify-center items-center">
          <input  className = "p-2 h-fit bg-slate-200 rounded-md" type = "text" onChange={(e)=> setRoomID(e.target.value)} value = {roomID} placeholder = "Enter Room ID"></input>
          <button className="p-2 bg-slate-400 rounded-md">Join Room</button>
        </div>
      </form>
		</div>
	);
}

export default Home;
