import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = () => {
  return (
    <div className="blog-card ">
      <div className="card-image">
        <img className="img-fluid w-100" src="/images/blog-1.jpg" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date">12 JUNE, 2023</p>
        <h5 className="title"> Beautiful Sunday Morning renaissance</h5>
        <p className="desc">
          Our Latest News You’re Only As Good As Your Last Collection, Which Is
          An Enormous Pressure.
        </p>
        <Link to="/" className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
