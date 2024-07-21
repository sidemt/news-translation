import { debug, getInput } from '@actions/core';
import { context } from '@actions/github';
import { utils_repo_submit_issue_comment } from './utils/utils_repo_submit_issue_comment';
import { task_parse_action_issue_intent } from './tasks/task_parse_action_issue_intent';
import { task_auto_translate_step_01_fetch_articels } from './tasks/task_auto_translate_step_01_fetch_articels';
import { task_auto_translate_step_02_trans_articels } from './tasks/task_auto_translate_step_02_trans_articels';

export class main_options {
  with_issue_title = getInput('with_issue_title')
  with_issue_body = getInput('with_issue_body')
  with_github_token = getInput('with_github_token')
  with_task_fetch_to_save_path = getInput('with_task_fetch_to_save_path')
  with_task_fetch_to_include_selector = getInput('with_task_fetch_to_save_name')
  with_task_fetch_to_ignore_selector = getInput('with_task_fetch_to_ignore_selector')
  with_task_translate_openai_api_key = getInput('with_task_translate_openai_api_key')
  with_task_translate_to_save_path = getInput('with_task_translate_to_save_path')

  step_01_result_metas: any[] = []
  step_01_result_mdfiles: string[] = []
  step_02_result_mdfiles: string[] = []
  str_comment = ''
}
async function main() {
  const options = Object.assign(new main_options(), {});
  const flag_issue_intent = await task_parse_action_issue_intent(options);

  let str_task_result = '';
  if ("AUTO_TRANSLATE" === flag_issue_intent) {
    await task_auto_translate_step_01_fetch_articels(options);
    await task_auto_translate_step_02_trans_articels(options);

    const count_raw_article = options.step_01_result_mdfiles.length;
    const count_translated_article = options.step_02_result_mdfiles.length;
    if (count_translated_article !== count_raw_article) {
      throw new Error('The number of translated articles is not equal to the number of raw articles');
    }
    let str_comment = `🚀 **Auto Translate**`;
    if (count_raw_article > 1) {
      str_comment += `\n\n📚 **Articles**: ${count_raw_article}`;
      for (let i = 0; i < count_raw_article; i++) {
        const article_meta = options.step_01_result_metas[i];
        const article_raw_filename = options.step_01_result_mdfiles[i];
        const article_translated_filename = options.step_02_result_mdfiles[i];
        const article_title = article_meta.title;
        str_comment += `\n\n📚 **[${i + 1}] - ${article_title}`;
        str_comment += `\n\n📚 **Raw**: [${article_raw_filename}](${article_raw_filename})`
        str_comment += `\n\n📚 **Translated**: [${article_translated_filename}](${article_translated_filename})`
      }
    } else {
      const article_meta = options.step_01_result_metas[0];
      const article_raw_filename = options.step_01_result_mdfiles[0];
      const article_translated_filename = options.step_02_result_mdfiles[0];
      const article_title = article_meta.title;
      str_comment += `\n\n📚 **[${article_title}](${article_raw_filename})`;
      str_comment += `\n\n📚 **Raw**: [${article_raw_filename}](${article_raw_filename})`
      str_comment += `\n\n📚 **Translated**: [${article_translated_filename}](${article_translated_filename})`
    }
    str_task_result = str_comment;
  }

  Object.assign(options, { str_comment: str_task_result });
  await utils_repo_submit_issue_comment(options);
  return;
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .then(() => { })
  .finally(() => { console.log('Done'); });