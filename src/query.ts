import * as dotenv from 'dotenv';

dotenv.config();

const owner: string = process.env.OWNER_NAME || "owner";
const baseBranch: string = "develop";

const generateQuery = (repoName: string, baseDate: string, endCursor?: string): string => {
  return `query { 
    repository(owner: "${owner}", name: "${repoName}") {
      ref(qualifiedName: "${baseBranch}") {
        target{
          ... on Commit {
            history(since: "${baseDate}"${(endCursor) ? `, after: "${endCursor}"` : ''}) {
              totalCount
              pageInfo {
                endCursor
                hasNextPage
              } 
              edges {
                node {
                  ... on Commit {
                    oid
                    author {
                      name
                      email
                      date
                    }
                    committedDate
                    message
                    additions
                    deletions
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;
};

const getRepoQuery = (endCursor?: string): string => {
  return `query {
    repositoryOwner(login: "${owner}") {
      repositories(first:100, orderBy: { field: NAME, direction: ASC }${(endCursor) ? `, after: "${endCursor}"` : ''}) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes{
          name
          description
        }
      }
    }
  }
  `;
};

export { generateQuery, getRepoQuery };