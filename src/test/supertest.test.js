import mongoose from "mongoose";
import supertest from "supertest";
import chai from "chai";
import dotenv from 'dotenv';

dotenv.config(); 

process.env.NODE_ENV = 'test';
import app from "../app.js";

import UserModel from "../dao/models/User.js";
import PetModel from "../dao/models/Pet.js";
import AdoptionModel from "../dao/models/Adoption.js";

const expect = chai.expect;
const request = supertest(app);

before(async function() {
  this.timeout(10000);

  if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
  }

  mongoose.set('strictQuery', false);

  console.log("Conectando a la base de datos de testing...");
  await mongoose.connect(process.env.MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });
});


let testUser;
let testPet;

beforeEach(async function() {
    this.timeout(5000);

    await UserModel.deleteMany({});
    await PetModel.deleteMany({});
    await AdoptionModel.deleteMany({});

    testUser = await UserModel.create({
        first_name: "Test",
        last_name: "User",
        email: "testuser@example.com",
        password: "testpassword",
        role: "user",
        pets: []
    });

    testPet = await PetModel.create({
        name: "TestPet",
        specie: "Dog",
        birthDate: new Date(2020, 1, 1),
        adopted: false,
        owner: null
    });
});

after(async () => {
  await mongoose.connection.close();
});

describe("Adoptions API", () => {
    it("Debe obtener todas las adopciones", async () => {
        const res = await request.get("/api/adoptions");
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("status", "success");
        expect(res.body.payload).to.be.an("array");
    });

    it("Debe obtener una adopción específica", async () => {
        const adoption = await AdoptionModel.create({ owner: testUser._id, pet: testPet._id });
        const res = await request.get(`/api/adoptions/${adoption._id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("status", "success");
        expect(res.body.payload).to.have.property("_id", adoption._id.toString());
    });

    it("Debe crear una nueva adopción", async () => {
        const res = await request.post(`/api/adoptions/${testUser._id}/${testPet._id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("status", "success");
        expect(res.body.message).to.equal("Pet adopted");
    });
});
