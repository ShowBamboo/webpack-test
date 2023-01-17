> Webpack 是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目。  
一切文件：JavaScript、CSS、SCSS、图片、模板，在 Webpack 眼中都是一个个模块，这样的好处是能清晰的描述出各个模块之间的依赖关系，以方便 Webpack 对模块进行组合和打包。 经过 Webpack 的处理，最终会输出浏览器能使用的静态资源。


### 基础配置
- mode   
development：开发模式，打包更加快速，省了代码优化步骤；  
production：生产模式，打包比较慢，会开启 tree-shaking 和 压缩代码；  
none：不使用任何默认优化选项；
- entry
- output
- Loader：webpack 默认支持处理 JS 与 JSON 文件，其他类型文件都处理不了，这里必须借助 Loader 来对不同类型的文件的进行处理。
- Plugin：与 Loader 用于转换特定类型的文件不同，插件可以贯穿 Webpack 打包的生命周期，执行不同的任务。 Plugin 是用来扩展 Webpack 功能的。   
html-webpack-plugin：打包后的资源文件，可以自动引入到html中；  
clean-webpack-plugin：在打包前将打包目录清空；  
mini-css-extract-plugin：分离样式文件，通过 CSS 文件的形式引入到页面上；  
- webpack-dev-server：开发环境启动服务，实时刷新预览。
- webpack-merge：开发环境和生产环境共用的配置，可以 merge 到开发或生产环境，从而减少重复配置。

### 优化
#### 优化构建速度
- speed-measure-webpack-plugin   
构建费时分析
- 缩小文件搜索范围  
在使用 Loader 时可以通过 test 、 include 、 exclude 三个配置项来命中 Loader 要应用规则的文件。 为了尽可能少的让文件被 Loader 处理，可以通过 include 去命中只有哪些文件需要被处理。（exclude 优先级更高）
- 配置 alias 别名  
设置别名可以让后续引用的地方减少路径的复杂度。
- noParse  
忽略对部分没采用模块化的文件的递归解析处理，不需要解析依赖的第三方大型类库等，提高构建性能；  
使用 noParse 进行忽略的模块文件中不会解析 import、require 等语法；  
- 多进程配置  
thread-loader用来开启多进程解析 loader；使用时需将此 loader 放置在其他 loader 之前。放置在此 loader 之后的 loader 会在一个独立的 worker 池中运行。
- 利用缓存  
cache 持久化缓存
```
cache: {
  type: 'filesystem',
},
```

#### 优化构建结果
- webpack-bundle-analyzer  
构建结果分析
- 在生成环境下打包默认会开启 js 压缩，但是当我们手动配置 optimization 选项之后，就不再默认对 js 进行压缩，需要我们手动去配置。  
optimize-css-assets-webpack-plugin压缩css；  
terser-webpack-plugin压缩js；  
- tree-shaking
剔除没有使用的代码，以降低包的体积；在 production 环境默认开启
- 清除无用css  
purgecss-webpack-plugin 会单独提取css并清除用不到的css；  
- Scope Hoisting
作用域提升，原理是将多个模块放在同一个作用域下，并重命名防止命名冲突，通过这种方式可以减少函数声明和内存开销。在 production 环境默认开启  
- 代码分割
entry配置多个打包入口；  
SplitChunks提取或分离代码的插件；主要作用是提取公共代码，防止代码被重复打包，拆分过大的 js 文件，合并零散的 js 文件。



