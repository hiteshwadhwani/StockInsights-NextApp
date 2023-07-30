const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const baseUrl = "http://localhost:3000/";
chai.use(chaiHttp);

describe("announcement API unit tests", function () {
  it("get announcement by id", function (done) {
    const SCRIP_CD = 532285;
    chai
      .request(baseUrl)
      .get(`/api/announcement/${SCRIP_CD}`)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an("array");
        const announcement = res.body.data.find((o) => o.SCRIP_CD == SCRIP_CD);
        expect(announcement).to.be.an("object");
        done();
      });
  });
  it("get announcements of multiple companies", function (done) {
    chai
      .request(baseUrl)
      .post("/api/announcement")
      .send({ ids: ["532285", "534816"] })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an("array");
        done();
      });
  });
  it("get announcements by start and end date", function (done) {
    const start = "2023-07-28T23:01:10.553+00:00";
    const end = "2023-07-28T23:01:10.553+00:00";
    chai
      .request(baseUrl)
      .get(`/api/announcement/?start=${start}&end=${end}`)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.msg).to.equal("successful");
        expect(res.body.data).to.be.an("array");
        done();
      });
  });
  it("get announcements of multiple companies by start and end date", function (done) {
    const start = "2023-07-28T23:01:10.553+00:00";
    const end = "2023-07-28T23:01:10.553+00:00";
    chai
      .request(baseUrl)
      .post(`/api/announcement/?start=${start}&end=${end}`)
      .send({ ids: ["532285", "534816"] })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.msg).to.equal("successful");
        expect(res.body.data).to.be.an("array");
        done();
      });
  });
  it("get all critical announcements", function (done) {
    chai
      .request(baseUrl)
      .get("/api/announcement/critical")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.msg).to.equal("successful");
        expect(res.body.data).to.be.an("array");
        done();
      });
  });
  it("get all critical announcements within start and end date", function (done) {
    const start = "2023-07-24T20:39:47.507+00:00";
    const end = "2023-07-28T20:39:47.507+00:00";
    chai
      .request(baseUrl)
      .get(`/api/announcement/critical?start=${start}&end=${end}`)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.msg).to.equal("successful");
        expect(res.body.data).to.be.an("array");
        done();
      });
  });
  it("get all critical announcements within start and end date of companies", function (done) {
    const start = "2023-07-24T20:39:47.507+00:00";
    const end = "2023-07-28T20:39:47.507+00:00";
    chai
      .request(baseUrl)
      .post(`/api/announcement/critical?start=${start}&end=${end}`)
      .send({ ids: ["532285", "534816"] })
      .end(function (err, res) {
        expect(res).to.have.status(404);
        expect(res.body.msg).to.not.equal("successful");
        done();
      });
  });
  it("get all recent announcements (past 1-2 days)", function (done) {
    chai
      .request(baseUrl)
      .get("/api/announcement/recent")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.msg).to.equal("successful");
        expect(res.body.data).to.be.an("array");
        done();
      });
  });
});
