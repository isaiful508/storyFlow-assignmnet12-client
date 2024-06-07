import CountUp from 'react-countup';


const StatisticCount = ({allUser}) => {
    return (
        <div className="mt-20 text-center  w-full">
        <div className="stats stats-vertical lg:stats-horizontal shadow-lg w-full">

            <div className="stat">
                <div className="stat-title text-2xl noto-600">All Users</div>
                <div className="stat-value">
                <CountUp
                end={31}
                duration={2.75}
                />
                    </div>
               
            </div>

            <div className="stat">
                <div className="stat-title text-2xl noto-600">Normal Users</div>
                <div className="stat-value">4,200</div>
                
            </div>

            <div className="stat">
                <div className="stat-title text-2xl noto-600">Premium Users</div>
                <div className="stat-value">1,200</div>
                
            </div>

        </div>
    </div>
    );
};

export default StatisticCount;