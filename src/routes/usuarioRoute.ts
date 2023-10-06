import { Router } from 'express'
import { addUsuario, getUsuario, login } from '../controllers/usuarioCtrl';
import validadorToken from './validatoken';

const router = Router();
router.post('/',addUsuario);
router.post('/login',login);
router.post('/data',validadorToken,getUsuario)


export default router;