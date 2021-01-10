import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography } from '@material-ui/core';
import styles from './style';

const capitalize = (text: string): string =>
  text.trim().replace(/^\w/, (character) => character.toUpperCase());

const formatPrice = (price: number): string =>
  Intl.NumberFormat('en-EN', { style: 'currency', currency: 'CLP' })
    .format(price)
    .split(',')
    .join('.')
    .replace('CLP', '$');

type Props = {
  brand: string;
  productName: string;
  description: string;
  price: string;
  imageUrl: string;
};

export default function RecipeReviewCard(props: Props) {
  const classes = styles();

  const brand = capitalize(props.brand);

  const productName = props.productName
    .split(' ')
    .map((text) => capitalize(text))
    .join(' ');

  const price = formatPrice(Number(props.price));

  return (
    <Card className={classes.root} elevation={3}>
      <CardHeader title={`${brand}-${productName}`} subheader={price} />
      <CardMedia className={classes.media} image={props.imageUrl} title={productName} />
      <CardContent>
        <Typography variant='body2' component='p'>
          {capitalize(props.description)}
        </Typography>
      </CardContent>
    </Card>
  );
}
