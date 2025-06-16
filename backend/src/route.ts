import { Router } from 'express';
import multer from 'multer';
import { UserJourneyController } from './userJourney/controller';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});
const controller = new UserJourneyController();

router.put('/upload', upload.single('file'), controller.uploadFile);
router.get('/journeys', controller.getFile);
router.get('/ping', (_req, res) => {res.json("pong")});

export default router;

