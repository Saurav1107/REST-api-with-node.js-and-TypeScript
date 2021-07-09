import Router from 'express';
import contentController from '../controllers/content.controller';


const router = Router();

const content = new contentController();

router.get('/' ,content.getAllcontents);

router.post('/',content.addContent);

router.get('/:id' , content.getAllcontents);

router.patch('/:id' , content.updateContent);

router.delete('/:id',content.deleteContent);

export default router;