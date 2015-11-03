export function notEmpty() {
  return new Promise((resolve, reject) => {
    this.count((err, count) => {
      if (err) reject(err);
      else resolve(count > 0);
    });
  });
}

export function getAll(includeSession) {
  return this.find({}).select(includeSession ? '+sessionId' : undefined);
}


export function getToObjectOptions() {
  return {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  };
}
