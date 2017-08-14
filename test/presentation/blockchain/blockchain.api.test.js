import chai from 'chai';
import chaiHttp from 'chai-http';
import app from 'app';

let should = chai.should();

chai.use(chaiHttp);

describe('/GET blockchain transactions', () => {
  it('it should GET 258 transactions on address 1HE4ShfmuG7AdVr5RpaCtXfsJYYQQFCj1T', (done) => {
    chai.request(app)
      .get('/blockchain/1HE4ShfmuG7AdVr5RpaCtXfsJYYQQFCj1T/transactions')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(268);
        done();
      });
  });

  it('it should have a data structure for each transaction composed of hash amount and received_at', (done) => {
    chai.request(app)
      .get('/blockchain/1HE4ShfmuG7AdVr5RpaCtXfsJYYQQFCj1T/transactions')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body[0].should.be.a('object');
        res.body[0].should.have.property('hash');
        res.body[0].should.have.property('received_at');
        res.body[0].should.have.property('amount');
        done();
      });
  });

  it('it should be ordered by default by received_at desc', (done) => {
    chai.request(app)
      .get('/blockchain/1HE4ShfmuG7AdVr5RpaCtXfsJYYQQFCj1T/transactions')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        new Date(res.body[0]['received_at']).should.be.greaterThan(new Date (res.body[1]['received_at']));
        done();
      });
  });

  it('it should be ordered by date asc if param order=asc is passed', (done) => {
    chai.request(app)
      .get('/blockchain/1HE4ShfmuG7AdVr5RpaCtXfsJYYQQFCj1T/transactions?order=asc')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        new Date(res.body[10]['received_at']).should.be.greaterThan(new Date (res.body[0]['received_at']));
        done();
      });
  });

  it('it should be ordered by amount desc if param orderBY=amount&order=desc is passed', (done) => {
    chai.request(app)
      .get('/blockchain/1HE4ShfmuG7AdVr5RpaCtXfsJYYQQFCj1T/transactions?orderBY=amount&order=desc')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body[0]['amount'].should.be.greaterThan(res.body[1]['amount']);
        done();
      });
  });

  it('it should GET 0 transactions on wrong address', (done) => {
    chai.request(app)
      .get('/blockchain/aaa/transactions')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it('it should GET a balance of 33068 satoshis on address 1HE4ShfmuG7AdVr5RpaCtXfsJYYQQFCj1T', (done) => {
    chai.request(app)
      .get('/blockchain/1HE4ShfmuG7AdVr5RpaCtXfsJYYQQFCj1T/balance')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body['balance'].should.be.eql(33068);
        done();
      });
  });
});
