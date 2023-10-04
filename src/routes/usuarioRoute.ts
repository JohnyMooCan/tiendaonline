import { Router } from 'express'
import { addUsuario, login } from '../controllers/usuarioCtrl';

const router = Router();
router.post('/',addUsuario);
router.post('/login',login);


export default router;