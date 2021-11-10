import React, { Component } from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import { Link } from "react-router-dom"

class NotesList extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             notes: []
        }
    }


    componentDidMount() {
        this.getNotes()
    }

    async getNotes() {
        const res = await axios.get('http://localhost:4000/api/notes')
        this.setState({notes: res.data})
    }

    deleteNote = async (id) => {
        await axios.delete('http://localhost:4000/api/notes/' + id)
        this.getNotes()
    }

    render() {
        return (
            <div className="row">
                {this.state.notes.map(notes => (
                    <div className="col-md-4 p-2" key={notes._id}>
                        <div className="card">
                            <div className="card-header">
                                <h5>{notes.title}</h5>
                            </div>
                            <div className="card-body">
                                <p>{notes.content}</p>
                                <p>Author: {notes.author}</p>
                                <p>{format(notes.date)}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <Link className="btn btn-primary" to={'/edit/' + notes._id}>Edit</Link>
                                <button className="btn btn-danger" onClick={() => this.deleteNote(notes._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default NotesList