'use strict';

var mongoose = require('mongoose');
var moment = require('moment');

module.exports = {
  editor_time: { type: Date, default: moment().format('YYYY-MM-DD HH:mm:ss') },
  editor_id: { type: mongoose.Schema.Types.ObjectId, default: null },
  editor_name: { type: String, default: '' }
};
//# sourceMappingURL=base-fields.js.map