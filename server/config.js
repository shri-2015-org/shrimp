export default function getConfig() {
  return {
    db: {
      development: 'mongodb://localhost:27017/shrimp',
      test: 'mongodb://localhost:27017/shrimp-test',
      production: 'mongodb://demo:shri2015@ds055742.mongolab.com:55742/shrimp',
    },
  };
}
