import BitcoinTrxManager from 'domain/blockchain/bitcoin/bitcoinTrxManager';

export const blockchainCtrl = () => {

  const getTransactions = (req, res, next) => {
    /**
     Now use the bitcoinTrxManager
     */
    const trxManager = BitcoinTrxManager(req.params.bitcoinAddress);
    return trxManager.listTransactions(req.query)
      .then(trxs => res.json(trxs))
      .catch(e => next(e));
  };

  const getBalance = (req, res, next) => {
    const trxManager = BitcoinTrxManager(req.params.bitcoinAddress);
    return trxManager.getBalance()
      .then(balance => res.json(
        {
          balance,
        }
      ))
      .catch(e => next(e));
  };

  return {
    getTransactions,
    getBalance,
  };
};

export default blockchainCtrl();
