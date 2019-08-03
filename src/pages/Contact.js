import React, { Component } from 'react';
import axios from "axios";

export default class Contact extends Component {

    constructor(props){
        super(props);
        this.state ={
            name:"",
            surname:"",
            message:"",
        }
    }

     changeInput = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    sendMessage = async (e) =>{
        e.preventDefault();
        const {name,surname,message} = this.state;
        const newMessage = {
            name,
            surname,
            message
        }

        this.setState({
            name:"",
            surname:"",
            message:""
        })

        await axios.post("http://localhost:8080/messages",newMessage);
        console.log("New Message",newMessage);
    }

    render() {
        const {name,surname,message} = this.state;
        return (
            <div className="col-md-8" >
                <form onSubmit={this.sendMessage}>
                    <div className="form-group">
                        <label htmlFor="name">Ad</label>
                        <input 
                        type="text"
                        placeholder="Adınız"
                        name="name"
                        value={name}
                        onChange={this.changeInput}
                        required
                        className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Soyad</label>
                        <input 
                        type="text"
                        placeholder="Soyadınız"
                        name="surname"
                        value={surname}
                        onChange={this.changeInput}
                        required
                        className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Mesaj</label>
                        <textarea 
                        type="textarea"
                        placeholder="Mesajınız"
                        name="message"
                        value={message}
                        onChange={this.changeInput}
                        required
                        className="form-control" />
                    </div>
                    <button className="btn btn-danger btn-block">
                        GÖNDER
                </button>
                </form>
            </div>
        )
    }

}
