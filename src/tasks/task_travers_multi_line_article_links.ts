async function process_one_article(
    str_news_link: string,
    input_mdfile_dir: string,
    output_mdfile_dir: string,
    target_language: string
) {

    console.log('str_news_link:', str_news_link);
    console.log('input_mdfile_dir:', input_mdfile_dir);

    console.log('target_language:', target_language);

    const str_prompt = map_str_prompts[target_language];
    console.log('str_prompt:', str_prompt);
    if (!str_prompt) {
        throw new Error('Unsupported language');
    }

    const path = getRouteAddr(str_news_link);
    const input_mdfile_path = join(
        input_mdfile_dir,
        path.split('/').filter(Boolean).at(-1) + '.md'
    );
    const output_mdfile_path = join(
        output_mdfile_dir,
        path.split('/').filter(Boolean).at(-1) + '.md'
    );

    const str_md = await readFile(input_mdfile_path, 'utf-8');

    const arr_str_md = str_md.split('\n\n');
    let str_md_translated = '';
    const len = arr_str_md.length;
    let str_temp = '';
    const MAX_LENGTH = 1024 * 5;
    let count_scope_token = 0;
    for (let i = 0; i < len; i++) {
        const not_last = i < len - 1;
        const str = arr_str_md[i];

        let flag_pased = false;
        if (str_temp.length < MAX_LENGTH) {
            // 如果长度不够，继续拼接
            str_temp += (str + '\n\n');
            flag_pased = true;
            if (not_last) continue;
        }

        // 快速扫描 str 中有多少个 ``` 符号
        const count = (str.match(/```/g) || []).length;
        count_scope_token += count;
        if (count_scope_token % 2 === 1 && !flag_pased) {
            // 如果是代码块，且没有被拼接过，继续拼接
            str_temp += (str + '\n\n');
            flag_pased = true;
            if (not_last) continue;
        } else {
            count_scope_token = 0;
        }

        console.log(`============== [${i} / ${len}] ==============`)
        const str_translated = await translate(str_temp, str_prompt);
        str_temp = '';

        str_md_translated += str_translated + '\n\n';
        console.log('\n')
    }

    // 写文件
    console.log('output_mdfile_path:', output_mdfile_path);
    await ensureFile(output_mdfile_path);
    await unlink(output_mdfile_path);
    await writeFile(output_mdfile_path, str_md_translated);

    const { repo, ref } = context;
    const successMessage = `
  - Auto translated Markdown file: [click to edit](https://github.com/${repo.owner}/${repo.repo
        }/edit/${join(ref.replace(/^refs\/heads\//, ''), output_mdfile_path)})`;

    await addComment(successMessage.trim());
}
