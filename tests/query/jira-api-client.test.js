const axios = require('axios');
const JiraApiClient = require('../../src/query/jira-api-client');

jest.mock('axios');

describe('JiraApiClient', () => {
  const baseURL = 'https://your-jira-instance.atlassian.net';
  const username = 'your-username';
  const password = 'your-password';

  beforeEach(() => {
    axios.create.mockReturnValue({
      get: jest.fn(),
    });
  });

  it('should fetch a Jira issues', async () => {
    const issueKey = 'ISSUE-123';
    const mockIssueData = { key: issueKey, summary: 'Test Issue' };

    const jira = new JiraApiClient(baseURL, username, password);
    jira.axiosInstance.get.mockResolvedValue({ data: mockIssueData });

    const issue = await jira.getIssues([issueKey]);

    expect(jira.axiosInstance.get).toHaveBeenCalledWith(`/rest/api/3/issue/${issueKey}?fields=*all`);
    expect(issue).toEqual(JSON.stringify({issues: [mockIssueData]}));
  });

  it('should handle API request error', async () => {
    const issueKey = 'ISSUE-123';
    const errorMessage = 'API request error';

    const jira = new JiraApiClient(baseURL, username, password);
    jira.axiosInstance.get.mockRejectedValue(new Error(errorMessage));

    await expect(jira.getIssues([issueKey])).rejects.toThrow(`Failed to fetch Jira issue ${issueKey}: ${errorMessage}`);
  });
});
