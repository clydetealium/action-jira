const axios = require('axios');

class JiraApiClient {
  constructor(baseURL, username, password) {
    this.axiosInstance = axios.create({
      baseURL,
      auth: { username, password },
    });
  }

  async getIssues(issueKeys, fields = '*all') {
    let responses = [];
    const issues = [...new Set(issueKeys)]
    for (const issueKey of issues) {
      try {
        const response = await this.axiosInstance.get(`/rest/api/3/issue/${issueKey}?fields=${fields}`);
        responses.push(response.data);
      } catch (error) {
        throw new Error(`Failed to fetch Jira issue ${issueKey}: ${error.message}`);
      }
    }
      return JSON.stringify({issues: responses});
  }
}

module.exports = JiraApiClient;
