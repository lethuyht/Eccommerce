import React, { useEffect, useMemo, useState } from 'react';
import styles from './product.module.css';
import ProductList from './components/ProductList';
import NavBar from 'components/Header';
import Slider from './components/Slider/Slider';
import Coupon from './components/Coupon/Coupon';
import Footer from './components/Footer/Footer';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import ProductFilters from './components/ProductFilters/ProductFilter';
// import ClipLoader from 'react-spinners/ClipLoader';
import ProductSkeletonList from './ProductSkeletonList';
function Product() {
  const location = useLocation();
  const history = useHistory();
  const [productList, setProductList] = useState();
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 12,
    total: 12,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      page: Number.parseInt(params.page) || 0,
      limit: Number.parseInt(params.limit) || 20,
    };
  }, [location.search]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    const filters = {
      ...queryParams,
      page: page - 1,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className={styles.sweet_loading}>
          <ClipLoader color={'#F5A623'} loading={loading} size={40} />
          <span>Please Wait</span>
        </div>
      ) : (
        <React.Fragment>
          <NavBar />
          {/* <Slider /> */}
          <Coupon />
          <ProductFilters onChange={handleFiltersChange} />
          <div className={styles.container}>
            <div className={styles.grid}>
              <div className={styles.grid__row}>
                {loading ? (
                  <ProductSkeletonList length={12} />
                ) : (
                  <ProductList data={productList} />
                )}
              </div>
              <div className="product__pagination">
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </div>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Product;