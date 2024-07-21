import { debug, getInput } from '@actions/core';
import { context } from '@actions/github';

async function main() {
  const
    str_issue_title = getInput('issueTitle'),
    potential_multi_line_news_link = getInput('newsLink'),
    input_mdfile_dir = getInput('markDownFilePath') || './';

}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .then(() => { })
  .finally(() => { console.log('Done'); });