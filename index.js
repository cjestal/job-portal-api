const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const usersRouter = require('./endpoints/users');
const companiesRouter = require('./endpoints/companies');
const jobsRouter = require('./endpoints/jobs');
const jobApplicationsRouter = require('./endpoints/job-applications');
const authRouter = require('./endpoints/auth');

const app = new Koa();

// Middleware to handle CORS
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    await next();
});

// API routes
const router = new Router();
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(usersRouter.routes()).use(usersRouter.allowedMethods());
app.use(companiesRouter.routes()).use(companiesRouter.allowedMethods());
app.use(jobsRouter.routes()).use(jobsRouter.allowedMethods());
app.use(jobApplicationsRouter.routes()).use(jobApplicationsRouter.allowedMethods());
app.use(authRouter.routes()).use(authRouter.allowedMethods());

const port = 3000;
app.listen(port);
// app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
// });

module.exports = { app }; // Export the app instance