import { Router } from 'express';
import { createContactsSchema, updateContactSchema } from '../validation/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { getAllContactsController, getContactByIdController, patchContactController, putContactController, createContactController, deleteContactByIdController } from '../controllers/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));
router.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);
router.put(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(putContactController),
);
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);


router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactByIdController),
);
export default router;
