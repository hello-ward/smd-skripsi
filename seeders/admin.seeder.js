import { Seeder } from 'mongoose-data-seed';
import UserModel from '../src/models/user.model';

const data = [{
  username: 'superadmin',
  password: 'superadmin',
  roles: 'superadmin',
  phone: '081515292117',
  status: 2,
  created_at: Date.now()
}];

class AdminSeeder extends Seeder {

  async shouldRun() {
    return UserModel.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return UserModel.create(data);
  }
}

export default AdminSeeder;
