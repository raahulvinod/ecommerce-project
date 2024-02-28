import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import Container from '../components/Container';
import { getAllProducts } from '../features/products/productSlice';
import Loader from '../components/Loader';

const OurStore = () => {
  const dispatch = useDispatch();
  const [grid, setGrid] = useState(4);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  //Filter States
  const [tag, setTag] = useState(null);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setminPrice] = useState(null);
  const [maxPrice, setmaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  const productState = useSelector((state) => state.product.product);

  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice]);

  useEffect(() => {
    let newBrand = [];
    let newCategory = [];
    let newTags = [];
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      newBrand.push(element.brand);
      newCategory.push(element.category);
      newTags.push(element.tags);
    }
    setBrands(newBrand);
    setCategories(newCategory);
    setTags(newTags);
  }, [productState]);

  const getProducts = () => {
    dispatch(getAllProducts({ sort, tag, brand, category, minPrice, maxPrice }))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  };

  return (
    <>
      <Meta title="Our Store" />
      <BreadCrumb title="Our Store" />

      <Container class1="store-wrapper home-wrapper-2 py-5">
        <button
          type="button"
          class="btn input-group-text d-lg-none mb-1"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Shop By Categories
        </button>
        <div className="row">
          <div className="d-none d-lg-block col-lg-3 col-md-12">
            <div className="filter-card mb-3">
              <div className="filter-title">Shop By Categories</div>
              <div>
                <ul className="ps-0">
                  {categories &&
                    [...new Set(categories)].map((item, index) => {
                      return (
                        <li key={index} onClick={() => setCategory(item)}>
                          {item}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>

              <h5 className="sub-title">Price</h5>
              <div className="d-flex align-items-center gap-10">
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput"
                    placeholder="From"
                    onChange={(e) => setminPrice(e.target.value)}
                  />
                  <label htmlFor="floatingInput">From</label>
                </div>
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInput1"
                    placeholder="To"
                    onChange={(e) => setmaxPrice(e.target.value)}
                  />
                  <label htmlFor="floatingInput1">To</label>
                </div>
              </div>
              <h5 className="sub-title">Availability</h5>
              <div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" />
                  <label htmlFor="" className="form-check-label">
                    In stock (22)
                  </label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" />
                  <label htmlFor="" className="form-check-label">
                    Out of stock (1)
                  </label>
                </div>
              </div>
              <div className="mt-4 mb-3">
                <h3 className="sub-title">Product Tags</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                    {tags &&
                      [...new Set(tags)].map((item, index) => {
                        return (
                          <span
                            key={index}
                            className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3"
                            onClick={() => setTag(item)}
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="mt-4 mb-3">
                <h3 className="sub-title">Product Brands</h3>
                <div>
                  <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                    {brands &&
                      [...new Set(brands)].map((item, index) => {
                        return (
                          <span
                            key={index}
                            className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3 cursor-pointer"
                            onClick={() => setBrand(item)}
                          >
                            {item}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-12">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: '100px' }}>
                    Sort By:
                  </p>
                  <select
                    name=""
                    id=""
                    defaultValue={'manual'}
                    className="form-control form-select"
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">Alphabetically, Z-A</option>
                    <option value="-price">Price, high to low</option>
                    <option value="price">Price, low to high</option>
                    <option value="-createdAt">Date, new to old</option>
                    <option value="createdAt">Date, old to new</option>
                  </select>
                </div>
                <div className="d-none d-lg-flex align-items-center gap-10">
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />

                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              {loading ? (
                <Loader message={'Fetching products, please wait...'} />
              ) : (
                <div className="d-flex gap-10 flex-wrap">
                  <ProductCard data={productState} grid={grid} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
      {/* Modal  */}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog d-lg-none">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Shop By Categories
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="filter-card mb-3">
                <div>
                  <ul className="ps-0">
                    {categories &&
                      [...new Set(categories)].map((item, index) => {
                        return (
                          <li key={index} onClick={() => setCategory(item)}>
                            {item}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className="filter-card">
                <h3 className="filter-title">Filter By</h3>

                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      onChange={(e) => setminPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      onChange={(e) => setmaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>

                <div className="mt-4 mb-3">
                  <h3 className="sub-title">Product Tags</h3>
                  <div>
                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                      {tags &&
                        [...new Set(tags)].map((item, index) => {
                          return (
                            <span
                              key={index}
                              className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3"
                              onClick={() => setTag(item)}
                            >
                              {item}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="mt-4 mb-3">
                  <h3 className="sub-title">Product Brands</h3>
                  <div>
                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                      {brands &&
                        [...new Set(brands)].map((item, index) => {
                          return (
                            <span
                              key={index}
                              className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3 cursor-pointer"
                              onClick={() => setBrand(item)}
                            >
                              {item}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                className="button border-0"
                data-bs-dismiss="modal"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
