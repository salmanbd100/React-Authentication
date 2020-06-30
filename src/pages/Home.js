import React from 'react';
import { Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '50px',
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Container fixed>
      <div className={classes.root}>
        <h1>Home</h1>
        <Button variant='outlined' color='primary'>
          Log Out
        </Button>
      </div>
    </Container>
  );
}
