import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getAllContactsController, getContactByIdController, patchContactController, putContactController, createContactController, deleteContactByIdController } from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactByIdController),
);
router.patch(
  '/contacts/:contactId',
  ctrlWrapper(patchContactController),
);
router.put(
  '/contacts/:contactId',
  ctrlWrapper(putContactController),
);
router.post(
  '/contacts',
  ctrlWrapper(createContactController),
);
router.delete(
  '/contacts/:contactId',
  ctrlWrapper(deleteContactByIdController),
);
export default router;
