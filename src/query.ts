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
                hasPreviousPage
                startCursor
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

export { generateQuery };