import { serverPusher } from "@/utils/pusher";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	any: any;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	console.log("Body",req.body)
    const {socket_id,channel_name,username} = req.body
    const randomString = Math.random().toString(32).slice(2)

	const presenceData = {
		user_id: randomString,
		user_info: { name: username},
	};
	const authResponse = serverPusher.authorizeChannel(
		socket_id,
		channel_name,
		presenceData
	);
	res.send(authResponse);
}
