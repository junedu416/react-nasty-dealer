import React, {useEffect, useState} from 'react';


const InsultComment = () => {
   const [insult, setInsult] = useState("")

    useEffect(()=> {
        fetch('https://clare-cors-server.herokuapp.com/https://evilinsult.com/generate_insult.php?lang=en&type=json', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setInsult(data.insult))
        .catch(error => console.error(error))
    }, [])

    return(
        <p>my insult: {insult}</p>
    )
}

export default InsultComment