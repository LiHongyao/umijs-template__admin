/*
 * @Author: Li-HONGYAO
 * @Date: 2020-11-23 10:38:41
 * @LastEditTime: 2021-01-05 15:02:45
 * @LastEditors: Li-HONGYAO
 * @Description: 
 * @FilePath: /umijs-template__admin/src/constants/interface.d.ts
 */
// 提示：全局ts类型定义，使用时需将XXX修改为项目名称，如DDOUH5，将‘XXX’ 修改为 ‘DDOUH5’
// 访问：DDOUH5.BaseResponse

export = DP;
export as namespace DP;

declare global {
  interface Window {
    _hmt: any;
    wx: any;
    AMap: any
  }
}

declare namespace DP {
  interface BaseResponse<T = any> {
    code: number;
    data: T;
    msg: string;
    page: {
      pageNo: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    success: boolean;
  }

  /**
   * 表格数据类型
   */
  type TablePageDataType<T> = {
    page: number,
    pageSize: number,
    filters: T
  }

 
}
