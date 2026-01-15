# 📘 Calculus & ODEs: Ultimate Master Guide

> [!meta] Note Metadata
> **Date:** 2026-01-12
> **Type:** All-in-One Master Note
> **Tags:** #Math #Calculus #ODE #Review #ExamPrep #TaylorSeries #Geometry

---

## 🎯 第一部分：基础概念与导数 (Foundations)

### 1. 微分符号的本质：为什么能“拆开”？

**核心逻辑：**
> [!note] 导数与微分定义
> * **导数 (Derivative):** $$f'(x)=\lim_{\Delta x\to 0} \frac{\Delta y}{\Delta x}$$ 这是一个变化率的数值。
> * **微分 (Differential):** 我们人为定义 $$dx=\Delta x$$（自变量的增量），然后定义 $$dy=f'(x)\cdot dx$$（切线上的增量）。

**几何意义：**
局部“以直代曲”。在微观下，曲线就是直线，$\frac{dy}{dx}$ 就是直角三角形的斜率，所以 $dy$ 和 $dx$ 是直角边，当然可以移项运算。

### 2. 参数方程求导 (Parametric Differentiation)

> [!note] 一阶导公式
> $$\frac{dy}{dx} = \frac{y'(t)}{x'(t)} = \frac{dy/dt}{dx/dt}$$
> *(记忆：想求 $y$ 对 $x$ 的变化，就用 $y$ 的速度除以 $x$ 的速度)*

> [!danger] ⚠️ 高危陷阱：二阶导数 $\frac{d^2y}{dx^2}$
> **错误写法：** $\frac{y''(t)}{x''(t)}$ (绝对错误！)
> **正确逻辑：** 二阶导是对“一阶导结果”再求导。
>
> $$\frac{d^2y}{dx^2} = \frac{d}{dx}\left(\frac{dy}{dx}\right) = \frac{\frac{d}{dt}\left(\frac{dy}{dx}\right)}{\frac{dx}{dt}}$$
> *(口诀：上面是对“一阶导结果”求 $t$ 的导，下面除以 $x'(t)$)*

**🆕 经典案例：**
求摆线 $\begin{cases} x=a(t-\sin t) \\ y=a(1-\cos t) \end{cases}$ 的二阶导 $\frac{d^2y}{dx^2}$。

1.  **一阶导**：
    > [!note] Step 1
    > $$\frac{dy}{dx} = \frac{a\sin t}{a(1-\cos t)} = \frac{\sin t}{1-\cos t}$$
2.  **对 $t$ 求导**（分子部分）：
    > [!note] Step 2
    > $$\frac{d}{dt}\left(\frac{dy}{dx}\right) = \frac{\cos t(1-\cos t) - \sin t(\sin t)}{(1-\cos t)^2} = \frac{\cos t - 1}{(1-\cos t)^2} = \frac{-1}{1-\cos t}$$
3.  **最后除以 $x'(t)$**：
    > [!note] Step 3 (Final)
    > $$\frac{d^2y}{dx^2} = \frac{\frac{-1}{1-\cos t}}{a(1-\cos t)} = \frac{-1}{a(1-\cos t)^2}$$

> [!danger] 关键注意
> 别忘了最后除以 $dx/dt=a(1-\cos t)$。

---

## 🧮 第二部分：核心积分技巧 (Core Integration Techniques)

### 1. 凑微分法 (第一类换元)
**“看出来”的艺术：**

> [!note] 核心公式
> $$\int \frac{f'(x)}{f(x)}dx = \ln|f(x)| + C$$
> *(何时化成对数？就这时候！)*

* **例1:** $\int \tan x dx = \int \frac{\sin x}{\cos x} dx = -\ln|\cos x| + C$
* **例2:** $\int \frac{1}{x\ln x} dx = \ln|\ln x| + C$ (令 $u=\ln x$)
* **线性凑法:** $\int f(ax+b)dx = \frac{1}{a}F(ax+b)+C$
* **幂函数凑法:** $\int [f(x)]^n \cdot f'(x)dx = \frac{1}{n+1}[f(x)]^{n+1} + C, (n \neq -1)$

### 2. 分部积分法
> [!note] 公式
> $$\int udv=uv-\int vdu$$

* **选 $u$ 顺序：** **反**对**幂**三**指** (LIATE)
    * 反三角 > 对数 > 幂函数 > 三角 > 指数
    * *排在前面的优先设为 $u$ (求导)，排在后面的设为 $dv$ (积分)*。

---

## 🌊 第三部分：反常积分 (Improper Integrals)

核心定义：无论是无穷远还是无界函数，本质都是 $\lim_{t\to \dots} \int$。

### 1. 判别法深度解析 (P-Test)

**A. 无穷限积分 (区间无限):**
> [!note] P-判别法 ($\infty$)
> $$\int_{1}^{+\infty} \frac{1}{x^p} dx$$
> * $p > 1 \to$ **收敛** (如 $1/x^2$，下降快，压得住)
> * $p \le 1 \to$ **发散** (如 $1/x$，$\ln x \to \infty$)

**B. 瑕积分 (函数爆炸):**
> [!note] P-判别法 (瑕点 0)
> $$\int_{0}^{1} \frac{1}{x^p} dx$$
> * **正好反过来！**
> * $p < 1 \to$ **收敛** (如 $1/\sqrt{x}$，爆发慢)
> * $p \ge 1 \to$ **发散**

> [!danger] 关键细节
> 对于 $\int_{0}^{1} \frac{1}{x^p} dx$，收敛区间是 $p<1$。当 $p=1$ 时，$\int_{0}^{1} \frac{1}{x} dx$ 是发散的。

### 2. 极限比较法 (Limit Comparison Test)
**场景：** 复杂函数 $\int_{1}^{+\infty} \frac{x+1}{x^3+\sin x} dx$

**操作步骤：**
1.  **提炼主部：** 分子 $x$，分母 $x^3$ $\to$ $g(x) = \frac{1}{x^2}$。
2.  **算极限：** $\lim_{x\to +\infty} \frac{f(x)}{g(x)} = 1$。
3.  **下结论：** 因为参照物 $\int 1/x^2$ 收敛 ($p=2>1$)，所以原积分收敛。

---

## ⚔️ 第四部分：一阶微分方程 (First-Order ODEs)

### 1. 变量可分离 (Separable)
* **方法**：移项，分离 $x$ 和 $y$，两边积分。
* **注意**：检查除式是否为 0（防止漏掉常数解）。

### 2. 齐次方程 (Homogeneous)
* **识别**：$y' = \varphi(y/x)$ 或次数相同。
* **换元**：
    > [!note] 齐次换元
    > 令 $$y=ux$$$\implies$$$\frac{dy}{dx} = u + x\frac{du}{dx}$$

### 3. 一阶线性方程 (Linear)
**标准式：** $y' + P(x)y = Q(x)$

> [!note] 万能公式 (必背)
> $$y = e^{-\int P dx} \cdot \left[ \int Q \cdot e^{\int P dx} dx + C \right]$$
> *(口诀：先乘“负积分因子”，括号里“正积分因子”乘 Q 再积分)*

### 4. 伯努利方程 (Bernoulli)
**形式：** $y' + P(x)y = Q(x)y^n$
**破解步骤：**
1.  **除：** 同除 $y^n$ $\to$ $y^{-n}y' + Py^{1-n} = Q$。
2.  **换：** 令 $z=y^{1-n}$。
3.  **导：** $z' = (1-n)y^{-n}y'$，代回化为线性方程。

**🆕 经典案例：** 解 $y' + y = xy^2$ ($n=2$)
1.  换元：$z=y^{1-2}=y^{-1}$，则 $z'=-y^{-2}y'$。
2.  化简：方程变为 $-z' + z = x \implies z' - z = -x$。
3.  求解：$z = e^x [\int -x e^{-x} dx + C]$。
4.  结果：
    > [!note] 最终解
    > $$z = x + 1 + Ce^x \implies y = \frac{1}{x+1+Ce^x}$$

> [!danger] 别忘常数解
> $y=0$ 也是解。

---

## 👑 第五部分：二阶常系数线性微分方程

**全形式:** $y'' + py' + qy = f(x)$
**通解结构:** $y = Y(x) + y^*(x)$

### A. 找齐次解 $Y(x)$
特征方程：$r^2 + pr + q = 0$

| $\Delta$ | 根 $r_1, r_2$ | 通解 $Y(x)$ |
| :--- | :--- | :--- |
| $>0$ | $r_1 \neq r_2$ | $$C_1 e^{r_1 x} + C_2 e^{r_2 x}$$ |
| $=0$ | $r_1 = r_2 = r$ | $$(C_1 + C_2x)e^{rx}$$ |
| $<0$ | $\alpha \pm \beta i$ | $$e^{\alpha x}(C_1 \cos \beta x + C_2 \sin \beta x)$$ |

### B. 找特解 $y^*(x)$ (待定系数法)

**修正规则 (设完看 $k$)：** 如果猜的解包含在 $Y(x)$ 里，就要乘 $x^k$。

**情形 1：右边多项式 $P_m(x)$**
* 设 $y^* = x^k(Ax+B\dots)$
* **$k$ 值判定**：看 0 是否为特征根 (不是=0, 单根=1, 重根=2)。

**情形 2：右边指数 $e^{\lambda x}$**
* 设 $y^* = x^k(A e^{\lambda x})$
* **$k$ 值判定**：看 $\lambda$ 是否为特征根。

**情形 3：右边三角函数 $\cos \beta x$ 或 $\sin \beta x$**
* 设 $y^* = x^k(A\cos\beta x + B\sin\beta x)$
* **$k$ 值判定**：看 $\pm \beta i$ 是否为特征根。

**情形 4：混合型 $e^{\lambda x} P_m(x) \cos \beta x$**
* 设 $y^* = x^k e^{\lambda x} [Q_m(x)\cos\beta x + R_m(x)\sin\beta x]$
* **$k$ 值判定**：看 $\lambda \pm \beta i$ 是否为特征根。

---

## 📈 第六部分：微分中值定理 (Mean Value Theorems)

这部分主要考证明题。

### 1. 罗尔定理 (Rolle's Theorem)
**条件：** 闭区间连续，开区间可导，且 $f(a)=f(b)$。
**结论：**
> [!note] 罗尔定理
> $$\exists \xi \in (a, b), \text{ 使得 } f'(\xi) = 0$$

### 2. 拉格朗日中值定理 (Lagrange MVT)
**条件：** 去掉端点相等限制。
**结论：**
> [!note] 拉格朗日公式
> $$f(b) - f(a) = f'(\xi)(b - a)$$

### 3. 柯西中值定理 (Cauchy MVT)
> [!note] 柯西公式
> $$\frac{f(b) - f(a)}{g(b) - g(a)} = \frac{f'(\xi)}{g'(\xi)}$$

---

## 🎢 第七部分：泰勒公式 (Taylor Series)

**核心思想：** 用多项式逼近函数。

### 1. 麦克劳林公式 (必背五大金刚)

> [!note] 常用展开式 ($x_0=0$)
> 1.  $$e^x = 1 + x + \frac{x^2}{2!} + \dots + \frac{x^n}{n!} + o(x^n)$$
> 2.  $$\sin x = x - \frac{x^3}{3!} + \dots$$ (奇函数只有奇次项)
> 3.  $$\cos x = 1 - \frac{x^2}{2!} + \dots$$ (偶函数只有偶次项)
> 4.  $$\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \dots$$ (分母无阶乘)
> 5.  $$(1+x)^\alpha = 1 + \alpha x + \frac{\alpha(\alpha-1)}{2!}x^2 + \dots$$

### 2. 余项 (Remainder)
* **皮亚诺余项**：$o((x-x_0)^n)$ $\to$ 用于求极限。
* **拉格朗日余项**：$\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}$ $\to$ 用于估算误差。

---

## 🍩 第八部分：定积分几何应用 (Geometric Applications)

### 1. 旋转体体积：圆盘法 vs 圆柱壳法

假设区域由 $y=f(x)$ 围成：

**A. 绕 x 轴旋转 (Disk Method / 圆盘法)**
* 逻辑：垂直切片。
> [!note] 圆盘法公式
> $$V_x = \pi \int_a^b [f(x)]^2 dx$$

**B. 绕 y 轴旋转 (Shell Method / 圆柱壳法)**
* 逻辑：像卷筒纸一样，一层层**圆柱形薄壳**套起来。
> [!note] 圆柱壳法公式
> $$V_y = 2\pi \int_a^b x \cdot f(x) \, dx$$
> *(记忆：$2\pi \times \text{半径}(x) \times \text{高度}(f(x)) \times \text{厚度}(dx)$)*

---

## ⚠️ 个人易错点复盘 (Mistake Log)

> [!danger] 核心检查清单
> 1.  **复数陷阱**：特征方程解出 $\Delta = -16$ 时，$\sqrt{-16} = 4i$，**绝对不是 $2i$**。
> 2.  **导数符号**：参数方程求二阶导，分子是 $\frac{d}{dt}(y')$，必须再除以 $x'(t)$。
> 3.  **积分常数**：不定积分最后别忘了 $+C$。
> 4.  **积分绝对值**：$\int \frac{1}{x} dx = \ln|x|$，漏了绝对值会导致丢失 $y<0$ 的解。
> 5.  **特解完整性**：题目仅有 $\sin$ 时，特解必须设 $A\cos x + B\sin x$。
> 6.  **收敛区间**：P-级数在 $[1, +\infty)$ 是 $p>1$ 收敛，但在 $(0, 1]$ 是 $p<1$ 收敛。