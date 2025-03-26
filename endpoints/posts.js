const { PrismaClient } = require('@prisma/client');
const Router = require('koa-router');
const router = new Router({ prefix: '/posts' });
const prisma = new PrismaClient();


// Create UserPost
router.post('/', async (ctx) => {
    try {
        const userPost = await prisma.userPost.create({
            data: {
                userId: ctx.request.body.userId,
                title: ctx.request.body.title,
                content: ctx.request.body.content,
                imageUri: ctx.request.body.imageUri,
            },
        });
        ctx.body = userPost;
        ctx.status = 201;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: error.message };
    }
});

// Get All UserPosts
router.get('/', async (ctx) => {
    try {
        const userPosts = await prisma.userPost.findMany({
            include: {
                user: true,
                topic: true,
            },
        });
        ctx.body = userPosts;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Get UserPost by ID
router.get('/:id', async (ctx) => {
    try {
        const id = parseInt(ctx.params.id);
        const userPost = await prisma.userPost.findUnique({
            where: { id },
            include: {
                user: true,
                topic: true,
            },
        });
        if (!userPost) {
            ctx.status = 404;
            ctx.body = { error: 'User Post not found' };
        } else {
            ctx.body = userPost;
            ctx.status = 200;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});



module.exports = router;