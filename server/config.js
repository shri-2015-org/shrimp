export default function getConfig() {
  return {
    db: {
      development: 'mongodb://localhost/shrimp',
      test: 'mongodb://localhost/shrimp-test',
      production: 'mongodb://demo:shri2015@ds055742.mongolab.com:55742/shrimp',
    },
  };
}
