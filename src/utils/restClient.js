import logger from 'utils/logger';
import { Client } from 'node-rest-client';

const restClient = () => {
  const options = {
    mimetypes: {
      json: ["application/json", "application/json;charset=utf-8"],
    },
  };

  const client = new Client(options);

  const get = (api, args) => {
    logger.debug('API called :', api);
    logger.debug('Args used :', args);
    return new Promise((resolve, reject) => {
      client.get(api, args, (response) => {
        if (Buffer.isBuffer(response)) {
          let data = response.toString('utf8');
          if(data.error) reject(data);
          resolve(data);
        } else {
          if(response.error) reject(response);
          resolve(response);
        }
      })
        .on('requestTimeout', (err) => {
          reject(err);
        })
        .on('responseTimeout', (err) => {
          reject(err);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  };

  const deleteCall = (api, args) => {
    logger.debug('API called :', api);
    logger.debug('Args used :', args);
    return new Promise((resolve, reject) => {
      client.delete(api, args, (response) => {
        if (Buffer.isBuffer(response)) {
          let data = response.toString('utf8');
          if(data.error) reject(data);
          resolve(data);
        } else {
          if(response.error) reject(response);
          resolve(response);
        }
      })
        .on('requestTimeout', (err) => {
          reject(err);
        })
        .on('responseTimeout', (err) => {
          reject(err);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  return {
    get,
    deleteCall,
  }
}



export default restClient;