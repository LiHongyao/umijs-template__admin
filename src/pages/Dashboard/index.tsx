import React, { FC, useEffect, useRef } from 'react';
// 引入echarts
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import './index.less';

const Dashboard: FC = () => {
  const echartsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (echartsRef.current) {
      const myChart = echarts.init(echartsRef.current);
      myChart.setOption({
        title: {
          text: '模拟数据',
          subtext: '仅供参考',
        },
        tooltip: {},
        legend: {
          data: ['日活'],
        },
        xAxis: {
          data: ['DDOU', 'D迅', '数字通', 'DCEP'],
        },
        yAxis: {},
        series: [
          {
            name: '日活',
            type: 'bar',
            data: [5, 20, 36, 10],
          },
        ],
      });
    }
  }, [echartsRef]);

  // render
  return (
    <div className="page dashboard">
      <h1>天道酬勤</h1>
      <div ref={echartsRef} style={{ width: 500, height: 300 }}></div>
    </div>
  );
};

export default Dashboard;
