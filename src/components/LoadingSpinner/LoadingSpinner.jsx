import { Hourglass } from "react-loader-spinner";


const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center mt-20">
            (<Hourglass
                visible={true}
                height="200"
                width="150"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#5f59f7', '#72a1ed']}
            />)
        </div>
    );
};

export default LoadingSpinner;