import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QueryString from 'qs';

import { setCategoryId, setPageCount, setFilter } from '../redux/slices/filterSlice';
import { fetchSushi } from '../redux/slices/sushiSlice';

import SushiItem from '../components/SushiItem';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import Skeleton from '../components/SushiItem/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector((state) => state.sushi);
  const { categoryId, sort, pageCount } = useSelector((state) => state.filter);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  const { searchValue } = useContext(SearchContext);

  const getSushi = async () => {
    const sortItem = sort.sortType.replace('-', '');
    const sortOrder = sort.sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    dispatch(
      fetchSushi({
        sortItem,
        sortOrder,
        category,
        searchValue,
        pageCount,
      }),
    );
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = QueryString.stringify({
        sortProperty: sort.sortType,
        categoryId,
        pageCount,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sort.sortType, categoryId, pageCount]);

  useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.substring(1));
      const sort = list.find((list) => list.sortType === params.sortProperty);

      dispatch(
        setFilter({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getSushi();
    }

    isSearch.current = false;
  }, [sort.sortType, categoryId, pageCount, searchValue]);

  return (
    <div className="container">
      <div className="content_top">
        <Categories value={categoryId} onChangeCategory={(id) => onChangeCategory(id)} />
        <Sort />
      </div>
      <h2 className="content_title">All</h2>
      {status === 'error' ? (
        <div className="content_title">
          <h2>An error occurred</h2>
          <p>Failed to load data</p>
        </div>
      ) : (
        <div className="content_items">
          {status === 'loading'
            ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
            : items.map((obj) => <SushiItem key={obj.id} {...obj} />)}
        </div>
      )}
      <div className="content_items">
        {status === 'loading'
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <SushiItem key={obj.id} {...obj} />)}
      </div>
      <Pagination value={pageCount} onChangePage={onChangePage} />
    </div>
  );
}
