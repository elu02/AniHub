import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const baseURL = 'http://localhost:3001'

const RegisterResponse = ({msg}) => {
    if (msg === "E1") {
        return <div>error, username must be between 3 and 30 characters and password must be between 8 and 30 characters</div>
    } else if (msg === "E2") {
        return <div>error, username is taken</div>
    } else if (msg === "OK") {
        return <div>Success!</div>
    } else {
        return <div></div>
    }
}

const Login = ({ userid, setUserid, tab }) => {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ usernameLogin, setUsernameLogin ] = useState("")
    const [ passwordLogin, setPasswordLogin ] = useState("")
    const [ loginError, setLoginError ] = useState(false)
    const [ registerMsg, setRegisterMsg ] = useState("")

    const registerUser = (e) => {
        e.preventDefault()
        axios.post(`${baseURL}/register`, {
            username: username,
            password: password
        }).then((res) => {
            res = res.data
            if (res === "E1") {
                setRegisterMsg("E1")
            } else if (res === "E2") {
                setRegisterMsg("E2")
            } else if (res === "OK") {
                setRegisterMsg("OK")
            }
        })
    }

    const loginUser = (e) => {
        e.preventDefault()
        axios.post(`${baseURL}/login`, {
            username: usernameLogin,
            password: passwordLogin
        })
        .then((resp) => {
            resp = resp.data;
            if (resp === "not found") {
                setLoginError(true)
                return;
            }
            setLoginError(false)
            setUserid(resp[0].id)
        })
    }
    
    const logoutUser = (e) => {
        e.preventDefault()
        setUserid(-1);
    }

    useEffect(() => {
        localStorage.setItem('userID', JSON.stringify(userid))
    })

    return (<div className='login-container'>
        <div className="internal-login-container">
            <Tabs defaultActiveKey={tab}>
                <Tab eventKey="login" title="Login">
                    <Form onSubmit={loginUser}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={usernameLogin} placeholder="Enter your Username"
                                onChange={(e) => {setUsernameLogin(e.target.value)}} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={passwordLogin} type="password" placeholder="Enter your Password" 
                                onChange={(e) => {setPasswordLogin(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">Login</Button>
                    </Form>
                    <div style={{color:"red"}}>{loginError ? "Username or password is incorrect" : ""}</div>
                </Tab> 
                <Tab eventKey="register" title="Register">
                    <Form onSubmit={registerUser}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={username} placeholder="Create Username"
                                onChange={(e) => {setUsername(e.target.value)}} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={password} type="password" placeholder="Create Password" 
                                onChange={(e) => {setPassword(e.target.value)}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">Register</Button>
                    </Form>
                    <RegisterResponse msg={registerMsg} />
                </Tab>
                <Tab eventKey="logout" title="Logout">
                    <Form style={{padding: "10px"}} onSubmit={logoutUser}>
                        Are you sure? <Button variant="primary" type="submit">Yes</Button>
                    </Form>
                    <div style={{color:"red"}}>{loginError ? "Username or password is incorrect" : ""}</div>
                </Tab>
            </Tabs>
        </div>
    </div>)
}

export default Login