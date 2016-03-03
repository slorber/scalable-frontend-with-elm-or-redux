import request from 'superagent';
import Promise from 'bluebird';

Promise.promisifyAll(request);

export default request;
