import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Toolbar, Typography, InputBase, Container, IconButton } from '@material-ui/core';
import { Search as SearchIcon, Add as AddIcon } from '@material-ui/icons';
import styles from './style';
import FormDialog from '../FormDialog';
import { saveProducts } from '../../store/ducks/product';

type Props = {
  children: JSX.Element;
  onSearch: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function Layout(props: Props) {
  const classes = styles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpenForm = () => {
    setOpen(true);
  };

  const handleClickCloseForm = () => {
    setOpen(false);
  };

  const handleOnSubmit = (data: any) => {
    dispatch(saveProducts(data));
    setOpen(false);
  };

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
          <IconButton color='inherit' size='medium' onClick={handleClickOpenForm}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth='md' className={classes.container}>
        <FormDialog
          type='create'
          open={open}
          onClose={handleClickCloseForm}
          onSubmit={handleOnSubmit}
        />
        {props.children}
      </Container>
    </div>
  );
}
