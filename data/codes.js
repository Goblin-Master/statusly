// ============================================================
// Statusly — HTTP 状态码数据
// 全部数据内置在本地，扩展无需联网即可查询。
// 如需新增状态码，直接在对应分类中追加即可，格式：
//   码值: { name: "英文名称", desc: "中文解释", tip: "补充说明（可选）" }
// ============================================================

window.HTTP_CODES = {
  // ---------------- 1xx 信息响应 ----------------
  100: {
    name: "Continue",
    desc: "服务器已收到请求头，客户端应继续发送请求主体。",
    tip: "常见于上传大文件时，客户端先发送 Expect: 100-continue 试探服务器是否愿意接收。"
  },
  101: {
    name: "Switching Protocols",
    desc: "服务器同意切换到客户端请求的协议。",
    tip: "WebSocket 握手成功时返回的就是 101。"
  },
  102: {
    name: "Processing",
    desc: "服务器已收到完整请求，正在处理但还没有结果，用于避免客户端超时。",
    tip: "WebDAV 场景中常见。"
  },
  103: {
    name: "Early Hints",
    desc: "服务器提前返回部分响应头，提示浏览器预加载资源。",
    tip: "常配合 Link: rel=preload 使用，可以明显加快首屏渲染。"
  },

  // ---------------- 2xx 成功 ----------------
  200: {
    name: "OK",
    desc: "请求成功，服务器已返回所请求的内容。",
    tip: "最常见的成功状态码，GET / POST 正常处理时都会返回它。"
  },
  201: {
    name: "Created",
    desc: "请求成功，并且服务器创建了一个新的资源。",
    tip: "新增数据接口（如注册用户、创建订单）成功后通常返回 201，并在 Location 头中给出新资源地址。"
  },
  202: {
    name: "Accepted",
    desc: "请求已被接受，但尚未处理完成。",
    tip: "用于异步任务：接口先返回 202，客户端再轮询或等待回调获取最终结果。"
  },
  203: {
    name: "Non-Authoritative Information",
    desc: "请求成功，但返回的元信息来自缓存副本，而非源服务器。",
    tip: "常见于经过转换代理的场景。"
  },
  204: {
    name: "No Content",
    desc: "请求成功，但没有返回任何响应内容。",
    tip: "常用于 DELETE 成功，或 PUT 更新后无需回传数据的场景。"
  },
  205: {
    name: "Reset Content",
    desc: "请求成功，客户端应重置文档视图（例如清空表单）。",
    tip: "实际使用较少。"
  },
  206: {
    name: "Partial Content",
    desc: "服务器返回了资源的一部分内容。",
    tip: "视频拖动进度条、大文件断点续传时，依赖 Range 请求返回 206。"
  },
  207: {
    name: "Multi-Status",
    desc: "响应体中包含多个资源各自的状态信息。",
    tip: "WebDAV 批量操作时使用。"
  },
  208: {
    name: "Already Reported",
    desc: "该资源已在之前的响应中报告过，避免在集合中重复枚举。",
    tip: "WebDAV 场景使用。"
  },
  226: {
    name: "IM Used",
    desc: "服务器已对资源应用实例操作，返回的是增量结果。",
    tip: "与 Delta 编码相关，实际项目中很少见。"
  },

  // ---------------- 3xx 重定向 ----------------
  300: {
    name: "Multiple Choices",
    desc: "请求的资源有多个可选的表示形式，需要客户端选择其一。",
    tip: "实际使用较少，服务端通常会直接把请求重定向到默认选项。"
  },
  301: {
    name: "Moved Permanently",
    desc: "请求的资源已永久迁移到新的地址。",
    tip: "浏览器和搜索引擎会记住这个跳转。换域名、改 URL 结构时使用，注意缓存后不易撤销。"
  },
  302: {
    name: "Found",
    desc: "请求的资源临时位于另一个地址。",
    tip: "旧称 Moved Temporarily。登录跳转、活动页跳转常用 302，客户端后续仍请求原地址。"
  },
  303: {
    name: "See Other",
    desc: "应使用 GET 方法请求另一个地址来获取结果。",
    tip: "表单提交成功后重定向到结果页（POST-Redirect-GET 模式）常用 303。"
  },
  304: {
    name: "Not Modified",
    desc: "资源自上次请求后未发生变化，可直接使用本地缓存。",
    tip: "浏览器带上 If-None-Match / If-Modified-Since 后，服务端用它节省带宽。注意：它本身不带响应体。"
  },
  305: {
    name: "Use Proxy",
    desc: "必须通过指定的代理服务器访问该资源。",
    tip: "因安全隐患已被废弃，不建议使用。"
  },
  307: {
    name: "Temporary Redirect",
    desc: "临时重定向，且要求客户端保持原请求方法和请求体不变。",
    tip: "与 302 的区别：302 在历史上存在把 POST 改成 GET 的实现，307 则严格保留原方法。"
  },
  308: {
    name: "Permanent Redirect",
    desc: "永久重定向，且要求客户端保持原请求方法和请求体不变。",
    tip: "可理解为 307 的永久版本，与 301 的区别同样是保留原请求方法。"
  },

  // ---------------- 4xx 客户端错误 ----------------
  400: {
    name: "Bad Request",
    desc: "请求语法有误或参数不合法，服务器无法理解该请求。",
    tip: "排查方向：JSON 格式错误、必填字段缺失、参数类型不符。"
  },
  401: {
    name: "Unauthorized",
    desc: "请求未提供有效的身份凭证，需要先进行认证。",
    tip: "名字容易误解：它表示「未认证」，而不是「无权限」。检查 Token 是否缺失、过期或格式错误。"
  },
  402: {
    name: "Payment Required",
    desc: "该资源需要付费后才能访问。",
    tip: "协议中保留的状态码，商业项目中偶尔用于表示额度不足。"
  },
  403: {
    name: "Forbidden",
    desc: "服务器理解了请求，但拒绝执行，通常是权限不足。",
    tip: "与 401 的区别：403 是身份已确认但没有权限；401 是根本没认证。"
  },
  404: {
    name: "Not Found",
    desc: "请求的资源不存在，服务器无法找到对应的页面或资源。",
    tip: "排查方向：URL 拼写、路由配置、资源是否已删除。注意接口路径写错也常返回 404。"
  },
  405: {
    name: "Method Not Allowed",
    desc: "请求方法不被该资源支持。",
    tip: "例如对只读接口发送了 POST，或接口只允许 GET。响应头 Allow 会列出支持的方法。"
  },
  406: {
    name: "Not Acceptable",
    desc: "服务器无法生成符合请求头 Accept 要求的内容。",
    tip: "常见于客户端指定了 application/json 但服务端只能返回 XML。"
  },
  407: {
    name: "Proxy Authentication Required",
    desc: "需要先通过代理服务器的身份认证。",
    tip: "公司内网代理、抓包工具（如 Charles）未配置信任时容易遇到。"
  },
  408: {
    name: "Request Timeout",
    desc: "客户端在服务器等待的时间内没有完成请求发送。",
    tip: "多见于网络极慢或连接被中途挂起的场景。"
  },
  409: {
    name: "Conflict",
    desc: "请求与资源当前状态发生冲突。",
    tip: "典型场景：并发编辑同一条数据、注册时用户名已存在。"
  },
  410: {
    name: "Gone",
    desc: "资源已被永久删除，且不会再恢复。",
    tip: "比 404 更明确，适合已下线且不再提供的内容，便于搜索引擎移除索引。"
  },
  411: {
    name: "Length Required",
    desc: "请求缺少 Content-Length 头，服务器拒绝处理。",
    tip: "用 chunked 传输或手动构造请求时容易漏掉。"
  },
  412: {
    name: "Precondition Failed",
    desc: "请求头中的前置条件不成立。",
    tip: "例如使用 If-Match 做乐观锁时，版本号已经变化。"
  },
  413: {
    name: "Content Too Large",
    desc: "请求体过大，超出了服务器允许的上限。",
    tip: "上传大文件被 Nginx 拦截时很常见，可调整 client_max_body_size。"
  },
  414: {
    name: "URI Too Long",
    desc: "请求的 URL 过长，服务器无法处理。",
    tip: "GET 请求塞了太多参数时容易出现，建议改用 POST。"
  },
  415: {
    name: "Unsupported Media Type",
    desc: "请求体的媒体类型不被服务器支持。",
    tip: "检查 Content-Type 是否正确，例如漏写 application/json。"
  },
  416: {
    name: "Range Not Satisfiable",
    desc: "请求的字节范围无法满足。",
    tip: "常见于断点续传时本地缓存的文件大小与服务端不一致。"
  },
  417: {
    name: "Expectation Failed",
    desc: "服务器无法满足 Expect 请求头中的要求。",
    tip: "多见于老版本代理不支持 Expect: 100-continue。"
  },
  418: {
    name: "I'm a teapot",
    desc: "我是茶壶。一个源自愚人节 RFC 的玩笑状态码。",
    tip: "RFC 2324 超文本咖啡壶控制协议。很多框架把它用作彩蛋或占位返回。"
  },
  421: {
    name: "Misdirected Request",
    desc: "请求被发送到了无法为该请求提供响应的服务器。",
    tip: "HTTP/2 连接复用与 TLS 证书域名不匹配时可能出现。"
  },
  422: {
    name: "Unprocessable Content",
    desc: "请求格式正确，但语义有误，服务器无法处理。",
    tip: "表单校验失败、字段格式不合规时后端常返回 422，并附带具体错误信息。"
  },
  423: {
    name: "Locked",
    desc: "目标资源已被锁定。",
    tip: "WebDAV 场景使用。"
  },
  424: {
    name: "Failed Dependency",
    desc: "由于前一个请求失败，导致当前请求也失败。",
    tip: "WebDAV 批量操作中使用。"
  },
  425: {
    name: "Too Early",
    desc: "服务器不愿处理可能被重放的过早请求。",
    tip: "与 TLS 1.3 的 0-RTT 早期数据相关。"
  },
  426: {
    name: "Upgrade Required",
    desc: "客户端需要升级协议后才能继续访问。",
    tip: "例如强制要求 HTTPS 或要求升级到 HTTP/2。"
  },
  428: {
    name: "Precondition Required",
    desc: "服务器要求请求必须携带前置条件，以防止并发覆盖。",
    tip: "常与 If-Match 配合，避免多人同时修改同一条数据。"
  },
  429: {
    name: "Too Many Requests",
    desc: "请求频率过高，触发了服务器的限流策略。",
    tip: "爬虫、接口被刷时的典型返回。响应头 Retry-After 会提示多久后可以重试。"
  },
  431: {
    name: "Request Header Fields Too Large",
    desc: "请求头字段过大，服务器拒绝处理。",
    tip: "常见于 Cookie 累积过多或 Token 过长。"
  },
  451: {
    name: "Unavailable For Legal Reasons",
    desc: "因法律原因无法提供该资源。",
    tip: "名称致敬《华氏 451 度》，用于内容因合规要求被屏蔽的场景。"
  },

  // ---------------- 5xx 服务器错误 ----------------
  500: {
    name: "Internal Server Error",
    desc: "服务器内部发生错误，无法完成请求。",
    tip: "排查方向：查看服务端日志与堆栈，通常是未捕获的异常或数据库连接失败。"
  },
  501: {
    name: "Not Implemented",
    desc: "服务器不支持完成该请求所需的功能。",
    tip: "例如服务器不认识请求方法，或功能尚未开发。"
  },
  502: {
    name: "Bad Gateway",
    desc: "网关或代理从上游服务器收到了无效响应。",
    tip: "Nginx 报 502 通常意味着后端进程挂掉、端口未监听或崩溃重启中。"
  },
  503: {
    name: "Service Unavailable",
    desc: "服务暂时不可用，通常是维护或负载过高。",
    tip: "响应头 Retry-After 会告知恢复时间，反向代理层常返回此码做熔断。"
  },
  504: {
    name: "Gateway Timeout",
    desc: "网关或代理等待上游服务器响应超时。",
    tip: "后端处理太慢超过代理超时时间（如 Nginx proxy_read_timeout）时出现。"
  },
  505: {
    name: "HTTP Version Not Supported",
    desc: "服务器不支持请求所使用的 HTTP 版本。",
    tip: "极少见，多出现在畸形请求或过时代理中。"
  },
  506: {
    name: "Variant Also Negotiates",
    desc: "内容协商配置存在循环引用，导致处理失败。",
    tip: "服务端内容协商配置错误的信号。"
  },
  507: {
    name: "Insufficient Storage",
    desc: "服务器存储空间不足，无法完成请求。",
    tip: "WebDAV 场景使用；也可用于磁盘写满的提示。"
  },
  508: {
    name: "Loop Detected",
    desc: "服务器检测到处理过程中出现了无限循环。",
    tip: "WebDAV 场景使用。"
  },
  510: {
    name: "Not Extended",
    desc: "需要对请求进行进一步扩展后才能被服务器处理。",
    tip: "HTTP 扩展框架相关，实际极少使用。"
  },
  511: {
    name: "Network Authentication Required",
    desc: "需要完成网络认证才能访问网络。",
    tip: "连公共 Wi-Fi 时弹出的登录门户页面，返回的就是 511。"
  }
};

// 分类元信息：用于卡片配色与分类标签
window.HTTP_CATEGORIES = {
  1: { label: "信息响应", cls: "t1" },
  2: { label: "成功", cls: "t2" },
  3: { label: "重定向", cls: "t3" },
  4: { label: "客户端错误", cls: "t4" },
  5: { label: "服务器错误", cls: "t5" }
};

// 顶部快捷查询的常用状态码
window.QUICK_CODES = [200, 301, 404, 500];
