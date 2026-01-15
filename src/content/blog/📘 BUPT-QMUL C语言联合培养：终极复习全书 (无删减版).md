---
title: 'C语言联合培养：终极复习全书'
description: '对《C语言往年试题与练习题》的全量解析，包含基础术语、编程题、填空题逻辑。'
date: 2026-01-09
tags: ['C语言', 'BUPT', 'QMUL', '期末复习']
---

#C语言 #BUPT #QMUL #期末复习 #核心笔记 #算法大全 
**最后更新日期**：2026-01-09 
> [!ABSTRACT] 导言 
> > 本文档是对《C语言往年试题与练习题和一些英语单词与笔.pdf》的**全量解析**。不仅包含基础术语，还还原了试卷中的编程题、填空题逻辑，并结合手写笔记补充了考试中极易扣分的细节。 
> > **适用对象**：期末突击、查漏补缺、算法模板背诵。
---

## 第一部分：中英对照术语大全 (Terminology Reference)

这部分内容直接对应试卷中的阅读理解和术语辨析题，务必熟记英文拼写。

### 1.1 编译与执行环境 (Compilation & Execution)
| English Term | Chinese Translation | Detailed Explanation |
| :--- | :--- | :--- |
| **Source file** | 源文件 | [cite_start]程序员编写的文本文件，后缀通常为 `.c` [cite: 3125-3140] |
| **Object file** | 目标文件 | 源代码经过编译(`Compiler`)后生成的二进制文件，后缀 `.obj` |
| **Executable file** | 可执行文件 | 目标文件与库函数连接(`Linker`)后生成的文件，后缀 `.exe` |
| **Editor** | 编辑器 | 用于编写代码的工具 (如 Notepad++, VS Code) |
| **Compiler** | 编译器 | 将高级语言翻译成机器语言的程序，检查**语法错误(Syntax Error)** |
| **Linker** | 连接器 | 将编译好的模块和库文件组合成一个可执行程序 |
| **Debugger** | 调试器 | 用于逐行执行、查看变量、发现**逻辑错误(Logic Error)** |
| **Algorithm** | 算法 | 解决问题的步骤序列，通常用**流程图(Flowchart)**表示 |

### 1.2 数据类型与变量 (Data & Variables)
| English Term | Chinese Translation | Detailed Explanation |
| :--- | :--- | :--- |
| **Identifier** | 标识符 | 变量、函数等的名称。**规则**：字母/下划线开头，区分大小写 |
| **Keyword** | 关键字 | 系统保留字 (如 `if`, `while`, `return`)，不可做标识符 |
| **Variable** | 变量 | 内存中存储数据的容器，值可以改变 |
| **Constant** | 常量 | 执行过程中值不变的量 (如 `3.14`, `'A'`) |
| **Integer** | 整数 | `int`, `short`, `long`。注意整数除法的截断特性 |
| **Floating point** | 浮点数 | `float`, `double`。由**尾数(Mantissa)**和**指数(Exponent)**组成 |
| **Character** | 字符 | `char`。本质是整数 (ASCII码) |
| **String** | 字符串 | 以 `\0` 结尾的字符数组 |
| **Scope** | 作用域 | 变量在程序中可见的范围 (Global vs Local) |

### 1.3 运算符与表达式 (Operators & Expressions)
| English Term | Chinese Translation | Detailed Explanation |
| :--- | :--- | :--- |
| **Operand** | 操作数 | [cite_start]参与运算的数据 (如 `a+b` 中的 a 和 b) [cite: 3144-3150] |
| **Arithmetic operator** | 算术运算符 | `+`, `-`, `*`, `/`, `%` |
| **Relational operator** | 关系运算符 | `==` (等于), `!=`, `>`, `<`, `>=`, `<=` |
| **Logical operator** | 逻辑运算符 | `&&` (与), `||` (或), `!` (非) |
| **Assignment operator** | 赋值运算符 | `=` 以及复合赋值 `+=`, `-=` 等 |
| **Precedence** | 优先级 | 决定运算顺序的规则 (如乘除先于加减) |
| **Associativity** | 结合性 | 同优先级时的计算方向 (通常从左到右，但赋值是从右到左) |

---

## 第二部分：核心语法深度解析 (Core Syntax Deep Dive)

### 2.1 数据的输入与输出 (I/O)
* **printf 输出格式**：
    * `%d`: 十进制整数
    * `%f`: 浮点数 (默认6位小数)，`%.2f` 强制保留2位。
    * `%c`: 单个字符
    * `%s`: 字符串
    * **对齐**：`%5d` (右对齐，补空格)，`%-5d` (左对齐)。
* **scanf 输入陷阱**：
    * **必须取地址**：`scanf("%d", &a);` 中的 `&` 绝对不能漏。
    * **分隔符**：`scanf` 默认用空格、Tab、回车作为数据的分隔。
    * **字符读取**：`scanf("%c", &ch)` 会读取缓冲区中遗留的回车符。*解决办法*：在 `%c` 前加空格 `scanf(" %c", &ch)` 或使用 `getchar()` 吃掉回车。

### 2.2 运算符的隐蔽细节
* **除法 (`/`)**：
    * `int / int` 结果仍为 `int`。例：`5 / 2` 结果是 `2` (截断)，而不是 `2.5`。
    * 要想得到小数，必须有浮点数参与：`5.0 / 2` 结果是 `2.5`。
* **取余 (`%`)**：
    * 只能用于**整数**。`5.5 % 2` 是非法的(Syntax Error)。
    * 结果的符号通常与**被除数**一致。
* **自增自减 (`++`, `--`)**：
    * `b = ++a` (前缀)：先将 `a` 加 1，再赋值给 `b`。
    * `b = a++` (后缀)：先将 `a` 赋值给 `b`，再将 `a` 加 1。
* **逻辑短路 (Short-circuit Evaluation)**：
    * `exp1 && exp2`: 如果 `exp1` 为 0 (假)，则**完全不执行** `exp2`。
    * `exp1 || exp2`: 如果 `exp1` 为非 0 (真)，则**完全不执行** `exp2`。
    * *考题坑点*：`if(a > 0 || b++ > 0)`，如果 a>0 成立，`b++` 永远不会执行，b 的值不会变。

### 2.3 流程控制 (Control Structures)
* **Switch-Case 穿透机制**：
    * `case` 只是入口。一旦进入某个 case，如果后面没有 `break`，程序会**直接向下执行**后续所有 case 的语句，直到遇到 break 或 switch 结束。
    * *应用*：利用穿透特性处理多个 case 执行相同代码的情况（如 `case 'A': case 'B': printf("Good"); break;`）。
* **For 循环与 While 循环转换**：
    * *真题*：Recode `for(i=1; i<10; i+=2)` to `while`.
    * *转换模板*：
        ```c
        i = 1; // 初始化
        while(i < 10) { // 条件
            // 循环体
            i += 2; // 迭代(步进)
        }
        ```

---

## 第三部分：难点突破——指针与数组 (Pointers & Arrays)

> [!DANGER] 这里的概念最容易混淆，请反复阅读。

### 3.1 指针的本质
* **定义**：指针是一个变量，但它存储的不是普通数值，而是内存中的**地址 (Address)**。
* **三个关键操作**：
    1.  `int *p;` —— 定义一个指向 int 类型的指针变量 p。
    2.  `p = &a;` —— 取变量 a 的地址赋给 p。
    3.  `*p = 10;` —— **解引用 (Dereference)**。访问 p 所指向的那个地址（即 a），并修改其值为 10。

### 3.2 数组与指针的“纠缠”
* **一维数组**：
    * `int a[5];`
    * `a` (数组名) 就是数组首元素的地址，即 `&a[0]`。
    * `*(a+i)` 等价于 `a[i]`。
    * **区别**：指针变量 `p` 可以改变指向 (`p++` 合法)，但数组名 `a` 是**常量指针**，不可改变 (`a++` 非法)。
* **字符串与字符指针**：
    * `char str[] = "Hello";` —— 在栈上分配空间，内容可修改。
    * `char *p = "Hello";` —— 指向**字符串常量区**，内容**不可修改**（尝试 `p[0]='h'` 会导致程序崩溃）。

### 3.3 指针运算
* **指针加减**：`p + 1` 并不是地址值加 1，而是加上**所指数据类型的大小** (sizeof type)。
    * 若 p 指向 int (4字节)，`p+1` 内存地址增加 4。
    * 若 p 指向 char (1字节)，`p+1` 内存地址增加 1。

---

## 第四部分：真题算法与代码模板 (Code Patterns)

以下代码基于文档中的试题要求还原，请背诵这些逻辑。

### 4.1 基础算法题
#### Q1: 键盘读取整数并打印 (Read & Print)
```c
#include <stdio.h>
int main() {
    int num;
    printf("Please enter an integer: ");
    scanf("%d", &num); // 注意 &
    printf("The number is: %d\n", num);
    return 0;
}
````

#### Q2: 判断奇偶性 (Odd or Even)

C

```c
if (num % 2 == 0) 
    printf("Even");
else 
    printf("Odd");
```

#### Q3: 三个数求最大值 (Max of 3 numbers)

C

```c
// 方法一：嵌套if
if (a >= b && a >= c) max = a;
else if (b >= a && b >= c) max = b;
else max = c;

// 方法二：打擂台法 (推荐)
int max = a;
if (b > max) max = b;
if (c > max) max = c;
```

### 4.2 循环与数学题

#### Q4: 求阶乘 n! (Factorial)

C

```c
long long fact = 1; // 阶乘增长快，建议用 long long
for (int i = 1; i <= n; i++) {
    fact = fact * i;
}
```

#### Q5: 判断素数 (Prime Number Check)

C

```c
int isPrime = 1; // 假设是素数
if (n <= 1) isPrime = 0; // 1不是素数
for (int i = 2; i * i <= n; i++) { // 只需要循环到 sqrt(n)
    if (n % i == 0) {
        isPrime = 0;
        break; // 发现因子，立即退出
    }
}
```

#### Q6: 水仙花数 (Narcissistic Number)

_题目：输出 100-999 之间的水仙花数（各位立方和等于本身）_

C

```c
for (int i = 100; i < 1000; i++) {
    int a = i / 100;       // 百位
    int b = (i % 100) / 10; // 十位
    int c = i % 10;        // 个位
    if (a*a*a + b*b*b + c*c*c == i) {
        printf("%d\n", i);
    }
}
```

### 4.3 数组与字符串题

#### Q7: 数组求平均值 (Average of Array)

C

```c
int sum = 0;
for (int i = 0; i < 10; i++) {
    sum += a[i];
}
float avg = (float)sum / 10; // 注意强制类型转换
```

#### Q8: 统计字符串中的单词数 (Word Count)

_逻辑：检测“空格到非空格”的跳变_



```c
int count = 0, word = 0;
char c;
// 假设逐字符读取
while ((c = getchar()) != '\n') {
    if (c == ' ') word = 0; // 当前是空格
    else if (word == 0) {   // 当前不是空格，且之前是空格
        word = 1;
        count++;
    }
}
```

---

## 第五部分：手写笔记独家考点 (Handwritten Notes Secrets)

> [!TIP] 这里的每一条都是前人踩过的坑！

1. **条件判断的写法**：
    
    - 不要写 `if(0 < x < 10)`，C语言会先算 `0<x` 得到 0 或 1，再用这个结果去和 10 比较，永远为真。
        
    - **正确写法**：`if(x > 0 && x < 10)` 1。
        
2. **真假值的本质**：
    
    - C语言没有 boolean 类型（C89标准）。
        
    - **0 代表 False**。
        
    - **非 0 代表 True** (无论是 1, -1 还是 100)。
        
    - _例子_：`if(3)` 会执行，`if(-5)` 也会执行，只有 `if(0)` 不执行。
        
3. **单双出口问题**：
    
    - `if ...` 是单出口。
        
    - `if ... else ...` 是双出口。
        
4. **宏定义陷阱**：
    
    - `#define N 10` (无分号！)
        
    - 如果写成 `#define N 10;`，那么代码 `int a[N];` 会变成 `int a[10;];` —— **报错**。
        
5. **变量交换 (Swap)**：
    
    - 错误：`a=b; b=a;` (导致两个都是 b 的值)。
        
    - 正确：`t=a; a=b; b=t;`。
        
6. **ASCII 转换技巧**：
    
    - 小写转大写：`ch = ch - 32;` (因为 'a' > 'A')。
        
    - 数字字符转数字：`int num = ch - '0';` (如 '5' - '0' = 5)。
        

---

## 第六部分：考试策略 (Exam Strategy)

1. **阅读程序题**：
    
    - 准备一张草稿纸，画出变量表格，模拟计算机一步步执行（Trace code）。
        
    - 遇到循环，不要试图一眼看穿结果，老老实实代入前 3 次循环的值计算。
        
2. **填空题**：
    
    - 注意上下文的变量类型。
        
    - 如果是填运算符，优先考虑 `==` 和 `=` 的区别。
        
    - 如果是填分号 `;`，检查是否是 `do-while` 结尾或者结构体定义结尾。
        
3. **编程题**：
    
    - **头文件**：`#include <stdio.h>` 必写。
        
    - **缩进**：良好的缩进能感动阅卷老师，即使逻辑微错也可能给分。
        
    - **注释**：关键步骤写上 `// calculate average`，表明你的思路是清晰的。