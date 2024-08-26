type CommitResponse = {
    data: {
        repository: {
            ref: {
                target: {
                    history: {
                        totalCount: number,
                        pageInfo: CommitResponseMetadata,
                        edges: CommitContent[]
                    }
                }
            }
        }
    }
};

type CommitContent = {
    node: {
        oid: string,
        author: {
            name: string,
            email: string,
            date: string
        },
        committedDate: string,
        message: string,
        additions: number,
        deletions: number
    }
};

type CommitResponseMetadata = {
    endCursor: string,
    hasNextPage: boolean
};

type RepoResponse = {
    data: {
        repositoryOwner: {
            repositories: {
                totalCount: number,
                pageInfo: RepoResponseMetadata,
                nodes: RepoContent[]
            }
        }
    }
};

type RepoContent = {
    name: string,
    description: string
};

type RepoResponseMetadata = {
    hasNextPage: boolean,
    endCursor: string
};

export {
    CommitResponse,
    CommitResponseMetadata,
    CommitContent,
    RepoResponse,
    RepoResponseMetadata,
    RepoContent
};