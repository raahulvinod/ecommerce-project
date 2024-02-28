import React, { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import BlogCard from '../components/BlogCard';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blogs/blogSlice';
import moment from 'moment';
import Loader from '../components/Loader';

const Blog = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = () => {
    dispatch(getAllBlogs())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  };

  const blogState = useSelector((state) => state?.blog?.blog);

  return (
    <>
      <Meta title="Blogs" />
      <BreadCrumb title="Blogs" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-lg-3 d-none d-lg-block">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                  <li>Watches</li>
                  <li>Tv</li>
                  <li>Camera</li>
                  <li>Laptop</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row">
              {loading ? (
                <Loader />
              ) : (
                blogState?.map((blog, index) => {
                  return (
                    <div
                      className="col-lg-4 col-md-6 col-sm-12 mb-3"
                      key={index}
                    >
                      <BlogCard
                        id={blog?._id}
                        title={blog?.title}
                        description={blog?.description}
                        image={blog?.images[0]?.url}
                        date={moment(blog?.createdAt).format(
                          'MMMM Do YYYY, h:mm a'
                        )}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
