import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardHeader, CardMedia, CardContent, Typography } from '@material-ui/core';
import styles from './style';
import { ProductData, deleteProducts, updateProducts } from '../../store/ducks/product';
import FormDialog from '../FormDialog';

const capitalize = (text: string): string =>
  text.trim().replace(/^\w/, (character) => character.toUpperCase());

const formatPrice = (price: number): string =>
  Intl.NumberFormat('en-EN', { style: 'currency', currency: 'CLP' })
    .format(price)
    .split(',')
    .join('.')
    .replace('CLP', '$');

type Props = {
  content: ProductData;
};

export default function RecipeReviewCard(props: Props) {
  const dispatch = useDispatch();
  const classes = styles();
  const [open, setOpen] = useState(false);

  const handleClickOpenForm = () => {
    setOpen(true);
  };

  const handleClickCloseForm = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteProducts(props.content.id));
    setOpen(false);
  };

  const handleOnSubmit = (data: any) => {
    dispatch(updateProducts(props.content.id, data));
    setOpen(false);
  };

  const brand = capitalize(props.content.brand);

  const productName = props.content.name
    .split(' ')
    .map((text: string) => capitalize(text))
    .join(' ');

  const price = formatPrice(Number(props.content.price));

  return (
    <>
      <Card className={classes.root} elevation={3} onClick={handleClickOpenForm}>
        <CardHeader title={`${brand}-${productName}`} subheader={price} />
        <CardMedia className={classes.media} image={props.content.image} title={productName} />
        <CardContent>
          <Typography variant='body2' component='p'>
            {capitalize(props.content.description)}
          </Typography>
        </CardContent>
      </Card>
      <FormDialog
        type='update'
        open={open}
        onClose={handleClickCloseForm}
        onDelete={handleDelete}
        productData={props.content}
        onSubmit={handleOnSubmit}
      />
    </>
  );
}
