export default function getConfig() {
  return {
    db: {
      development: 'mongodb://localhost:27017/shrimp',
      test: 'mongodb://localhost:27017/shrimp-test',
      production: 'mongodb://localhost:27017/shrimp',
    },
  };
}
