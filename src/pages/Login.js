import React from 'react';
import { TextField, Container, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
          />
          <TextField
            className={classes.input}
            id='outlined-password-input'
            label='Password'
            type='password'
            autoComplete='current-password'
            variant='outlined'
          />
          <Button variant='outlined' color='primary'>
            Submit
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
