const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
let data = {};

const app = express();




app.use(bodyParser.json());

const port = 4000;
app.listen(port, () => console.log(`listening 0,0 on port ${port}`));


// get starship data
axios
    .get('http://swapi.co/api/starships')
    .then(res => data.starships = res.data.results)
// get person data
axios
    .get('http://swapi.co/api/people')
    .then(res => data.people = res.data.results)

//get planet data
axios
    .get('http://swapi.co/api/planets')
    .then(res => data.planets = res.data.results)


//endpoints
app.get('/api/check', (req, res) => res.sendStatus(200))
app.get('/api/planets', (req, res, next) => {
    axios.get('http://swapi.co/api/planets').then(res => {
        console.log(`got ${res.data.results.length} result(s)`);
        data.planets = res.data.results
        next();
    });
}, (req, res) => {
    res.send(data.planets);
})
app.get('/api/people', (req, res, next) => {
    axios
        .get('http://swapi.co/api/people')
        .then(res => {
            data.people = res.data.results
            next();
        })
}, (req, res) => {
    res.send(data.people);
})
app.get('/api/starships', (req, res, next) => {
    axios
        .get('http://swapi.co/api/starships')
        .then(res => {
            data.starships = res.data.results
            next();
        });
}, (req, res) => {
    res.send(data.starships)
})
//search page endpoint, with queries!
// client will supply type (planet, person, starship) and a name param. 
// endpoint  app.get(/api/search?type='thing'&name='luke');
// format /api/:[type]?[query param]=[query value]&[other query param]=[other query value]
app.get('/api/:type', (req, res) => {
    console.log('req.query: ', req.query)
    const { query } = req
    switch (req.params.type) {
        case 'planet':
            let filteredPlanets = data.planets
            if (query.name)
                filteredPlanets = filteredPlanets.filter((planet => {
                    return planet.name.toLowerCase().includes(query.name.toLowerCase())
                }))
            res.send(filteredPlanets)
            break;
        case 'person':
            let filteredPeople = data.people;
            if (query.name)
                filteredPeople = filteredPeople.filter(person => {
                    return person.name.toLowerCase().includes(query.name.toLowerCase())
                })
            if (query.eyeColor)
                filteredPeople = filteredPeople.filter(person => {
                    return person.eye_color === query.eyeColor.toLowerCase()
                })
            if (query.gender)
                filteredPeople = filteredPeople.filter(person => {
                    return person.gender === query.gender.toLowerCase();
                })
            res.send(filteredPeople)
            break;
        case 'ship':
            let filteredShips = data.starships;
            if (query.name)
                filteredShips = filteredShips.filter(ship => {
                    return ship.name.toLowerCase().includes(query.name.toLowerCase())
                })
            if (query.class)
                filteredShips = filteredShips.filter(ship => {
                    return ship.starship_class.toLowerCase().includes(query.class.toLowerCase())
                })
            res.send(filteredShips)
            break;
        default: break;
    }
})