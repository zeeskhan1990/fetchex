import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import fetchex from '../lib/fetchex';

chai.use(chaiHttp);

describe('#fetchexTest', () => {
    it('testing chai http with promise', () => {
        return chai.request('https://jsonplaceholder.typicode.com')
       .get('/posts/1')
       .then((res) => {
           expect(res.body.userId).to.equal(1);
        })
        .catch((err) => {
            throw err;
       });
    });

    it('testing chai http with done', (done) => {
       chai.request('https://jsonplaceholder.typicode.com')
       .get('/posts/1')
       .end((err, res) => {
            expect(res.body.userId).to.equal(1);
            done();
       });
    });

    it('request success', async () => {
        const jsonResponse = chai.request('https://jsonplaceholder.typicode.com').get('/posts/1');
        const result = await jsonResponse;
        expect(result.body.userId).to.equal(1); 
    });

    it('request success 2', async () => {
        const jsonResponse = fetchex.get('https://jsonplaceholder.typicode.com/posts/1', 'json');
        const result = await jsonResponse;
        expect(result.userId).to.equal(1); 
    });

    it('request success 3', async () => {
        const initJsonResponse = chai.request('https://jsonplaceholder.typicode.com').get('/posts/1');
        const jsonResponse = fetchex.get('https://jsonplaceholder.typicode.com/posts/1', 'json');
        const initResult = await initJsonResponse;
        const result = await jsonResponse;
        expect(result.userId).to.equal(initResult.body.userId); 
    });
});