import ledgerConfig from 'config/ledgerApi.conf';
import logger from 'utils/logger';
import restClient from 'utils/restClient'

const ledgerApi = (blockchain = 'btc') => {
  let authToken = null;
  const getApiUrl = (api) => `${ledgerConfig.url}/${ledgerConfig.version}/${ledgerConfig[blockchain]}/${api}`;
  const client = restClient();

  /**
   * get header auth token to be able to call subsequent API
   */
  const getAuthToken = () => {
    logger.debug('auth on ledger API');
    const api = getApiUrl('syncToken');
    return client.get(api);
  };

  const destroyAuthToken = (token = authToken) => {
    logger.debug('logout by destroy token on ledger API :', token);
    const api = getApiUrl('syncToken');
    const args = {
      headers: {
        'X-LedgerWallet-SyncToken': token
      },
    };
    authToken = null;
    return client.deleteCall(api, args);
  };

  /**
   * Return first 230 transactions
   * to get next transactions, need to pass the last blockhash
   * @param address
   * @param blockHash
   * @returns {Promise.<void>}
   */
  const getTransactions = async (address, blockHash) => {
    // if no auth token set, get one
    if(!authToken) {
      const tokenResp = await getAuthToken(blockchain);
      logger.debug('auth token :', tokenResp);
      authToken = tokenResp.token;
    }
    const args = {
      path: {
        address,
      },
      headers: {
        'X-LedgerWallet-SyncToken': authToken
      },
    };
    if(blockHash) args['parameters'] = {
      'blockHash': blockHash,
    }
    const api =  getApiUrl('addresses/${address}/transactions');
    return client.get(api, args);
  };

  /**
   * get all transactions : loop until is truncated is false
   * @param address
   * @returns {Promise.<Array>}
   */
  const getAllTransactions = async (address) => {
    let isTruncated = false;
    let blockHash = null;
    let transactions = [];
    do {
      const rawRespTxs = await getTransactions(address, blockHash);
      const respTxs = JSON.parse(rawRespTxs);
      logger.debug('got transactions :', respTxs.txs.length);
      transactions.push(...respTxs.txs);
      isTruncated = respTxs.truncated;
      // if truncated is true, we will need to retrieve more transactions by passing the last blockhash
      if(isTruncated) {
        blockHash = respTxs.txs.pop().block.hash;
      } else {
        blockHash = null;
      }
    } while (isTruncated);
    destroyAuthToken();
    return transactions;
  }

  return {
    getAuthToken,
    destroyAuthToken,
    getTransactions,
    getAllTransactions,
  }

};

export default ledgerApi;
