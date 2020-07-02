import React, { useState } from 'react';
import { TextField, Container, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { createAuthProvider } from 'AuthService';
import axios from 'axios';
import baseUrl from 'settings';

const { login } = createAuthProvider();

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '50px',
  },
  paper: {
    maxWidth: 500,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    marginBottom: '20px !important',
    display: 'block',
  },
}));

export default function Login() {
  const classes = useStyles();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  let history = useHistory();

  const onChange = ({ target: { name, value } }) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const onSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    axios
      .post(`${baseUrl.v1}/auth/login`, credentials)
      .then((response) => {
        login(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    history.push('/');
  };

  return (
    <Container fixed>
      <form className={classes.root} noValidate autoComplete='off'>
        <Paper className={classes.paper}>
          <h1>Login :</h1>
          <TextField
            className={classes.input}
            id='outlined-basic'
            label='Username'
            variant='outlined'
            name='username'
            onChange={onChange}
          />
          <TextField
            className={classes.input}
            id='outlined-password-input'
            label='Password'
            type='password'
            autoComplete='current-password'
            variant='outlined'
            name='password'
            onChange={onChange}
          />
          <Button onClick={onSubmit} variant='outlined' color='primary'>
            Submit
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
