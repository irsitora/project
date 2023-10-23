// import Chart from 'chart.js/auto';
import 'chart.js/auto';
import { t } from 'i18next';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export function DoughnutDiagram({ cementRatio, sandRatio }) {
  const cementRatioToNumber = parseInt(cementRatio);
  const sandRatioToNumber = parseInt(sandRatio);
  const data = {
    labels: ['Cement Ratio', 'Sand Ratio'],
    datasets: [
      {
        label: '4 of Votes',
        data: [cementRatioToNumber, sandRatioToNumber],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Doughnut data={data} />
    </>
  );
}

export const DoughnutDiagramArea = ({ upComing, archived }) => {
  const upComingToNumber = parseInt(upComing);
  const archivedToNumber = parseInt(archived);
  const data = {
    labels: [`${t('doctor.archived')}`, `${t('doctor.upcoming')}`],
    datasets: [
      {
        label: 'Details',
        data: [upComingToNumber, archivedToNumber],
        backgroundColor: ['#C0DEFF', '#FFE5F1'],
        borderColor: ['#C0DEFF', '#FFE5F1'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Doughnut data={data} />
    </>
  );
};
