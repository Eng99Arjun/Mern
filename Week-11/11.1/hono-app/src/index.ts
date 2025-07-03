import { Hono } from 'hono'

const app = new Hono()

async function authMiddleware(c:any, next: any){
  if(c.req.header("Authorization")){
    await next()
  } else {
    return c.text("You don't have access");
  }
}

app.get('/', authMiddleware ,async (c) => {
  //body, headers, query, middlewares, connecting to a database
  const body = await c.req.json()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));
  console.log('Hello Hono!')

  return c.text('Hello Hono!')
})

export default app
