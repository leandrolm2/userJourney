import { Request, Response } from 'express';
import { UserJourneyService } from './service';

export class UserJourneyController {
  private UserJourneyService = new UserJourneyService();

  uploadFile = (req: Request, res: Response): void => {
    if (!req.file) {
      res.status(400).send('No file uploaded');
      return;
    }

    try {
      const { grouped, isDuplicate } = this.UserJourneyService.update(req.file.buffer);

      if (isDuplicate) {
        res.status(409).send({ success: false, message: "Duplicate file" });
        return;
      }

      res.status(200).json({ success: true, data: grouped });
      return;
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message || 'Internal server error' });
      return;
    }
  };

  getFile = (_req: Request, res: Response): void => {
    try{
      const data = this.UserJourneyService.get()
      res.status(200).json({ success: true, data: data });
      return;
    }catch(error: any) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message || 'Internal server error' });
      return;
    }
  }
}
