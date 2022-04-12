# template-vue-preset

一个基于vue-cli生成项目开发模板，通过vue create引用模板。

> 模板存放在 `/template/**`，如需调整，可参考[vue插件官方开发指南](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html)

## 使用

```
$ vue create --preset Gosixes/template-vue-preset <project-name>
```

- 选择项目类型

  选择完类型后，会把template下对应类型的文件目录来创建新项目。

​	目前可使用的项目类型：

1. miniapp-uniapp: 基于uniapp开发微信小程序

更多项目模板添加中。



> 模板渲染使用ejs引擎，其中一些标签含义

- `<%` '脚本' 标签，用于流程控制，无输出。
- `<%_` 删除其前面的空格符
- `<%=` 输出数据到模板（输出是转义 HTML 标签）
- `<%-` 输出非转义的数据到模板
- `<%#` 注释标签，不执行、不输出内容
- `<%%` 输出字符串 '<%'
- `%>` 一般结束标签
- `-%>` 删除紧随其后的换行符
- `_%>` 将结束标签后面的空格符删除