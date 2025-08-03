// Реализовать логирование запросов и ошибок (например, с помощью winston и для красоты можно использовать chalk).
// Логи должны содержать дату, метод, url, статус ответа, ip клиента.

import chalk from 'chalk';

export default class console {
    public static log = (args: any) => global.console.log(chalk.blue(`[${new Date().toLocaleString()}] [LOG]`), typeof args === 'string' ? chalk.blueBright(args) : args);
    public static info = (args: any) => global.console.log(chalk.green(`[${new Date().toLocaleString()}] [INFO]`), typeof args === 'string' ? chalk.greenBright(args) : args);
    public static warning = (args: any) => global.console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`), typeof args === 'string' ? chalk.yellowBright(args) : args);
    public static error = (args: any) => global.console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR]`), typeof args === 'string' ? chalk.redBright(args) : args);
}