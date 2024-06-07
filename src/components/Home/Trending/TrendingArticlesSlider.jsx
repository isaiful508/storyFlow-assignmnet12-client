import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

const TrendingArticlesSlider = ({ article }) => {
    const { image } = article || {}; // Ensure article is defined and destructure image

    if (!image) {
        return <div>Error: No image provided for the article</div>;
    }
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };




    return (
       
      <>
        {/* <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img src={image} alt="" />
        </SwiperSlide>
       
      </Swiper> */}
      
      </>
        
    );
};

export default TrendingArticlesSlider;
