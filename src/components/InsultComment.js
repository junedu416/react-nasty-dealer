import React, {useEffect, useState} from 'react';

// fetch random insult from API
// function getRamdomInsult() {
//     let randomInsult = fetch(`https://evilinsult.com/generate_insult.php?lang=en&type=json`)
//         .then(response => response.json())
//         .then(data => data.insult)
//         .catch(error => console.error(error.message))
// }

// getRamdomInsult();

const InsultComment = () => {
   const [insult, setInsult] = useState("")

    useEffect(()=> {
        fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json', {
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .then(data => setInsult(data.insult))
        .catch(error => console.error(error))
    }, [])

    return(
        <p>my insult: {insult}</p>
    )
}

export default InsultComment