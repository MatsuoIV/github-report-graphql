import fs from 'fs';
import { generateQuery } from './query';
import { load } from "./graphql";
import { CommitContent, CommitResponse, CommitResponseMetadata, RepoResponse } from "./types";

const repoList = fs.readFileSync('./repo_list.txt', 'utf8').split('\n');

for (let i = 0; i < repoList.length; i++) {
    const repoName = repoList[ i ];
    if (repoName === '') {
        continue;
    }
    console.log('-------------------');
    console.log(`Extracting data from repo: ${repoName}...`);

    let commitMetadata: CommitResponseMetadata = {
        endCursor: '',
        hasNextPage: false
    };

    let endCursor: string | undefined = undefined;

    let commitRow: string = '';
    
    do {
        const query = generateQuery(repoName, '2024-01-01T00:00:00Z', endCursor);

        const response: CommitResponse | RepoResponse = await load(query);

        if (!(response as CommitResponse).data.repository.ref) {
            continue;
        }

        commitMetadata = (response as CommitResponse).data.repository.ref.target.history.pageInfo;

        const commits: CommitContent[] = (response as CommitResponse).data.repository.ref.target.history.edges;
        commits.forEach(commit => {
            commitRow += `${commit.node.oid},${commit.node.author.name},${commit.node.author.email},${commit.node.author.date},${commit.node.committedDate},${repoName},${commit.node.message.replace(/\n/g,'-')},${commit.node.additions},${commit.node.deletions}\n`;
        });
        endCursor = commitMetadata.endCursor;

        console.log(`hasNextPage:${commitMetadata.hasNextPage}`);
    } while (commitMetadata.hasNextPage);

    fs.writeFileSync(`./commit_data/${repoName}.csv`, commitRow, 'utf-8');
}
