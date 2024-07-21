import { debug } from "@actions/core";
import { main_options } from "..";

export class task_parse_action_issue_intent_options extends main_options {}
export async function task_parse_action_issue_intent(options: task_parse_action_issue_intent_options) {
    const { with_issue_title, with_issue_body } = options;
    // if str_issue_title start with '[AUTO]'
    if (with_issue_title.startsWith('[AUTO]')) {
        debug('Issue title intent detected');
        return 'AUTO_TRANSLATE';
    }
    return 'NO_INTENT';
}