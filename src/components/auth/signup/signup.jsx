import React, { useState } from 'react'
import { IconButton, InputAdornment, TextField, Grid, Button, Typography, Slide } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSignupMutation } from "../../../services/usersApi";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
export default function Signup() {
    const [passwordType, setPasswordType] = useState(true)

    const [signup, { error }] = useSignupMutation();
    const [errorMessage, setErrorMessage] = useState("")

    const [success, setSuccess] = useState(false)

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")

    const handleShowPassword = () => {
        setPasswordType(!passwordType)
    }
    const [confirmPasswordType, setConfirmPasswordType] = useState(true)

    const handleShowPasswordConfirm = () => {
        setConfirmPasswordType(!confirmPasswordType)
    }

    const handleSubmit = async () => {
        const data = {
            firstName: name,
            lastName: surname,
            password: password,
            confirmPassword: confirmPassword,
            email: email
        }
        if (name && surname && password && confirmPassword && email && confirmPassword === password) {
            await signup(data)
                .unwrap()
                .then(res => {
                    setName("")
                    setSurname("")
                    setPassword("")
                    setConfirmPassword("")
                    setEmail("")
                    setSuccess(true)
                }).catch(err => console.log(err))
        } else {
            confirmPassword === password ? setErrorMessage("Fill in all the fields plz") : setErrorMessage("Passwords does not match")
        }
    }

    return (
        <div className='signup'>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={6}>
                    <TextField
                        value={name}
                        fullWidth
                        required
                        error={false}
                        type="text"
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        placeholder='John'
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        value={surname}
                        fullWidth
                        required
                        error={false}
                        type="text"
                        id="outlined-basic"
                        label="Surname"
                        variant="outlined"
                        placeholder='Wick'
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        value={password}
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
                <Grid item xs={12} md={6}>
                    <TextField
                        value={confirmPassword}
                        fullWidth
                        required
                        error={false}
                        type={confirmPasswordType ? "password" : "text"}
                        id="outlined-basic"
                        label="Confrim password"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPasswordConfirm}>
                                        {confirmPasswordType ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={email}
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
            </Grid>
            <Button onClick={handleSubmit} sx={{ marginTop: "15px" }} fullWidth variant='contained'>Sign up</Button>
            <Typography variant='h6' sx={{ color: "red", margin: "20px 0" }}>
                {JSON.stringify(error?.error ? error.error : error?.data?.message)}
                {errorMessage}
            </Typography>
            <Alert className={`${success ? "alertSignup" : "defaultAlert"}`} severity="success">
                <AlertTitle>Success</AlertTitle>
                Signed up successfully — <strong>You can sign in now!!</strong>
            </Alert>
        </div>)
}
