/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";


const UserArticleCard = ({ article }) => {
  const { title,
    description,
    image,
    publisher,
    tags,
    _id,
    isPremium


  } = article;

  const sliceDescription = (text) => {
    return text.split(' ').slice(0, 18).join(' ');

  };

  //design for premium card
  
  const premiumDesign = isPremium === "yes"
    ? 'bg-green-200 border-green-500'
    : 'bg-red-200 border-red-500';



  return (
    <div className={`card card-compact w-96 shadow-xl ${premiumDesign}`}>
      <figure><img src={image} alt="Shoes" /></figure>
      <div className="card-body">
        <h2 className="card-title noto-700">{title}</h2>
        <p className="noto-600">{sliceDescription(description)} . . .</p>
        <p className="font-semibold">Publisher: {publisher}</p>
        <div className="tags flex flex-wrap items-center gap-5 justify-between">
          {tags.map((tag, index) => (
            <span key={index} className="badge p-4 bg-green-400 text-white m-1"># {tag}</span>
          ))}

        </div>

        <div className="card-actions">
          <Link
            to={`/articles/${_id}`}
            className="btn text-white hover:bg-[#5f59f7] bg-[#343090]">Details</Link>
        </div>
      </div>
    </div>
  );
};

export default UserArticleCard;