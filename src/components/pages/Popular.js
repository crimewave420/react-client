import React, { Component } from 'react'
import './Popular.css'
import { Button } from '../Button'
import Context from '../../store/context'


export class Popular extends Component {
    static contextType = Context
    constructor(props) {
        super(props);
        this.rezervisi=this.rezervisi.bind(this);
        this.osvezi=this.osvezi.bind(this);
        this.state={knjige:[]}
    }
    refreshList(){
        fetch(process.env.REACT_APP_API+'/popular').then(response=>response.json()).then(data=>{this.setState({knjige:data})});
    }
    componentDidMount(){
        this.refreshList();
    }
    rezervisi(event){
        const {state, actions} = this.context;
        event.preventDefault();
        fetch("https://localhost:44335/api/Pretraga",{
            method:'POST',
            headers:{
                
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                idknjiga: event.target.value,
                username: state.korisnik.username,

                
            })
        }).then(res=>res.json()).then((result)=>{
            alert(result)
        },
        (error)=>{
            alert('Failed'+error);
        })
    }
    osvezi(){
        this.refreshList();
    }
    render(){
        const {state, actions} = this.context;
        const {knjige} = this.state;
    return (
        <div className='pop-container'>
            <h1>Popularno</h1>
            <Button  onClick={this.osvezi}>Osveži</Button>
            <div className='knjige'>
            
        {knjige.map(knjiga=>
            <div className='knjiga'>
                
            <div className='title'>
            {knjiga.naslov}
            </div>
            <div className={knjiga.ocena>2 ? 'ocena' : 'ocena-bad'}>
                {knjiga.ocena}/5
            </div>
            <div className='autor'>
            {knjiga.ime + " "+ knjiga.prezime}
            </div>
            <div className='dugme'>
                {state.korisnik.username==='guest'? <Button to='/login'>Rezerviši</Button> : <Button value= {knjiga.idknjiga} onClick={this.rezervisi}>Rezerviši</Button>}
                
            </div>
            
        </div>
            )}
               
            </div>
        </div>
    )
    }
}


