// import ReactDOM from 'react-dom';
import axios from 'axios';
import React, { Component } from 'react';
import './App.css';


const api = axios.create({
    baseURL: 'http://192.168.35.157:8080',
    // headers: { 'Access-Control-Allow-Origin': '*' },
});

const sleep = ms => new Promise(res => setTimeout(res, ms));

class App extends Component {
    state = {
        courses: [],
        name: '',
        speed: '',
        message: '',
    }

    constructor() {
        super();
        this.getCourse();
    }

    componentWillMount() {
        this.getCourse();
    }

    handleChangeName = (event) => {
        this.setState({ name: event.target.value });
    };

    handleChangeSpeed = (event) => {
        this.setState({ speed: event.target.value });
    };


    handleAdd = async () => {
        const newCourses = this.state.courses.concat({ name: this.state.name, speed: this.state.speed });
        this.setState({ courses: newCourses });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const car = {
            name: this.state.name,
            top_speed: this.state.speed,
        };

        api.post('/car', car).then((res) => {
            console.log(res);
            console.log(res.data[0]);

            if (res.data[0].Error) {
                this.setState({ message: res.data[0].Error });
                console.log('There was an error!');
                console.log(this.state.message);
            } else {
                this.setState({ message: '' });
            }
        });
    };

    AddThenLoad(event) {
        this.handleAdd(event);
        this.getCourse();
    }

    getCourse = async () => {
        await sleep(100);
        const dataOne = await api.get('/cars').then(({ data }) => data);
        this.setState({ courses: dataOne });
        console.table(this.state.courses);
    };

    renderAlert(message) {
        console.table('render alert has been called.');
        if (!message) {
            console.log('Message is null');
            return null;
        }

        console.log('Message is not null');
        return (
            <div>
                {message}
            </div>
        );
    }

    render() {
        let Message = '';
        if (this.state) {
            Message = this.state.message;
        }
        return (
            <div className="App">
                <header className="App-header">
                    <form onSubmit={this.handleSubmit}>
                        단어:
                        <input type="text" name="name" onChange={this.handleChangeName} />
                        작성자:
                        <input type="text" name="name" onChange={this.handleChangeSpeed} />
                        <button type="submit" onClick={(event) => { this.AddThenLoad(event); }}>Add</button>
                    </form>
                    {this.renderAlert(Message)}
                </header>
                <h2>{[...this.state.courses].reverse().map(d => (<div id="box1"><p style={{ 'font-size': '25px' }}>{d.Car}</p><p style={{ 'font-size': '10px' }}>{d.Top_Speed}</p></div>)) }</h2>
            </div>

        );
    }
}

// ReactDOM.render(<App />, document.getElementById('root'));

export default App;
