import {
  Controller,
  Get,
  Post,
  HttpCode,
  Injectable,
  Header,
  Redirect,
  Query,
  Param,
} from '@nestjs/common';
import { find } from 'rxjs';

@Controller('cats')
//@Controller({ host: ':account.example.com' })
// export class AccountController {
//   @Get()
//   getInfo(@HostParam('account') account: string) {i
//     return account;
//   }
// }
//与路由 path 类似，hosts 选项可以使用标记来捕获主机名中该位置的动态值。下面 @Controller() 装饰器示例中的主机参数令牌演示了这种用法。可以使用 @HostParam() 装饰器访问以这种方式声明的主机参数，应将其添加到方法签名中。
//@Controller({ host: 'admin.example.com' })
//@Controller 装饰器可以采用 host 选项来要求传入请求的 HTTP 主机匹配某个特定值
export class CatsControll {
  // 'ab*cd' 路由路径将匹配 abcd、ab_cd、abecd 等。字符 ?、+、* 和 () 可以在路由路径中使用，并且是它们对应的正则表达式的子集。连字符 (-) 和点 (.) 由基于字符串的路径逐字解释
  @Get('ab*cd')
  findAllAbcd(): string {
    return '通配符';
  }

  @Post('bread')
  @Header('Cache-Control', 'none') //自定义响应标头，你可以使用 @Header() 装饰器或库特定的响应对象（并直接调用 res.header()
  @HttpCode(204) // 此装饰器用于改变post请求成功默认的200状态码 默认情况下响应状态代码始终为 200，POST 请求除外，该代码为 201。我们可以通过在处理程序级别添加 @HttpCode(...) 装饰器来轻松更改此行为。
  create(): string {
    return 'Post';
  }
  @Get('bread')
  @Redirect('https://nest.nodejs.cn', 301) //@Redirect() 有两个参数，url 和 statusCode，两者都是可选的。如果省略，statusCode 的默认值为 302 (Found)。 此装饰器主要是为了将响应重定向到特定URL
  //返回值将覆盖传递给 @Redirect() 装饰器的任何参数
  findAll(): string {
    return 'catsControll';
  }

  @Get('docs')
  // @Redirect('https://nest.nodejs.cn', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://www.baidu.com/' };
    }
  }
  //上述代码是一个示例，展示了使用 `@Redirect()` 装饰器来重定向请求的处理方式。
  // 在这个示例中，使用 `@Get()` 装饰器将一个路由处理函数绑定到 `'/docs'` 路径上。同时，使用 `@Redirect()` 装饰器指定了重定向的目标 URL 和状态码。
  // 装饰器的参数为 `'https://nest.nodejs.cn'` 和 `302`，意味着如果没有其他条件满足，请求将被重定向到 `https://nest.nodejs.cn`，并返回状态码 `302`。
  // 接着，在路由处理函数 `getDocs()` 中，使用 `@Query()` 装饰器获取查询参数 `version`。然后，通过判断 `version` 的值，如果满足条件 `version === '5'`，就会返回一个对象 `{ url: 'https://nest.nodejs.cn/v5/' }`。
  // 这意味着，如果请求的查询参数 `version` 的值等于 `'5'`，那么重定向目标 URL 将被覆盖为 `'https://nest.nodejs.cn/v5/'`，而不是之前在 `@Redirect()` 装饰器中指定的 URL。
  // 换句话说，返回值将覆盖传递给 `@Redirect()` 装饰器的任何参数，从而实现根据不同条件进行动态重定向的功能。

  //当你需要接受动态数据作为请求的一部分时（例如，GET /cats/1 获取 ID 为 1 的 cat），具有静态路径的路由将不起作用。为了定义带参数的路由，我们可以在路由的路径中添加路由参数标记，以捕获请求 URL 中该位置的动态值。下面 @Get() 装饰器示例中的路由参数令牌演示了这种用法。可以使用 @Param() 装饰器访问以这种方式声明的路由参数，应将其添加到方法签名中
  //@Param() 用于修饰方法参数（上例中的 params），并使路由参数可用作方法体内该修饰方法参数的属性。如上面的代码所示，我们可以通过引用 params.id 来访问 id 参数。也可以传入一个特定的参数 token 给装饰器，然后在方法体中直接通过名称引用路由参数
  @Get(':id')
  //异步形
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
  //每个异步函数必须返回Promise
  async findTwo(): Promise<any[]> {
    return [];
  }
  //带参数的路由应在任何静态路径之后声明。这可以防止参数化路径拦截发往静态路径的流量。
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
