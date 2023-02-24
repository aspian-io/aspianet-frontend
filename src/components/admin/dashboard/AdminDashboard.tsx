import React, { FC, useEffect, useState } from 'react';
import AdminCard from '../common/AdminCard';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { AdminDashboardAgent } from '../../../lib/axios/agent';
import { useSession } from 'next-auth/react';
import {
  IDashboardPostsStatsDto,
  IDashboardSystemStats,
  MemoryStats,
} from '../../../models/dashboard/dashboard';
import prettyBytes from 'pretty-bytes';

interface IProps {
  systemStats: IDashboardSystemStats;
  postStats: IDashboardPostsStatsDto;
}

const AdminDashboard: FC<IProps> = ({
  systemStats,
  postStats: { blogsNumber, newsNumber, projectsNumber },
}) => {
  const { data: session } = useSession();
  const [cpuData, setCpuData] = useState([systemStats.cpuUsagePercentage, 100]);
  const [memoryData, setMemoryData] = useState<MemoryStats>({
    totalMemMb: systemStats.memoryUsage.totalMemMb,
    usedMemMb: systemStats.memoryUsage.usedMemMb,
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const systemStats = await AdminDashboardAgent.systemStats(session);
      setCpuData([
        systemStats.cpuUsagePercentage,
        100 - systemStats.cpuUsagePercentage,
      ]);
      setMemoryData({
        totalMemMb: systemStats.memoryUsage.totalMemMb * 1024 * 1024,
        usedMemMb: systemStats.memoryUsage.usedMemMb * 1024 * 1024,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [session]);

  ChartJS.register(ArcElement);

  return (
    <div className="flex flex-col justify-start items-start">
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
        <AdminCard
          className="relative flex flex-col justify-start items-center w-full sm:w-1/2 h-80 min-w-min"
          bgColorClassName="bg-danger"
        >
          <div className="flex flex-row justify-start items-center w-full text-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
              />
            </svg>

            <h4 className="font-bold text-base ml-2">CPU:</h4>
          </div>
          <div className="flex justify-center items-center w-full h-full my-10">
            <div className="relative max-h-[11rem] max-w-[11rem]">
              <div className="absolute inset-0 flex justify-center items-center -z-10 text-light font-bold">{`${cpuData[0]}%`}</div>
              <Doughnut
                data={{
                  datasets: [
                    {
                      data: cpuData,
                      backgroundColor: ['#EB184A', '#F26D8D'],
                      borderWidth: 0,
                      //@ts-ignore
                      cutout: '80%',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                }}
              />
            </div>
          </div>
        </AdminCard>
        <AdminCard
          className="relative flex flex-col justify-start items-center w-full sm:w-1/2 h-80 min-w-min"
          bgColorClassName="bg-primary"
        >
          <div className="flex flex-row justify-start items-center w-full text-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>

            <h4 className="font-bold text-base ml-2">Memory:</h4>
          </div>
          <div className="flex justify-center items-center w-full h-full my-10">
            <div className="relative max-h-[11rem] max-w-[11rem]">
              <div className="absolute inset-0 flex justify-center items-center -z-10 text-light font-bold text-xs">
                {prettyBytes(memoryData.usedMemMb, { binary: true })} /{' '}
                {prettyBytes(memoryData.totalMemMb, { binary: true })}
              </div>
              <Doughnut
                data={{
                  datasets: [
                    {
                      data: [memoryData.usedMemMb, memoryData.totalMemMb],
                      backgroundColor: ['#5E4FD8', '#A29AE8'],
                      borderWidth: 0,
                      //@ts-ignore
                      cutout: '80%',
                    },
                  ],
                }}
              />
            </div>
          </div>
        </AdminCard>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full mt-8">
        <AdminCard
          className="relative flex flex-col justify-start items-center w-full sm:w-1/3 h-80 min-w-min border-2 border-primary"
        >
          <div className="flex flex-row justify-start items-center w-full text-primary">
            <h4 className="font-bold text-base ml-2">All Blogs:</h4>
          </div>
          <div className="flex justify-center items-center w-full h-full my-10 text-6xl text-primary">
            {blogsNumber}
          </div>
        </AdminCard>

        <AdminCard
          className="relative flex flex-col justify-start items-center w-full sm:w-1/3 h-80 min-w-min border-2 border-primary"
        >
          <div className="flex flex-row justify-start items-center w-full text-primary">
            <h4 className="font-bold text-base ml-2">All News:</h4>
          </div>
          <div className="flex justify-center items-center w-full h-full my-10 text-6xl text-primary">
            {newsNumber}
          </div>
        </AdminCard>

        <AdminCard
          className="relative flex flex-col justify-start items-center w-full sm:w-1/3 h-80 min-w-min border-2 border-primary"
        >
          <div className="flex flex-row justify-start items-center w-full text-primary">
            <h4 className="font-bold text-base ml-2">All Projects:</h4>
          </div>
          <div className="flex justify-center items-center w-full h-full my-10 text-6xl text-primary">
            {projectsNumber}
          </div>
        </AdminCard>
      </div>
    </div>
  );
};

export default AdminDashboard;
