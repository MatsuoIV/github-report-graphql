import { CommitResponse, RepoResponse } from "./types";
import loginData from './utils';

const load = async (query: any): Promise<CommitResponse | RepoResponse> => {
    const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Authorization': loginData.token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
    });

    const data = await res.json();
    return data;
};

export { load };