import logger from 'utils/logger';
import assert from 'assert';
import TrxManager from 'domain/common/trxManager';
import { trxs } from './trxSeeds.test';

describe('TrxManager list transactions and compute balance', () => {
  const trxManager = TrxManager('1HE4ShfmuG7AdVr5RpaCtXfsJYYQQFCj1T');

  it('TrxManager should return transactions order by received_at desc', () => {
    const orderedTrxDesc = trxManager.listTransactions(trxs, 'received_at', 'desc');
    logger.info('orderedTrx desc', orderedTrxDesc[0].received_at, orderedTrxDesc[1].received_at);
    assert(orderedTrxDesc[0].received_at > orderedTrxDesc[1].received_at);
  });

  it('TrxManager should return transactions order by received_at asc', () => {
    const orderedTrxAsc = trxManager.listTransactions(trxs, 'received_at', 'asc');
    logger.info('orderedTrx asc', orderedTrxAsc[0].received_at, orderedTrxAsc[1].received_at);
    assert(orderedTrxAsc[0].received_at < orderedTrxAsc[1].received_at);
  });

  it('TrxManager should return a spending amount for trx 0 of 5000000', () => {
    const amount = trxManager.getSpendingAmountForATrx(trxs[0]);
    assert.equal(amount, 5000000);
    logger.info('amount', amount);
  });

  it('TrxManager should return a funding amount of 0 for trx 0', () => {
    const amount = trxManager.getFundingAmountForATrx(trxs[0]);
    assert.equal(amount, 0);
    logger.info('amount', amount);
  });

  it('TrxManager should return a spending amount for trx 1 of 0', () => {
    const amount = trxManager.getSpendingAmountForATrx(trxs[1]);
    assert.equal(amount, 0);
    logger.info('amount', amount);
  });

  it('TrxManager should return a funding amount of 5000000 for trx 1', () => {
    const amount = trxManager.getFundingAmountForATrx(trxs[1]);
    assert.equal(amount, 5000000);
    logger.info('amount', amount);
  });

  it('TrxManager should return a a balance of 0', () => {
    const amount = trxManager.getBalances(trxs);
    assert.equal(amount, 0);
    logger.info('amount', amount);
  });
});