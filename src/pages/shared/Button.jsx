
const Button = ({name}) => {
    return (
        <button className='btn text-white hover:bg-blue-500 w-full bg-blue-600'>
            {name}
        </button>
    );
};

export default Button;