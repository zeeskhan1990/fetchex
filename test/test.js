import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import fetchex from '../lib/fetchex';
// var chai = require('chai'),
// chaiHttp = require('chai-http'),
// fetchex = require('../lib/fetchex').default;

//var expect = chai.expect;
chai.use(chaiHttp);

describe('#mytest', () => {
    console.log("FETCHEX...");
    console.log(fetchex);
    it('Testing chai http second time', () => {
        return chai.request('https://jsonplaceholder.typicode.com')
       .get('/posts/1')
       .then((res) => {
           expect(res.body.userId).to.equal(1);
        })
        .catch((err) => {
            throw err;
       });
    });

    it('Testing chai http', (done) => {
        debugger
       chai.request('https://jsonplaceholder.typicode.com')
       .get('/posts/1')
       .end((err, res) => {
            expect(res.body.userId).to.equal(1);
            done();
       });
    });

    it('assertion success', async () => {
        const jsonResponse = chai.request('https://jsonplaceholder.typicode.com').get('/posts/1');
        const result = await jsonResponse;
        expect(result.body.userId).to.equal(1); 
    });

    it('assertion success 2', async () => {
        const jsonResponse = fetchex.getJson('https://jsonplaceholder.typicode.com/posts/1');
        const result = await jsonResponse;
        console.log("IN RES...");
        console.log(result);
        expect(result.userId).to.equal(1); 
    });

    // it('should convert single digits', function() {
    //     var result = 2*2;
    //     expect(result).to.equal(4);
    // });

    

    // it('should convert triple digits', function() {
    //     var result = numFormatter(123);
    //     expect(result).to.equal('123');
    // });

    // it('should convert 4 digits', function() {
    //     var result = numFormatter(1234);
    //     expect(result).to.equal('1,234');
    // });

    // it('should convert 5 digits', function() {
    //     var result = numFormatter(12345);
    //     expect(result).to.equal('12,345');
    // });

    // it('should convert 6 digits', function() {
    //     var result = numFormatter(123456);
    //     expect(result).to.equal('123,456');
    // });

    // it('should convert 7 digits', function() {
    //     var result = numFormatter(1234567);
    //     expect(result).to.equal('1,234,567');
    // });

    // it('should convert 8 digits', function() {
    //     var result = numFormatter(12345678);
    //     expect(result).to.equal('12,345,678');
    // });
});