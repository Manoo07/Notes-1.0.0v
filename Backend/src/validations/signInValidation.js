import {zod} from 'zod'

export const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})