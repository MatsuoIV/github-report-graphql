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
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    startCursor: string
};

export {
    CommitResponse,
    CommitResponseMetadata,
    CommitContent
};