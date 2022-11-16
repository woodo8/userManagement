import React, { useContext, useState } from 'react'
import { IconButton, InputAdornment, TextField, Grid, Button, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSigninMutation } from "../../../services/usersApi";
import { useNavigate } from "react-router-dom"
import { StateContext } from '../../../context/context';
export default function Signin() {
    const [passwordType, setPasswordType] = useState(true)
    const { refetch } = useContext(StateContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [signin, { error }] = useSigninMutation();
    const [errorMessage, seterrorMessage] = useState("")

    const handleShowPassword = () => {
        setPasswordType(!passwordType)
    }

    const navigate = useNavigate()

    const handleSubmit = async () => {
        const user = {
            email: email,
            password: password
        }
        if (email && password) {
            try {
                await signin(user)
                    .unwrap()
                    .then((res) => {
                        console.log(res.result)
                        localStorage.setItem("user", JSON.stringify(res.result))
                        localStorage.setItem("access", res.token)
                        setEmail("")
                        setPassword("")
                        seterrorMessage("")
                        navigate("/")
                        refetch()
                    })
                    .catch((err) => console.error('rejected', err));
            } catch (error) {
                console.log(error)
            }
        } else {
            seterrorMessage("Email and Password are required")
        }
    }
    return (
        <div className='signup'>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        error={false}
                        type="text"
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        placeholder='info@gmail.com'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        error={false}
                        type={passwordType ? "password" : "text"}
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword}>
                                        {passwordType ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Button onClick={handleSubmit} sx={{ marginTop: "15px" }} fullWidth variant='contained'>Sign in</Button>
            <Typography variant='h6' sx={{ color: "red", margin: "20px 0" }}>
                {JSON.stringify(error?.error ? error.error : error?.data?.message)}
                {errorMessage}
            </Typography>
        </div>)
}
