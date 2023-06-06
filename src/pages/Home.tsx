import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QueryString from 'qs';

import { setCategoryId, setPageCount, setFilter, selectFilter } from '../redux/slices/filterSlice';
import { SearchSushiParams, fetchSushi, selectSushi } from '../redux/slices/sushiSlice';

import SushiItem from '../components/SushiItem';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import Skeleton from '../components/SushiItem/Skeleton';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectSushi);
  const { categoryId, sort, pageCount, searchValue } = useSelector(selectFilter);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
    dispatch(setPageCount(page));
  };

  const getSushi = async () => {
    const sortItem: string = sort.sortType.replace('-', '');
    const sortOrder: string = sort.sortType.includes('-') ? 'asc' : 'desc';
    const category: string = categoryId > 0 ? `category=${categoryId}` : '';

    dispatch(
      fetchSushi({
        sortItem,
        sortOrder,
        category,
        searchValue,
        pageCount: String(pageCount),
      }),
    );
  };

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sort.sortType,
        pageCount,
      };
      const queryString = QueryString.stringify(params, { skipNulls: true });

      navigate(`?${queryString}`);
    }
    // isMounted.current = true;
    if (!window.location.search) {
      dispatch(fetchSushi({} as SearchSushiParams));
    }
  }, [sort.sortType, categoryId, pageCount]);

  useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(
        window.location.search.substring(1),
      ) as unknown as SearchSushiParams;
      const sort = list.find((list) => list.sortType === params.sortItem);

      dispatch(
        setFilter({
          searchValue: params.searchValue,
          categoryId: +params.category,
          pageCount: +params.pageCount,
          sort: sort || list[0],
        }),
      );
    }
    isSearch.current = true;
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    // if (!isSearch.current) {
    getSushi();
    // }

    // isSearch.current = false;
  }, [sort.sortType, categoryId, pageCount, searchValue]);

  return (
    <div className="container">
      <div className="content_top">
        <Categories value={categoryId} onChangeCategory={(id: number) => onChangeCategory(id)} />
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
            : items.map((obj: any) => <SushiItem key={obj.id} {...obj} />)}
        </div>
      )}
      <Pagination pageCount={pageCount} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
