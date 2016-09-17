'use strict';

import mongoose from 'mongoose';

var TodoSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  date: {type: Date, default: Date.now}
});

export default mongoose.model('Todo', TodoSchema);
