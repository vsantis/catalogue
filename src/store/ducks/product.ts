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
  isSearchingProduct?: boolean;
  productData: ProductData[];
};

const defaultState: ProductState = {
  isSearchingProduct: false,
  productData: [],
};

// Actions Type
enum ActionTypes {
  Loading = 'LOADING',
  SearchProductsSuccess = 'SEARCH_PRODUCTS',
  SearchProductsFail = 'SEARCH_PRODUCTS_FAIL',
}

type Loading = {
  type: typeof ActionTypes.Loading;
  payload?: ProductState;
};

type SearchProductsSuccess = {
  type: typeof ActionTypes.SearchProductsSuccess;
  payload?: ProductState;
};

type SearchProductsFail = {
  type: typeof ActionTypes.SearchProductsFail;
  payload?: ProductState;
};

type ProductActionsType = Loading | SearchProductsSuccess | SearchProductsFail;

// Reducer
export default function product(state = defaultState, action: ProductActionsType): ProductState {
  switch (action.type) {
    case ActionTypes.Loading: {
      return { ...state, isSearchingProduct: true };
    }
    case ActionTypes.SearchProductsSuccess: {
      return {
        ...state,
        isSearchingProduct: false,
        productData: action.payload?.productData.length ? action.payload.productData : [],
      };
    }
    case ActionTypes.SearchProductsFail: {
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
    dispatch({ type: ActionTypes.SearchProductsFail });
  }
};
