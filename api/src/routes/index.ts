import { Router } from 'express';
import { storeRouter } from './storeRouter';
import { authRouter } from './authRouter';
import { addressRouter } from './addressRouter';
import { operationRouter } from './operationRouter';
import { itemRouter } from './schedulableItemRouter';
import { schedulingRouter } from './schedulingRouter';
import { weekDayRouter } from './weekdayRouter';

const router = Router();

router.use('/store', storeRouter);
router.use('/auth', authRouter);
router.use('/address', addressRouter);
router.use('/operation', operationRouter);
router.use('/item', itemRouter);
router.use('/scheduling', schedulingRouter);
router.use('/weekday', weekDayRouter);

export default router;
