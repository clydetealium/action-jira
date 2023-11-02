# action-jira
This GitHub Action allows you to query a given Jira issue. You may qualify the query by specifying which fields you wish to return. The result is stored in the `payload` output.

## Usage

```yaml
name: Query Jira Issue

on:
  push:
    branches:
      - main

jobs:
  render-template:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Repository
      uses: actions/checkout@v3

    - name: Query Jira
      uses: clydetealium/action-jira@v1
      with:
        user: ${{ secrets.JIRA_USER }}
        token: ${{ secrets.JIRA_TOKEN }}
        base-url: 'https://your-jira-instance.atlassian.net'
        issue-key: 'ABC-123'
      id: jira-deets

    - name: Display Jira Payload
      run: echo "Jira Deets: ${{ steps.jira-deets.outputs.payload }}"
```

## Inputs

### user (required)
> The username of the Jira user to authenticate as.

### token (required)
> The API token of the Jira user to authenticate as.

### base-url (required)
> The base URL of your Jira instance. For example, if your Jira instance is located at `https://your-jira-instance.atlassian.net`, then you would specify `https://your-jira-instance.atlassian.net` as the base URL.

### issue-key (required)
> The key of the Jira issue you wish to query. For example, if you wish to query the issue located at `https://your-jira-instance.atlassian.net/browse/ABC-123`, then you would specify `ABC-123` as the issue key.

### named-query (optional)
> The name of a canned list of fields qualify the jira issue query. See [the QueryFactory](./src/query/canned.js) for a list of available canned queries.

### open-query (optional)
> A custom list of fields to qualify the jira issue query. (i.e. 'status,summary,description').

## Outputs
### payload
> The Jira issue payload. You can use this output in subsequent steps of your workflow.

## Example
Here's an example of how to use this action in a GitHub Actions workflow:

```yaml
- name: Query Jira
  uses: clydetealium/action-jira@v1
  with:
    user: ${{ secrets.JIRA_USER }}
    token: ${{ secrets.JIRA_TOKEN }}
    base-url: 'https://your-jira-instance.atlassian.net'
    issue-key: 'ABC-123'
  id: jira-deets
```

## The Jira REST API
Skim the [Jira REST API docs](https://developer.atlassian.com/server/jira/platform/rest-apis/)

## Contributing
Clone this repo

## setup
install dependencies: 
```
npm run setup
```

run tests:
```
npm test
```
