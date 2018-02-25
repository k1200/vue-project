import { baseUrl } from './env'
import '../../static/mui/js/mui.js'
const fetch = (responseSuccess, requestConfig, responseError) => {
  mui.ajax(url,{
    data:requestConfig.data || {},
    dataType:requestConfig.dataType || 'json',
    type:requestConfig.type || 'GET',
    timeout:requestConfig.timeout || 10000,
    headers:requestConfig.headers || { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    success:function(res){
      responseSuccess(res)
    },
    error:function(xhr,type,errorThrown){
      if(responseError) responseError(type)
    }
  });

}

/**
 * 获取首页数据
 * arguments  success：ajax 请求成功的函数；error：ajax 请求错误的函数；requestConfig：ajax 请求的参数配置
 */

export const getActivities = (responseSuccess, requestConfig, responseError) => fetch(responseSuccess, requestConfig, responseError);


/**
 * 获取首页热门城市
 */

export const hotcity = () => fetch('/v1/cities', {
  type: 'hot'
});
