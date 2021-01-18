import React, { FC, useEffect, useRef } from 'react';
// 引入echarts
import * as echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import './index.less';

const Dashboard: FC = () => {
  const echartsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (echartsRef.current) {
      const myChart = echarts.init(echartsRef.current);
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例',
        },
        tooltip: {},
        legend: {
          data: ['销量'],
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
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
