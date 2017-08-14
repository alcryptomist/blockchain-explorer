import logger from 'utils/logger';
import assert from 'assert';
import BitcoinTrxManager from 'domain/blockchain/bitcoin/bitcoinTrxManager';

describe('BitcoinTrxManager list transactions and compute balance', () => {
  const trxManager = BitcoinTrxManager('1HE4ShfmuG7AdVr5RpaCtXfsJYYQQFCj1T');

  it('BitcoinTrxManager should return transactions order by received_at desc', () => {
    return trxManager.listTransactions('received_at', 'desc')
      .then(data => {
        assert(data.length > 230);
        logger.info('got more than 230 transactions :', data.length);
        assert(new Date(data[0].received_at) >= new Date(data[1].received_at));
        logger.info('data[0] received at', data[0].received_at);
        logger.info('data[1] received at', data[1].received_at);
        logger.info('data[2] received at', data[2].received_at);
        logger.info('data[3] received at', data[3].received_at);
      });
    });

  it('BitcoinTrxManager should return a balance of 33068', () => {
    return trxManager.getBalance()
      .then(data => {
        assert.equal(data, 33068);
        logger.info('balance', data);
      });
  });
});