import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Container } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import styles from './style';

type Props = {
  children: JSX.Element;
  onSearch: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function Layout(props: Props) {
  const classes = styles();

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            CATALOGO
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Buscar…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={props.onSearch}
            />
          </div>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      <Container maxWidth='md' className={classes.container}>
        {props.children}
      </Container>
    </div>
  );
}
