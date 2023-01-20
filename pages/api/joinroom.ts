import { serverPusher } from "@/utils/pusher";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	user: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { user } = req.body;
    serverPusher.trigger("presence-newroom", "user-joined", user);
	
    res.status(200).json( user );
}
