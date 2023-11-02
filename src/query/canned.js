class QueryFactory {
  constructor() {
    this.queries = {};
    this.register('default', 'issuelinks');
  }

  register(name, query) {
    this.queries[name] = query;
  } 

  get(name = 'default') {
    return this.queries[name] || this.queries.default;
  }
}

module.exports = QueryFactory;
