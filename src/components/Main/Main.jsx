import React from 'react';
import axios from 'axios';

export default class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            planets: [],
            starships: [],
            people: []
        };
        this.getPlanets = this.getPlanets.bind(this)
        this.getPeople = this.getPeople.bind(this)
        this.getStarships = this.getStarships.bind(this)
    }
    componentDidMount() {
        // axios
        //     .get('/api/check')
        //     .then(res => console.log('ok'))
    }
    getPlanets() {
        axios
            .get('/api/planets')
            .then(res => {
                this.setState({ planets: res.data })
            })
    }
    getPeople() {
        axios
            .get('/api/people')
            .then(res => {
                this.setState({ people: res.data })
            })
    }
    getStarships() {
        axios
            .get('/api/starships')
            .then(res => {
                this.setState({ starships: res.data })
            })
    }
    render() {
        return (
            <div id="main-component" >
                <h1>Main</h1>
                <div className='search-container'>
                    <button onClick={this.getPlanets}>get planets</button>
                    <button onClick={this.getPeople}>get people</button>
                    <button onClick={this.getStarships}>get starships</button>
                    <div className='text'>{this.state.planets.map((el, i) => (
                        <div key={i}>
                            {el.name}
                        </div>
                    ))}
                    </div>
                    <div className='text'>{this.state.people.map((el, i) => (
                        <div key={i}>
                            {el.name}
                        </div>
                    ))}
                    </div>
                    <div className='text'>{this.state.starships.map((el, i) => (
                        <div key={i}>
                            {el.name}
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        )
    }
}