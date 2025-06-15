import multer from 'multer';
import xlsx from 'xlsx';
import { Router, Request, Response } from 'express';

const router = Router();

router.get("/ping", (_req, res) => {
    res.json("pong")
})

export default router;

