import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from './components/Layout';
import AutomaticGrid from './components/AutomaticGrid';
import { RootState } from './store';
import { getProducts } from './store/ducks/product';

const debounce = (func: any, time = 500) => {
  let timeoutId: NodeJS.Timeout;
  return function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const context = this;
    const args = arguments;
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, time);
  };
};

export default function App() {
  const [textToSearch, setTextToSearch] = useState<string | undefined>();
  const dispatch = useDispatch();
  const { products: productSelector } = useSelector((store: RootState) => store);

  useEffect(() => {
    if (!textToSearch || (textToSearch && textToSearch.length > 2))
      dispatch(getProducts(textToSearch));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textToSearch]);

  const searchDebounced = debounce((pattern: string) => {
    setTextToSearch(pattern);
  });

  const handleOnChangeAction = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // @ts-ignore
    searchDebounced(event.target.value);
  };

  return (
    <Layout onSearch={handleOnChangeAction}>
      <AutomaticGrid columns={3} content={productSelector.productData} />
    </Layout>
  );
}
