import ledgerApi from 'domain/thirdParty/ledger/ledgerApi';
import TrxManager from 'domain/common/trxManager';

export const bitcoinAddressManager = (address) => {
  const api = ledgerApi();
  const trxManager = TrxManager(address);

  const listTransactions = async (params) => {

    const trxs = await api.getAllTransactions(address);
    return trxManager.listTransactions(trxs, params.orderBy, params.order);
  }

  const getBalance = async () => {
    const trxs = await api.getAllTransactions(address);
    return trxManager.getBalances(trxs);
  }

  return {
    listTransactions,
    getBalance,
  }
}

export default bitcoinAddressManager;

