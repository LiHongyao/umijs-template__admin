import React, { FC, memo, useEffect, useState } from 'react';
import { CascaderOptionType, CascaderValueType } from 'antd/es/cascader';
import { Cascader } from 'antd';

type OptionsType = {
  value: string;
  label: string;
  isLeaf: boolean
}

interface IProps {
  onChange?: (value: CascaderValueType) => void;
}

const CityCascader: FC<IProps> = (props) => {
  const [options, setOptions] = useState<OptionsType[]>([]);
  // events
  const onCascaderChange = (value: CascaderValueType) => {
    props.onChange && props.onChange(value);
  };
  const onLoadData = (selectedOptions?: CascaderOptionType[]) => {
    if (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      setTimeout(() => {
        targetOption.loading = false;
        targetOption.children = [
          {
            label: `武侯区`,
            value: '武侯区',
          },
          {
            label: `高新区`,
            value: '高新区',
          },
          {
            label: `锦江区`,
            value: '锦江区',
          },
        ];
        setOptions([...options]);
      }, 1000);
    }
  };

  // effects
  useEffect(() => {
    setOptions([
      {
        value: '成都市',
        label: '成都市',
        isLeaf: false,
      },
      {
        value: '乐山市',
        label: '乐山市',
        isLeaf: false,
      }
    ]);
  }, []);

  // render
  return (
    <Cascader
      options={options}
      loadData={onLoadData}
      onChange={onCascaderChange}
      changeOnSelect
    />
  );
};

export default memo(CityCascader);
