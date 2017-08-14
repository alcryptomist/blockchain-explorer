import helper from 'utils/helper';
import InvalidParameterException from 'utils/exception/InvalidParameterException';
import logger from 'utils/logger';

export const trxManager = (address) => {

  /**
   * Sum a transaction spending, i.e. we send some money to some one so input has our address
   * @param trx
   */
  const getSpendingAmountForATrx = (trx) => {
    return trx.inputs
      .filter(input => input.address === address)
      .map(input => input.value)
      .reduce((acc, val) => acc + val, 0)
  }

  /**
   * Sum a transaction funding, i.e. we get some money from someone so output has our address
   * @param trx
   */
  const getFundingAmountForATrx = (trx) => {
    return trx.outputs
      .filter(output => output.address === address)
      .map(output => output.value)
      .reduce((acc, val) => acc + val, 0)
  };

  /**
   * trx mapper hash amount and received at
   */
  const trxMapper = (trx) => {
    const trxBalance = getFundingAmountForATrx(trx) -  getSpendingAmountForATrx(trx);
    return {
      hash: trx.hash,
      amount: trxBalance,
      received_at: trx.received_at,
    };
  };

  const listTransactions = (trxs, orderBy = 'received_at', order = 'desc') => {
    if (trxs.length > 1){
      if (!trxs[0][orderBy]) throw new InvalidParameterException(`orderBy ${orderBy} attribute is not correct: it does not exist`);
    }
    return trxs
      .map(trx => trxMapper(trx))
      .sort(helper.orderingTrxs(orderBy, order));
  }

  const getBalances = (trxs) => {
    return trxs
      .map(trx => {
        const trxBalance = getFundingAmountForATrx(trx) -  getSpendingAmountForATrx(trx);
        logger.debug(`trx ${trx.hash} received at ${trx.received_at} : ${trxBalance}`);
        return trxBalance;
      })
      .reduce((acc, val) => acc + val, 0);
  };

  return {
    listTransactions,
    getSpendingAmountForATrx,
    getFundingAmountForATrx,
    getBalances,
  }
};

export default trxManager;