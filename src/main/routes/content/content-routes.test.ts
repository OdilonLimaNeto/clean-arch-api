import request from 'supertest';
import app from '../../config/app';

describe('Content Routes', () => {
  it('Should return an content on success', async () => {
    await request(app)
      .post('/api/content')
      .send({
        title: 'Aula 01',
        description: 'conteúdo sobre Clean Archtecture',
        thumbnail: 'photo.png',
        published: true,
        sourceDuration: 1,
        sourceSize: 1,
      })
      .expect(200)

  });
})