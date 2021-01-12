import { DispatchType } from '../index';
import axios, { AxiosRequestConfig } from 'axios';

export type ProductData = {
  id: number;
  brand: string;
  image: string;
  name: string;
  description: string;
  price: number;
};

// Default State
type ProductState = {
  isLoading?: boolean;
  productData: ProductData[];
};

const defaultState: ProductState = {
  isLoading: false,
  productData: [],
};

// Actions Type
enum ActionTypes {
  Loading = 'LOADING',
  SearchProductsSuccess = 'SEARCH_PRODUCTS',
  CreateProductsSuccess = 'CREATE_PRODUCTS',
  DeleteProductSuccess = 'DELETE_PRODUCTS',
  UpdateProductSuccess = 'UPDATE_PRODUCTS',
  ActionsProductsFail = 'ACTIONS_PRODUCTS_FAIL',
}

type Loading = {
  type: typeof ActionTypes.Loading;
  payload?: ProductState;
};

type SearchProductsSuccess = {
  type: typeof ActionTypes.SearchProductsSuccess;
  payload?: ProductState;
};

type CreateProductsSuccess = {
  type: typeof ActionTypes.CreateProductsSuccess;
  payload?: ProductState;
};

type DeleteProductsSuccess = {
  type: typeof ActionTypes.DeleteProductSuccess;
  payload?: boolean;
};

type UpdateProductSuccess = {
  type: typeof ActionTypes.UpdateProductSuccess;
  payload?: ProductState;
};

type ActionsProductsFail = {
  type: typeof ActionTypes.ActionsProductsFail;
  payload?: ProductState;
};

type ProductActionsType =
  | Loading
  | SearchProductsSuccess
  | ActionsProductsFail
  | DeleteProductsSuccess
  | UpdateProductSuccess
  | CreateProductsSuccess;

// Reducer
export default function product(state = defaultState, action: ProductActionsType): ProductState {
  switch (action.type) {
    case ActionTypes.Loading: {
      return { ...state, isLoading: true };
    }
    case ActionTypes.SearchProductsSuccess: {
      return {
        ...state,
        isLoading: false,
        productData: action.payload?.productData.length ? action.payload.productData : [],
      };
    }
    case ActionTypes.CreateProductsSuccess: {
      return {
        ...state,
        isLoading: false,
        // @ts-ignore
        productData: [...state.productData, ...action.payload?.productData],
      };
    }
    case ActionTypes.DeleteProductSuccess: {
      if (action.payload) {
        // @ts-ignore
        const idxToDelete = state.productData.findIndex((element) => element.id === action.payload);
        state.productData.splice(idxToDelete, 1);
      }
      return {
        ...state,
        isLoading: false,
        productData: state.productData,
      };
    }
    case ActionTypes.UpdateProductSuccess: {
      const products = action.payload
        ? state.productData.map((product) =>
            // @ts-ignore
            action.payload?.id === product.id ? action.payload : product
          )
        : state.productData;
      return {
        ...state,
        isLoading: false,
        // @ts-ignore
        productData: products,
      };
    }
    case ActionTypes.ActionsProductsFail: {
      return { ...defaultState };
    }
    default: {
      return state;
    }
  }
}

// Action Creators
export const getProducts = (text?: string) => async (
  dispatch: DispatchType<ProductActionsType>
) => {
  dispatch({ type: ActionTypes.Loading });
  try {
    const searchPath = text ? `/${text}` : '';
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${process.env.REACT_APP_BACK_URL}${searchPath}`,
    };

    const response = await axios(config);
    dispatch({ type: ActionTypes.SearchProductsSuccess, payload: { productData: response.data } });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionTypes.ActionsProductsFail });
  }
};

export const saveProducts = (product: ProductData) => async (
  dispatch: DispatchType<ProductActionsType>
) => {
  dispatch({ type: ActionTypes.Loading });
  try {
    product.image = `${process.env.REACT_APP_DEFAULT_IMAGE}`;
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${process.env.REACT_APP_BACK_URL}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(product),
    };

    const response = await axios(config);
    dispatch({
      type: ActionTypes.CreateProductsSuccess,
      payload: { productData: response.data ? [response.data] : [] },
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionTypes.ActionsProductsFail });
  }
};

export const deleteProducts = (id: number) => async (
  dispatch: DispatchType<ProductActionsType>
) => {
  try {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `${process.env.REACT_APP_BACK_URL}/${id}`,
    };
    const result = await axios(config);
    dispatch({
      type: ActionTypes.DeleteProductSuccess,
      // @ts-ignore
      payload: result.data ? id : null,
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionTypes.ActionsProductsFail });
  }
};

export const updateProducts = (id: number, product: ProductData) => async (
  dispatch: DispatchType<ProductActionsType>
) => {
  try {
    product.image = `${process.env.REACT_APP_DEFAULT_IMAGE}`;
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `${process.env.REACT_APP_BACK_URL}/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(product),
    };

    const result = await axios(config);
    if (result.data) {
      product['id'] = id;
    }
    dispatch({
      type: ActionTypes.UpdateProductSuccess,
      // @ts-ignore
      payload: result.data ? product : null,
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: ActionTypes.ActionsProductsFail });
  }
};
