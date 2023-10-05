import { Router } from 'express'
import { addUsuario, getUsuario, login } from '../controllers/usuarioCtrl';

const router = Router();
router.post('/',addUsuario);
router.post('/login',login);
router.post('/data',getUsuario)


export default router;