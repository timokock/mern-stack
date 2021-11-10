import React, { Component } from 'react'
import axios from 'axios'

class CreateUser extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            users: [], 
            username: ''
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    onChangeUsername = e => {
        this.setState({
            username : e.target.value
        })
    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:4000/api/users')
        this.setState({users: res.data})
    }

    onSubmit = async e => {
        e.preventDefault()
        await axios.post('http://localhost:4000/api/users', {
            username: this.state.username
        })
        this.setState({username: ''})
        this.getUsers()
    }

    deleteUser = async (id) => {        
        await axios.delete('http://localhost:4000/api/users/' + id)
        this.getUsers()
    }

    render() {
        const { username } = this.state
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text"
                                className="form-control"
                                value={username}
                                onChange={this.onChangeUsername}/>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <li
                                className="list-group-item list-group-item-action d-flex justify-content-between"
                                key={user._id}
                                onDoubleClick={() => this.deleteUser(user._id)}
                                >
                                    <h5>{user.username}</h5>
                                    <button className="btn btn-secondary" onClick={() => this.deleteUser(user._id)}>Delete</button>
                                </li>
                                )
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default CreateUser