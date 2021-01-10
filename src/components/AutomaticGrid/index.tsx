import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { ProductData } from '../../store/ducks/product';
import ProductCard from '../ProductCard';

type Props = {
  columns: number;
  content: ProductData[];
};

export default function AutomaticGrid(props: Props) {
  const [columnSize, setColumnSize] = useState<any>();

  useEffect(() => {
    setColumnSize(Math.trunc(12 / props.columns));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Grid
        item
        container
        direction='row'
        justify='space-between'
        alignItems='flex-start'
        spacing={4}>
        {props.content.length > 0 ? (
          props.content.map((content, index) => {
            return (
              <Grid item xs={columnSize} key={index}>
                <ProductCard
                  brand={content.brand}
                  productName={content.name}
                  description={content.description}
                  price={content.price.toString()}
                  imageUrl={content.image}
                />
              </Grid>
            );
          })
        ) : (
          <Typography variant='h3'>{':( NO SE ENCONTRARON PRODUCTOS'}</Typography>
        )}
      </Grid>
    </div>
  );
}
