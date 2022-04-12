/**
 * api : GeneratorAPI实例
 * options: prompts组合成的选项对象
 * rootOptions: 整个preset.json对象
 */
module.exports = (api, options, rootOptions) => {
  if (options.type === "uniapp") {
    api.render("./template/miniapp-uniapp", { inputOptions: { ...options }, rootOptions: {...rootOptions} });
  }
}
