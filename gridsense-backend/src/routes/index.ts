import { Router } from 'express';
import { authController } from '../controllers/authController';
import { gridController } from '../controllers/gridController';
import { forecastController } from '../controllers/forecastController';
import { simulationController } from '../controllers/simulationController';
import { copilotController } from '../controllers/copilotController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Auth Routes
router.post('/auth/login', authController.login);
router.get('/auth/me', authenticateToken, authController.me);

// Dashboard Summary
router.get('/dashboard/summary', gridController.getDashboardSummary);

// Grid Topology & Assets
router.get('/substations', gridController.getSubstations);
router.get('/feeders', gridController.getFeeders);
router.get('/transformers', gridController.getTransformers);
router.get('/assets/:id', gridController.getAssetById);

// Outages
router.get('/outages', gridController.getOutages);
router.patch('/outages/:id', gridController.updateOutageStatus);

// Forecasting & ML
router.get('/forecast', forecastController.getForecast);
router.post('/simulation', simulationController.runSimulation);
router.post('/copilot/query', copilotController.query);

export default router;
