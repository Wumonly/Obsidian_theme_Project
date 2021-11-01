---
created: <% tp.date.now("YYYY-MM-DD%20HH:mm") %>
aliases: <% tp.file.title %>
tags: ```js quickadd
let aInput = await this.quickAddApi.checkboxPrompt(["计算机组成原理", "计算机网络", "计算机操作系统", "JavaScript", "Python","HTML","CSS","标签"],["HTML"]);
let bb = windows.getAllTags()
if (aInput=="HTML") {
 let bInput = await this.quickAddApi.checkboxPrompt(
 ["表格"],["表格"]);
 const ainput = aInput.join(",");
 const binput = bInput.join(",");
 return `[${ainput},${binput}]`; 
} else {
 const input = aInput.join(",");
 return `[${bb}]`;
}
```
created_time: <% tp.file.creation_date("YY-MM-DD-HH:mm")%20%>
uid: <%tp.date.now("YYMMDDHHmmss")%20%>
blog: 
---
