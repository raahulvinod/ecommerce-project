import { Link } from 'react-router-dom';

const BlogCard = ({ id, title, description, image, date }) => {
  return (
    <div className="">
      <div className="blog-card">
        <div className="card-image">
          <img
            className="img-fluid"
            src={image ? image : '/images/blog-1.jpg'}
            alt="blog"
          />
        </div>
        <div className="blog-content">
          <p className="date">{date}</p>
          <h5 className="title">{title}</h5>
          <p
            className="desc"
            dangerouslySetInnerHTML={{
              __html: description?.substr(0, 100) + '...',
            }}
          ></p>
          <Link to={`/blog/${id}`} className="button text-center">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
