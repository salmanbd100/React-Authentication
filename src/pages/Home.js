import React from 'react';
import { Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createAuthProvider } from 'AuthService';
import { useHistory } from 'react-router-dom';
const { logout } = createAuthProvider();

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '50px',
  },
}));

export default function Home() {
  const classes = useStyles();
  let history = useHistory();

  const handleLogOut = () => {
    logout();
    history.push('/login');
  };

  return (
    <Container fixed>
      <div className={classes.root}>
        <h1>Home</h1>
        <Button variant='outlined' onClick={handleLogOut} color='primary'>
          Log Out
        </Button>
      </div>
    </Container>
  );
}
