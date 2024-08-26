import fs from 'fs';
import { load } from "./graphql";
import { getRepoQuery } from "./query";
import { RepoContent, RepoResponse, RepoResponseMetadata } from "./types";

let repoMetadata: RepoResponseMetadata;

let endCursor: string | undefined = undefined;

let repoRow: string = '';

do {
    console.log('-------------------');
    console.log(`endCursor: ${endCursor}`);
    const query = getRepoQuery(endCursor);

    const response = await load(query);

    repoMetadata = (response as RepoResponse).data.repositoryOwner.repositories.pageInfo;
    const repos: RepoContent[] = (response as RepoResponse).data.repositoryOwner.repositories.nodes;
    repos.forEach(repo => {
        repoRow += `${repo.name}\n`;
    });
    endCursor = repoMetadata.endCursor;

    console.log(`hasNextPage:${repoMetadata.hasNextPage}`);
} while (repoMetadata.hasNextPage);

fs.writeFileSync(`./repo_list.txt`, repoRow, 'utf-8');