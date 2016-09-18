'use strict';

import mongoose from 'mongoose';

var TodoSchema = new mongoose.Schema({
  name: String,
  done: {type: Boolean, default: false},
  date: {type: Date, default: Date.now}
});

export default mongoose.model('Todo', TodoSchema);
