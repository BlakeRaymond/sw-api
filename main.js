const getResidents = document.querySelector('button')

function buttonClick(event) {
    event.preventDefault();
    
    console.log('Button Clicked!')

    axios.get('https://swapi.dev/api/planets/?search=alderaan')
    .then((res) =>  {
        console.log(res.data)
        console.log(res.data.results)
        console.log(res.data.results[0].residents)

        let residents = res.data.results[0].residents
        const requests = residents.map((url) => axios.get(url))

        console.log(requests)
        
        axios.all(requests).then((responses) => {
            newArr = [];
            responses.forEach((personRes) => {
                let person = document.createElement('p')
                person.textContent = personRes.data.name
                document.querySelector('body').appendChild(person)
            })
            
        })
        
    })
    .catch(err => console.log(err))
}

getResidents.addEventListener('click', buttonClick)

