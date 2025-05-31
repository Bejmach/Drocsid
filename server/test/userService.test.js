import { expect } from 'chai';
import sinon from 'sinon';
import db from '../models/db.js';
import userService from '../services/userService.js';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

describe('User Service', () => {
  const salt = process.env.SALT || 'test_salt';

  beforeEach(() => {
    sinon.restore();
  });

  it('should not register an existing user', async () => {
    const dbQueryStub = sinon.stub(db, 'query');

    dbQueryStub.onFirstCall().resolves([[{ id: 'existing-id' }]]);

    const result = await userService.registerUser('Test', 'existing@example.com', 'password123');
    expect(result.success).to.be.false;
    expect(result.message).to.equal('User already exists');
  });

  it('should login user with correct credentials', async () => {
    const password = 'password123';
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    sinon.stub(db, 'query').resolves([[{
      id: '1',
      name: 'User',
      email: 'a@b.com',
      password: hash
    }]]);

    const result = await userService.loginUser('a@b.com', password);
    expect(result.success).to.be.true;
    expect(result.user[0].email).to.equal('a@b.com');
  });
});
