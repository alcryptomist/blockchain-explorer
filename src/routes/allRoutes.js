import express from 'express';
/**
  import needed routes here
**/
import blochainRoutes from 'routes/blockchainRoutes';

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

/**
 mount route here
**/
router.use('/blockchain', blochainRoutes);

export default router;
