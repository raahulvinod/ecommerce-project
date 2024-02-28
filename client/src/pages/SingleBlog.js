import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';

import blog from '../images/blog-1.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getABlog } from '../features/blogs/blogSlice';
import Meta from '../components/Meta';
import Container from '../components/Container';
import Loader from '../components/Loader';

const SingleBlog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getBlogId = location.pathname.split('/')[2];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = () => {
    dispatch(getABlog(getBlogId))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Error fetching blog:', error);
        setLoading(false);
      });
  };

  const blogState = useSelector((state) => state?.blog?.singleBlog);

  return (
    <>
      <Meta title={blogState?.title} />
      <BreadCrumb title={blogState?.title} />

      {loading ? (
        <Loader />
      ) : (
        <Container class1="blog-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">
                <Link to="/blogs" className="d-flex align-items-center gap-10">
                  <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
                </Link>
                <h3 className="title">{blogState?.title}</h3>
                <img
                  src={
                    blogState?.images[0].url ? blogState?.images[0].url : blog
                  }
                  className="img-fluid w-100 my-4"
                  alt="blog"
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: blogState?.description,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default SingleBlog;
