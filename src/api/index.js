/**
 * 
 */
const API_CONFIG = {
  local: {
    API_URL: '//192.168.0.209:8080/mock/',
    API_LOG: '//192.168.0.209:8080/'
  },
  dev: {
    API_URL: '//ptgwdemo.3kwan.com/data/',
    API_LOG: '//ptgwdemo.3kwan.com/'
  },
  test: {
    API_URL: '//ptgwtest.3kwan.com/data/',
    API_LOG: '//ptgwtest.3kwan.com/'
  },
  prod: {
    API_URL: '//ptgwapi.3k.com/data/',
    API_LOG: '//ptgwapi.3k.com/'
  }
};

let env = "local";
//json请求接口判断
if (/ptgwdemo/.test(location.hostname)) env = 'dev';
else if (/ptgwtest/.test(location.hostname)) env = 'test';
else if (/\.(3k|kkk5)\.com/.test(location.hostname)) env = 'prod';

export default API_CONFIG[env];
