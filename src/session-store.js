const { Store } = require("koa-session2");
const mongoose = require('mongoose');
const { randomBytes } = require('crypto');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  sid:          String,
  maxAage:      Number,
  session:      String
});

class SessonStore {
  constructor() {
    this.__timer = new Map();
    this.sessionModel = mongoose.model('session', sessionSchema);
  }
  
  getID(length) {
    return randomBytes(length).toString('hex');
  }

  async get(sid, ctx) {
    let data = await this.sessionModel.findOne({sid:`SESSION:${sid}`});
    if (data && data.session) {
      return JSON.parse(data.session);
    }
    return null;
  }

  async set(session, { sid = this.getID(24), maxAge = 1000000 } = {}, ctx) {
    try {
      let data = this.sessionModel.findOne({sid:`SESSION:${sid}`});
      let update = true;
      data = await this.sessionModel.update({sid:`SESSION:${sid}`}, {sid:`SESSION:${sid}`, session:JSON.stringify(session), maxAge:maxAge}, {multi:true, upsert:true});        

      if (data) {
        if (this.__timer.has(sid)) {
          const __timeout = this.__timer.get(sid);
          if (__timeout) clearTimeout(__timeout);
        }
        
        if (maxAge) {
          this.__timer.set(sid, setTimeout(() => this.destroy(sid), maxAge));
        }
      }
    } catch (e) {
      console.log('session set error' + JSON.stringify(e));
    }
    return sid;
  }

  async destroy(sid, ctx) {
    this.__timer.delete(sid);
    console.log('session destroy' + sid);
    return await this.sessionModel.deleteOne({sid:`SESSION:${sid}`});
  }
}

module.exports = SessonStore;