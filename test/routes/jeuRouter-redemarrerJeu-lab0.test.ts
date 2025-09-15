import supertest from 'supertest';
import 'jest-extended';
import app from '../../src/app';
import { jeuRoutes } from "../../src/routes/jeuRouter";

const request = supertest(app);

const createJoueur = async (nom: string) => {
  await request.post('/api/v1/jeu/demarrerJeu').send({ nom: nom });
}

beforeAll(async () => {
  await createJoueur("John");
  await createJoueur("Doe");
});

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  it('should return 200 and content type application/json', async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(response.type).toBe("application/json");
    expect(response.body.status).toBe(200);
  });

  it('should return 0 joueurs', async () => {
    await request.get('/api/v1/jeu/redemarrerJeu');
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);
    expect(joueursArray.length).toBe(0);
  });
});
