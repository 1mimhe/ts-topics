import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.user.create({
  data: {
    username: '1mimhe',
    password: 'Password1234',
    firstName: 'Mammad',
    gender: 'male',
    role: {
      create: {
        name: 'admin'
      }
    },
    contact: {
      create: {
        phoneNumber: "09115219213"
      }
    }
  }
});

// We also can have more nested record (three nested records, ...).
