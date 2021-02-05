import { Router } from 'express';
import EmployeeController from '../../controllers/app/admin/employee.controller';

const router = Router();

router.get('/', EmployeeController.getEmployee);
router.get('/detail/:id', EmployeeController.detailEmployee);
router.get('/delete/:id', EmployeeController.deleteEmployee);

router.post('/', EmployeeController.createEmployee);
router.post('/update/:id', EmployeeController.updateEmployee);

export default router;