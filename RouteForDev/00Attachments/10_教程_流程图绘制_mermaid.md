---
mindmap-plugin: basic
描述: 这个文档是使用Markdown绘制流程图的实例
tags: []
created_time: 21-08-29-10:28
uid: 2108291028
aliases: []
---
# 教程_流程图绘制实例
```mermaid
flowchart TD
%% 创建各种形状的Node 
id1[方框Node]
id2(圆角方框Node)%20
id3(["stadium-shaped(体育场型)%20node"])
id4[subroutine shape](subroutine%20shape.md)
id5[(cylindrical%20shape)]
id6(("circle圆形"))
id7>A node in an asymmetric shape]
id8{A node in a rhombus}
id9{{A hexagon node}}
id10[/平行四边形Parallelogram/]
id11[\"反平行四边形(Parallelogram%20Alt)"\]
id12[/等边梯形Trapezoid\]
id13[\倒等边梯形Trapezoid Alt/]
%% 创建各种形状的边
id1---|线上面的文形式1|id2 
id2-- 线上面的文字形式2 -->id3-.虚线.->id5 == 粗线 ==>id7 -->id9-->id11-->id13
id2-- 短线越多线越长--->id4 <--> id6 o--o id8 x--x id10-->id12
id9 --> A & B -->id8
```
对于虚线或粗链接，要添加的字符是等号或点，总结如下表：
      
| 长度       | 1      | 2       | 3        |
| ---------- | ------ | ------- | -------- |
| 普通的     | `---`  | `----`  | `-----`  |
| 正常带箭头 | `-->`  | `--->`  | `---->`  |
| 厚的       | `===`  | `====`  | `====`   |
| 粗有箭头   | `==>`  | `===>`  | `====>`  |
| 虚线       | `-.-`  | `-..-`  | `-...-`  |
| 用箭头点缀 | `-.->` | `-..->` | `-...->` | 


