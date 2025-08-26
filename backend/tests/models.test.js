const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('../models/user');

// Create an in-memory SQLite database for testing
const sequelize = new Sequelize('sqlite::memory:', {
  logging: false
});

describe('User Model', () => {
  let User;

  beforeAll(async () => {
    User = userModel(sequelize);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  afterEach(async () => {
    await User.destroy({ where: {}, force: true });
  });

  test('should create a user with valid data', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    const user = await User.create(userData);

    expect(user.username).toBe('testuser');
    expect(user.email).toBe('test@example.com');
    expect(user.password).not.toBe('password123'); // Should be hashed
    expect(user.id).toBeDefined();
  });

  test('should hash password before saving', async () => {
    const userData = {
      username: 'testuser2',
      email: 'test2@example.com',
      password: 'plainpassword'
    };

    const user = await User.create(userData);
    
    expect(user.password).not.toBe('plainpassword');
    expect(user.password.length).toBeGreaterThan(20);
  });

  test('should validate password correctly', async () => {
    const userData = {
      username: 'testuser3',
      email: 'test3@example.com',
      password: 'mypassword'
    };

    const user = await User.create(userData);
    
    const isValid = await user.comparePassword('mypassword');
    const isInvalid = await user.comparePassword('wrongpassword');

    expect(isValid).toBe(true);
    expect(isInvalid).toBe(false);
  });

  test('should not include password in JSON output', async () => {
    const userData = {
      username: 'testuser4',
      email: 'test4@example.com',
      password: 'password123'
    };

    const user = await User.create(userData);
    const userJSON = user.toJSON();

    expect(userJSON.password).toBeUndefined();
    expect(userJSON.username).toBe('testuser4');
    expect(userJSON.email).toBe('test4@example.com');
  });

  test('should validate required fields', async () => {
    await expect(User.create({})).rejects.toThrow();
    
    await expect(User.create({
      username: 'testuser'
    })).rejects.toThrow();

    await expect(User.create({
      username: 'testuser',
      email: 'invalid-email'
    })).rejects.toThrow();
  });

  test('should enforce unique constraints', async () => {
    const userData1 = {
      username: 'uniqueuser',
      email: 'unique@example.com',
      password: 'password123'
    };

    const userData2 = {
      username: 'uniqueuser', // Same username
      email: 'different@example.com',
      password: 'password123'
    };

    await User.create(userData1);
    
    await expect(User.create(userData2)).rejects.toThrow();
  });
});