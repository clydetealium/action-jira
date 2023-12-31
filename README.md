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

### setup
install dependencies: 
```
npm run setup
```

run tests:
```
npm test
```

### build
This action is implemented in javascript. It is built using ncc. To build the action, run the following command from the root of the repo:

```
ncc build main.js --license licenses.txt
```

You'll need to install ncc globally to run this command:
```
npm install -g @vercel/ncc
```
or run
```
npm run build
```

Read more about this from the [GitHub Actions docs](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#commit-tag-and-push-your-action-to-github)

## Conventional commit
Please see the [release workflow](./.github/workflows/release.yml) for context.

If you keep to the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) format, the release workflow will automatically bump the version of the action and create a new release on each push to main.

### Breaking
Prefix your commit message with a label and an exclamation point i.e.:
- `feat!: commit message` - a new feature that's not backwards compatible
- `feat(JIRAID-123)!: commit message` - this works as well

### Minor
- `feat:` - new feature (creates a MINOR release)

### Patch
Prefix your commit message with one of the following:
- `fix:` - bug fix
- `docs:` - documentation only changes
- `style:` - changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor:` - a code change that neither fixes a bug nor adds a feature
- `perf:` - a code change that improves performance
- `test:` - adding missing tests or correcting existing tests
- `chore:` - changes to the build process or auxiliary tools and libraries such as documentation generation
