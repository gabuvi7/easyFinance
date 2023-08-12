'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IFlattenedIncomeData } from '@/utils/interfaces/incomes.interface';

// Register ChartJS components using ChartJS.register
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

interface IncomeChartProps {
  incomeFormatedData: IFlattenedIncomeData[];
}
function IncomeChart({ incomeFormatedData }: IncomeChartProps) {
  const dates = incomeFormatedData.map((item) => item.date.substring(0, 6));
  const amounts = incomeFormatedData.map((item) => item.totalIncome);

  return (
    <Line
      data={{
        labels: dates,
        datasets: [
          {
            data: amounts,
            backgroundColor: 'purple',
          },
        ],
      }}
    />
  );
}

export default IncomeChart;
