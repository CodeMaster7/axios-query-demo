import React from 'react'
import axios from 'axios'

export default class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            type: undefined,
            planetName: '',
            personName: '',
            personEyeColor: undefined,
            gender: undefined,
            shipName: '',
            shipClass: undefined,
            result: [],
            url: undefined
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
                <div className='search-grid'>
                    <label htmlFor='planetName'>Name: </label>
                    <input value={this.state.planetName} onChange={this.handleChange} id='planetName' type='text' placeholder='your search . . . ' />
                </div>
            ); break;

            case ('person'): searchTerms = (
                <div className='search-grid'>
                    <label htmlFor='personName'>Name: </label>
                    <input value={this.state.personName} onChange={this.handleChange} id='personName' type='text' placeholder='your search . . . ' />
                    <label htmlFor='personEyeColor'>Eye Color: </label>
                    <input value={this.state.personEyeColor} onChange={this.handleChange} id='personEyeColor' type='text' placeholder='your search . . . ' />
                    <label htmlFor='gender'>Gender: </label>
                    <select onChange={this.handleChange} id='gender' type='text' placeholder='your search . . . ' >
                        <option className='tr' value=''>Any</option>
                        <option className='tr' value='male'>Male</option>
                        <option className='tr' value='female'>Female</option>
                    </select>
                </div>
            ); break;

            case ('ship'): searchTerms = (
                <div className='search-grid'>
                    <label htmlFor='shipName'>Name: </label>
                    <input value={this.state.shipName} onChange={this.handleChange} id='shipName' type='text' placeholder='your search . . . ' />
                    <label htmlFor='shipClass'>Class: </label>
                    <select onChange={this.handleChange} id='shipClass' type='text' placeholder='your search . . . ' >
                        <option className='tr' value=''>All</option>
                        <option className='tr' value='landing craft'>Landing Craft</option>
                        <option className='tr' value='Deep Space Mobile Battlestation'>Deep Space Mobile Battlestation</option>
                        <option className='tr' value='Light freighter'>Light Freighter</option>
                        <option className='tr' value='assault starfighter'>Assault Starfighter</option>
                        <option className='tr' value='Starfighter'>Starfighter</option>
                        <option className='tr' value='Patrol craft'>Patrol Craft</option>
                        <option className='tr' value='Armed government transport'>Armed Government Transport</option>
                        <option className='tr' value='Escort ship'>Escort Ship</option>
                    </select>
                </div>
            ); break;

            default: break;
        }
        return (
            <div id='form'>
                <h1>search</h1>
                <form>
                    <div className='search-grid'>
                        <label htmlFor='type'>Search Type: </label>
                        <span className='styled-select'>
                            <select onChange={e => this.setState({ type: e.target.value })} id='type' name='' form=''>
                                <option className='tr' value='planet'>Planet</option>
                                <option className='tr' value='person'>Person</option>
                                <option className='tr' value='ship'>Ship</option>
                            </select>
                        </span>
                    </div>
                    <br />
                    {searchTerms}
                    <br />
                    <div className='search-grid'>
                        <button type='submit' onClick={this.handleSubmit}>search !</button><span>{this.state.url}</span></div>
                </form>
                <hr />
                <div>Results . . . </div>
                <div>{results}</div>
            </div>
        )
    }
}