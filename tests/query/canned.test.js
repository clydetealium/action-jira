const QueryFactory = require('../../src/query/canned');

describe('QueryFactory', () => {
  let queryFactory;

  beforeEach(() => {
    queryFactory = new QueryFactory();
  });

  it('should initialize with a default query', () => {
    const defaultQuery = queryFactory.get();
    expect(defaultQuery).toBe('issuelinks');
  });

  it('should retrieve the default query if a custom query is not found', () => {
    const nonexistentQueryName = 'nonexistentQuery';
    const defaultQuery = queryFactory.get(nonexistentQueryName);

    expect(defaultQuery).toBe('issuelinks');
  });
});
