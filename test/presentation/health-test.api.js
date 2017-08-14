import chai from 'chai';
import chaiHttp from 'chai-http';
import app from 'app';

let should = chai.should();

chai.use(chaiHttp);

describe('/GET health-check', () => {
  it('it should GET health-check', (done) => {
    chai.request(app)
      .get('/health-check')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
