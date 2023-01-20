"use client";

import Link from "next/link";
import ClientPusher from "pusher-js";
import { useEffect, useState } from "react";

export default function Page({
	params,
	searchParams,
}: {
	params: { roomID: string };
	searchParams: { username: string };
}) {
	const [members, setMembers] = useState<string[] | []>([]);
	const [count, setCount] = useState(0);
	const { username } = searchParams;
	const { roomID } = params;

	function HandleNewMembers(channel: any) {
		const memberInfo = channel.members.members;
		const count = channel.members.count;
		let memberList = [];
		for (const property in memberInfo) {
			memberList.push(memberInfo[property].name);
		}
		setCount(count);
		setMembers(memberList);
	}

	useEffect(() => {
		const clientPusher = new ClientPusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
			authEndpoint: "/api/auth",
			cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
			auth: { params: { username } },
		});
		const channel = clientPusher.subscribe(`presence-${roomID}`);

		channel.bind("pusher:subscription_succeeded", () => {
			console.log("We connected bruv");
			HandleNewMembers(channel);
		});
		channel.bind("pusher:member_added", (member: any) => {
			console.log("Man up", member);
			HandleNewMembers(channel);
		});
		channel.bind("pusher:member_removed", (member: any) => {
			console.log("Man down", member);
			HandleNewMembers(channel);
		});

		return () => {
			clientPusher.disconnect();
			clientPusher.unsubscribe(`presence-${roomID}`);
		};
	}, []);

	let c = 0;

	const userList = members.map((user) => {
		return <p key={c++}>{user}</p>;
	});

	if (count == 0){
		return (
			<div>Loading</div>
		)
	}

	

	return (
		<div>
			<h1>
				Hello {username}, You have entered room {roomID}
			</h1>
			<h2>There are {count} players online</h2>
			<h2>You are sharing the room with : </h2>
			{userList}
			<Link href="/"> Leave Room</Link>
		</div>
	);
}
