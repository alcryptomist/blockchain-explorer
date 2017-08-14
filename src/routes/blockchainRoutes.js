import express from 'express';
import blockchainCtrl from 'presentation/blockchain/blockchainCtrl';

const blockchainRouter = express.Router();

blockchainRouter.route('/:bitcoinAddress/transactions')
  .get(blockchainCtrl.getTransactions);

blockchainRouter.route('/:bitcoinAddress/balance')
    .get(blockchainCtrl.getBalance);

export default blockchainRouter;
