const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
    ctx.body = 'Hello World!';
});

test('should return Hello World!', async () => {
    const response = await app.listen(3000);
    const res = await fetch('http://localhost:3000');
    expect(await res.text()).toBe('Hello World!');
    response.close();
});