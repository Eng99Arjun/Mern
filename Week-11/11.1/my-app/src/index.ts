
export default {
	async fetch(reques: Request, env: Env, ctx: ExecutionContext) {
		return Response.json({
			message:'Hello World!'
		});
	},
}
