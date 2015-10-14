export function isEmpty() {
  return new Promise((resolve, reject) => {
    this.count((err, count) => {
      if (err) reject(err);
      else resolve(count > 0);
    });
  });
}

export function getAll() {
  return new Promise((resolve, reject) => {
    this.find({}, (err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
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
