import fs from 'fs';

const commitFiles: string[] = fs.readdirSync('./commit_data');

function isNumeric(value: string): boolean {
    return /^-?\d+$/.test(value);
}

let commitQuery: string = 'INSERT INTO commits (commit_id, author_name, author_email, author_date, committed_date, repo_name, message, additions, deletions) VALUES\n';

for (let i = 0; i < commitFiles.length; i++) {
    const commitFile = commitFiles[ i ];
    if (commitFile === '') {
        continue;
    }

    console.log('-------------------');
    console.log(`Generating SQL query for file: ${commitFile}...`);

    const commits: string[] = fs.readFileSync(`./commit_data/${commitFile}`, 'utf8').split('\n');

    for (let i = 0; i < commits.length; i++) {
        const commitData: string = commits[i];
        if (commitData === '') {
            continue;
        }

        const commitFields: string[] = commitData.split(',');

        const newArray = commitFields.map((field) => isNumeric(field) ? Number(field) : field);

        console.log(newArray);
    }
}
