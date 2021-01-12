import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import styles from './style';
import { ProductData } from '../../store/ducks/product';

type Props = {
  type: 'create' | 'update';
  open: boolean;
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  onSubmit?: any;
  productData?: ProductData;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function FormDialog(props: Props) {
  const classes = styles();
  const { register, handleSubmit, control } = useForm<ProductData>();

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>
          {props.type === 'update' ? 'Modificar item' : 'Crea un nuevo item'}
          {props.type === 'update' ? (
            <IconButton
              aria-label='delete'
              color='secondary'
              className={classes.deleteButton}
              onClick={props.onDelete}>
              <DeleteIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para {props.type === 'update' ? 'modificar un ' : 'crear un nuevo'} item debes completar
            este formulario.
          </DialogContentText>
          <form onSubmit={handleSubmit(props.onSubmit)}>
            <Controller
              as={TextField}
              name='brand'
              control={control}
              defaultValue={props.type === 'update' ? props.productData?.brand : ''}
              label='Marca'
              fullWidth={true}
              {...props}
            />
            <Controller
              as={TextField}
              name='name'
              control={control}
              defaultValue={props.type === 'update' ? props.productData?.name : null}
              label='Nombre'
              fullWidth={true}
              {...props}
            />
            <Controller
              as={TextField}
              name='description'
              control={control}
              defaultValue={props.type === 'update' ? props.productData?.description : null}
              label='Descripción'
              fullWidth={true}
              {...props}
            />
            <Controller
              as={TextField}
              name='price'
              control={control}
              defaultValue={props.type === 'update' ? props.productData?.price : null}
              label='Precio'
              fullWidth={true}
              {...props}
            />
            <Button type='submit' variant='contained' color='primary'>
              Guardar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
