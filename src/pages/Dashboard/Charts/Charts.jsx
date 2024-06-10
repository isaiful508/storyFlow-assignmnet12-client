
import Chart from 'react-google-charts';
import useAxiosPublic from './../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Charts = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch articles data
    const { data: articles = [] } = useQuery({
      queryKey: ['articles'],
      queryFn: async () => {
        const res = await axiosPublic.get('/articles');
        return res.data;
      }
    });
  
    // Aggregate articles by publisher
    const publishersCount = articles.reduce((acc, article) => {
      const publisher = article.publisher;
      if (acc[publisher]) {
        acc[publisher]++;
      } else {
        acc[publisher] = 1;
      }
      return acc;
    }, {});
  
    const totalArticles = Object.values(publishersCount).reduce((acc, count) => acc + count, 0);
  
    const pieChartData = [
      ['Publisher', 'Percentage of Articles'],
      ...Object.entries(publishersCount).map(([publisher, count]) => [publisher, (count / totalArticles) * 100])
    ];
  
    const barChartData = [
      ['Publisher', 'Articles'],
      ...Object.entries(publishersCount).map(([publisher, count]) => [publisher, count])
    ];
  
    return (
        <div className="container mx-auto mt-10">
      <div className="noto-700">
        <div>
        <h2 className="text-4xl noto-700 text-center mb-4">Publication Articles Distribution</h2>
        </div>
        <Chart
          chartType="PieChart"
          data={pieChartData}
          options={{
            title: 'Publication Articles Distribution',
            is3D: true,
          }}
          width="100%"
          height="400px"
        />
      </div>

      <div className="chart-container noto-700 mt-10">
        <h2 className="text-2xl noto-700 text-center mb-4">Articles by Publisher (Bar Chart)</h2>
        <Chart
          chartType="BarChart"
          data={barChartData}
          options={{
            title: 'Articles by Publisher',
            hAxis: { title: 'Publisher', minValue: 0 },
            vAxis: { title: 'Articles' },
          }}
          width="100%"
          height="400px"
        />
      </div>
    </div>
    );
};

export default Charts;