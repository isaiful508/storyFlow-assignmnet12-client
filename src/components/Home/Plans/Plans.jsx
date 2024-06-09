
import { Link } from 'react-router-dom';

const Plans = () => {
    return (
        <div className="bg-white mt-20 dark:bg-gray-900">
            <div className="container px-6 py-8 mx-auto">
                <div className="flex flex-col items-center justify-center space-y-8 lg:-mx-4 lg:flex-row lg:items-stretch lg:space-y-0">
                    <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-900 dark:border-gray-700">
                        <div className="flex-shrink-0">
                            <h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-[#5f59f7] uppercase rounded-lg bg-gray-50 dark:bg-gray-700">
                                Casual
                            </h2>
                        </div>

                        <div className="flex-shrink-0">
                            <span className="pt-2 text-3xl font-bold text-gray-800 uppercase dark:text-gray-100">
                                Free
                            </span>
                        </div>

                        <ul className="flex-1 space-y-4">
                            <li className="text-gray-500 dark:text-gray-400">See All News except premium news</li>
                            <li className="text-gray-500 dark:text-gray-400">Free For 14 days </li>

                        </ul>

                        <button className="text-white uppercase  btn  hover:bg-[#5f59f7] w-full bg-[#343090]">
                            Start free
                        </button>
                    </div>

                    <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-900 dark:border-gray-700">
                        <div className="flex-shrink-0">
                            <h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-[#5f59f7]  uppercase rounded-lg bg-gray-50 dark:bg-gray-700">
                                Premium Dou
                            </h2>
                        </div>

                        <div className="flex-shrink-0">
                            <span className="pt-2 text-3xl font-bold text-gray-800 uppercase dark:text-gray-100">
                                $1000
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">/Day</span>
                        </div>

                        <ul className="flex-1 space-y-4">
                            <li className="text-gray-500 dark:text-gray-400">Up to 10 projects</li>
                            <li className="text-gray-500 dark:text-gray-400">Up to 20 collaborators</li>
                            <li className="text-gray-500 dark:text-gray-400">10Gb of storage</li>
                            <li className="text-gray-500 dark:text-gray-400">Real-time collaborations</li>
                        </ul>

                        <Link to='/subscription/premiumDuo/1000' className="text-white uppercase  btn  hover:bg-[#5f59f7] w-full bg-[#343090]">
                            Get premium dou
                        </Link>
                    </div>

                    <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-900 dark:border-gray-700">
                        <div className="flex-shrink-0">
                            <h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-[#5f59f7] uppercase rounded-lg bg-gray-50 dark:bg-gray-700">
                                premium family
                            </h2>
                        </div>

                        <div className="flex-shrink-0">
                            <span className="pt-2 text-3xl font-bold text-gray-800 uppercase dark:text-gray-100">
                                $700
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">/Day</span>
                        </div>

                        <ul className="flex-1 space-y-4">
                            <li className="text-gray-500 dark:text-gray-400">Unlimited projects</li>
                            <li className="text-gray-500 dark:text-gray-400">Unlimited collaborators</li>
                            <li className="text-gray-500 dark:text-gray-400">Unlimited storage</li>
                            <li className="text-gray-500 dark:text-gray-400">Real-time collaborations</li>
                            <li className="text-gray-500 dark:text-gray-400">24x7 Support</li>
                        </ul>

                        <Link to="/subscription/premiumFamily/50" className="text-white uppercase  btn  hover:bg-[#5f59f7] w-full bg-[#343090]">
                            get premium family
                        </Link >
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Plans;