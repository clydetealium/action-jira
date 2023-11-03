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
    for (const issueKey of issueKeys) {
      try {
        const response = await this.axiosInstance.get(`/rest/api/3/issue/${issueKey}?fields=${fields}`);
        responses.push(response.data);
      } catch (error) {
        throw new Error(`Failed to fetch Jira issue ${issueKey}: ${error.message}`);
      }
    }
      return responses;
  }
}

module.exports = JiraApiClient;
