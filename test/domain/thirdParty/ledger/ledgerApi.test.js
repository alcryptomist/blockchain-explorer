import ledgerApi from 'domain/thirdParty/ledger/ledgerApi';
import logger from 'utils/logger';
import assert from 'assert';

describe('ledger API up', () => {
  const api = ledgerApi();

  it('Ledger API should return a token', () => {
    return api.getAuthToken().then((data) => {
      assert(data.token != null, 'we got a token ');
      logger.info('token', data.token);
      return api.destroyAuthToken(data.token);
    })
  });

  it('Ledger API should return transactions for 1HE4ShfmuG7AdVr5RpaCtXfsJYYQQFCj1T', () => {
    return api.getTransactions('1HE4ShfmuG7AdVr5RpaCtXfsJYYQQFCj1T')
      .then(data => {
        assert(JSON.parse(data).txs.length > 0);
        logger.info('got data');
      })
      .catch(data => logger.error('error', data));
  });

  it('Ledger API should return transactions error for wrong address like 1HE4ShfmuG7AdVr5RpaCt', () => {
    return api.getTransactions('aaaaaa')
      .then(data => {
        assert.equal(JSON.parse(data).txs.length, 0);
        logger.info('got no data');
      })
      .catch(data => logger.error('error', data));
  });

  it('Ledger API should return more than 230 transactions for 1HE4ShfmuG7AdVr5RpaCtXfsJYYQQFCj1T', () => {
    return api.getAllTransactions('1HE4ShfmuG7AdVr5RpaCtXfsJYYQQFCj1T')
      .then(data => {
        assert(data.length > 230);
        logger.info('got more than 230 transactions :', data.length);
        logger.info('data 0 :', JSON.stringify(data[0]));
        logger.info('data 1 :', JSON.stringify(data[1]));
      })
      .catch(data => logger.error('error', data));
  });
});
