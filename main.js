const core = require('@actions/core');
const QueryFactory = require('./src/query/canned.js');
const JiraApiClient = require('./src/query/jira-api-client.js');

async function main() {
  try {
    const user = core.getInput('user');
    const token = core.getInput('token');
    const jiraIssues = core.getInput('issue-keys').split(',');
    const baseURL = core.getInput('base-url');
    const namedQuery = core.getInput('named-query');
    const openQuery = core.getInput('open-query');

    const query = (openQuery) ?
      openQuery :
      new QueryFactory().get(namedQuery);
    
    const client = new JiraApiClient(baseURL, user, token);
    const payload = await client.getIssues(jiraIssues, query);

    core.setOutput('payload', payload);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();

module.exports = main;