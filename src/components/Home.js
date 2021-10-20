import {useState } from 'react';

function Home(){

    const [username, setUsername] = useState("")
    const [login, setLogin] = useState(false)
    
    
    function handleSubmit(event) {
        event.preventDefault();
        setLogin(true)
    }

    function handleChange(event){
        setUsername(event.target.value)
    }

    return (
        <div>
            { login? 
            <h1>Hi {username === ""? "idot, you forget to input your name! but still welcome! ":`${username}! Welcome to the game`}  </h1> :
            <form onSubmit = { handleSubmit}>
                <input type="text" value ={username} onChange ={handleChange} placeholder="Input your name!"></input>
                <button> Enter Game </button>
            </form>
            }
        </div>
    )
}

export default Home;