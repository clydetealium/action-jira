const axios = require('axios');

class JiraApiClient {
  constructor(baseURL, username, password) {
    this.axiosInstance = axios.create({
      baseURL,
      auth: { username, password },
    });
  }

  async getIssue(issueKey, fields = '*all') {
    try {
      const response = await this.axiosInstance.get(`/rest/api/3/issue/${issueKey}?fields=${fields}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch Jira issue ${issueKey}: ${error.message}`);
    }
  }
}

module.exports = JiraApiClient;
