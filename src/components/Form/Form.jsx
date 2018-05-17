import React from 'react'
import axios from 'axios'

export default class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            type: undefined,
            planetName: '',
            personName: '',
            personEyeColor: null,
            gender: null,
            shipName: '',
            shipClass: null,
            result: [],
            url: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.setState({ type: document.getElementById('type').value })
    }
    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }
    handleSubmit() {
        // problem with spaces ? need to convert with regex? 
        let queries = [];
        let url;
        switch (this.state.type) {
            case 'planet':
                if (this.state.planetName) queries.push({ type: 'name', value: this.state.planetName })
                url = this.makeUrl('planet', queries)
                axios.get(url)
                    .then(res => this.setState({
                        result: res.data,
                        url: url
                    }))
                break;
            case 'person':
                if (this.state.personName) queries.push({ type: 'name', value: this.state.personName })
                if (this.state.personEyeColor) queries.push({ type: 'eyeColor', value: this.state.personEyeColor })
                if (this.state.gender) queries.push({ type: 'gender', value: this.state.gender })
                url = this.makeUrl('person', queries)
                axios.get(url)
                    .then(res => this.setState({
                        result: res.data,
                        url: url
                    }))
                break;
            case 'ship':
                if (this.state.shipName) queries.push({ type: 'name', value: this.state.shipName })
                if (this.state.shipClass) queries.push({ type: 'class', value: this.state.shipClass })
                url = this.makeUrl('ship', queries)
                axios.get(url)
                    .then(res => this.setState({
                        result: res.data,
                        url: url
                    }))
                break;
            default: break;
        }
    }
    makeUrl(type, queries) {
        // return a query array
        // format /api/:[type]?[query param]=[query value]&[other query param]=[other query value]
        let url = `/api/${type}`
        if (!queries[0]) return url
        let firstQuery = queries.splice(0, 1)[0]
        url += `?${firstQuery.type}=${firstQuery.value}`
        if (!queries[0]) return url;
        for (let query of queries) {
            url += `&${query.type}=${query.value}`
        }
        return url
    }
    render() {
        let results = this.state.result.map((el, i) => (
            <div key={i}>{el.name}</div>
        ))
        let searchTerms;
        switch (this.state.type) {
            case ('planet'): searchTerms = (
                <div>
                    <label htmlFor='planetName'>Name: </label>
                    <input value={this.state.planetName} onChange={this.handleChange} id='planetName' type='text' placeholder='your search . . . ' />
                </div>
            ); break;

            case ('person'): searchTerms = (
                <div>
                    <label htmlFor='personName'>Name: </label>
                    <input value={this.state.personName} onChange={this.handleChange} id='personName' type='text' placeholder='your search . . . ' />
                    <br />
                    <label htmlFor='personEyeColor'>Eye Color: </label>
                    <input value={this.state.personEyeColor} onChange={this.handleChange} id='personEyeColor' type='text' placeholder='your search . . . ' />
                    <br />
                    <label htmlFor='gender'>Gender: </label>
                    <select onChange={this.handleChange} id='gender' type='text' placeholder='your search . . . ' >
                        <option value=''>Any</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div>
            ); break;

            case ('ship'): searchTerms = (
                <div>
                    <label htmlFor='shipName'>Name: </label>
                    <input value={this.state.shipName} onChange={this.handleChange} id='shipName' type='text' placeholder='your search . . . ' />
                    <br />
                    <label htmlFor='shipClass'>Class: </label>
                    <select onChange={this.handleChange} id='shipClass' type='text' placeholder='your search . . . ' >
                        <option value=''>All</option>
                        <option value='landing craft'>Landing Craft</option>
                        <option value='Deep Space Mobile Battlestation'>Deep Space Mobile Battlestation</option>
                        <option value='Light freighter'>Light Freighter</option>
                        <option value='assault starfighter'>Assault Starfighter</option>
                        <option value='Starfighter'>Starfighter</option>
                        <option value='Patrol craft'>Patrol Craft</option>
                        <option value='Armed government transport'>Armed Government Transport</option>
                        <option value='Escort ship'>Escort Ship</option>
                    </select>
                </div>
            ); break;

            default: break;
        }
        return (
            <div id='form'>
                <h1>search</h1>
                <form>
                    <label htmlFor='type'>Search Type: </label>
                    <select onChange={e => this.setState({ type: e.target.value })} id='type' name='' form=''>
                        <option value='planet'>Planet</option>
                        <option value='person'>Person</option>
                        <option value='ship'>Ship</option>
                    </select>
                    <br />
                    {searchTerms}
                    <br />
                    <button type='submit' onClick={this.handleSubmit}>search !</button><span>{this.state.url}</span>
                </form>
                <hr />
                <div>Results . . . </div>
                <div>{results}</div>
            </div>
        )
    }
}