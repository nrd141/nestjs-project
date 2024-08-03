import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import mongoose from 'mongoose';
import { Category } from '../src/game/schemas/game.schema';

describe('Game and Auth Controller e2e', ()=>{
  let app: INestApplication;

  beforeEach(async ()=>{
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  })

  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI);
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
      await collection.deleteMany({});
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  const user = {
    name: "Test Name",
    password: "TestPassword"
  }

  const newGame ={
    title: "Test Game",
    description: "Test game description",
    developer: "Test",
    price: 10,
    category: Category.ADVENTURE,
  }

  const updateGame = {title: 'Updated Name'};

  let jwtToken: string ='';
  let gameCreated;

  describe('Auth', ()=>{
    it('(POST) - New user signup', async ()=>{
      return request(app.getHttpServer())
      .post('/auth/signup')
      .send(user)
      .expect(201)
      .then((res)=>{
        expect(res.body.token).toBeDefined();
      })
    })
  
    it('(GET) - Login user', async ()=>{
      return request(app.getHttpServer())
      .get('/auth/login')
      .send({name: user.name, password: user.password})
      .expect(200)
      .then((res)=>{
        expect(res.body.token).toBeDefined();
        jwtToken = res.body.token;
      })
    })
  })
  
  describe('Game', ()=>{
    it('(POST) - Create new game', async ()=>{
      return request(app.getHttpServer())
      .post('/games')
      .set('Authorization', 'Bearer '+ jwtToken)
      .send(newGame)
      .expect(201)
      .then((res)=>{
        expect(res.body._id).toBeDefined();
        expect(res.body.title).toEqual(newGame.title);
        gameCreated = res.body;
      })
    })

    it('(GET) - Get games', async ()=>{
      return request(app.getHttpServer())
      .get('/games')
      .expect(200)
      .then((res)=>{
        expect(res.body.length).toBe(1);
      })
    })

    it('(GET) - Get game by ID', async ()=>{
      return request(app.getHttpServer())
      .get(`/games/${gameCreated?._id}`)
      .expect(200)
      .then((res)=>{
        expect(res.body).toBeDefined();
        expect(res.body._id).toEqual(gameCreated._id);
      })
    })

    it('(PUT) - Update game by ID', async ()=>{
      return request(app.getHttpServer())
      .put(`/games/${gameCreated?._id}`)
      .set('Authorization', 'Bearer '+ jwtToken)
      .send({title: 'Updated Name'})
      .expect(200)
      .then((res)=>{
        expect(res.body).toBeDefined();
        expect(res.body.title).toEqual(updateGame.title);
      })
    })

    it('(DELETE) - Delete game by ID', async ()=>{
      return request(app.getHttpServer())
      .delete(`/games/${gameCreated?._id}`)
      .set('Authorization', 'Bearer '+ jwtToken)
      .expect(200)
      .then((res)=>{
        expect(res.body).toBeDefined();
        expect(res.body.deleted).toEqual(true);
      })
    })
  })
})