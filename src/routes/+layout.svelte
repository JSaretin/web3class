<script lang="ts">
	import "./layout.css";
	import favicon from "#lib/assets/favicon.svg";
	import type { LayoutProps } from "./$types";
	import { setContext } from "svelte";
	import type { User } from "#lib/types.ts";
	import { goto } from "$app/navigation";

	let { children }: LayoutProps = $props();

	let users: User[] = $state([
		{
			id: 1,
			name: "John Osaretin",
			username: "Jsaretin",
			password: "12345678",
			followsId: [],
		},
	]);

	setContext("users", users);

	function addNewUser(name: string, username: string, password: string) {
		for (const user of users) {
			if (username == user.username) {
				throw "username taken";
			}
		}

		users.push({
			id: users.length + 1,
			name: name,
			username: username,
			password: password,
			followsId: [],
		});
	}

	let loggedInUser: User | undefined = $state(undefined);

	function loginUser(username: string, password: string) {
		// for each user may day users
		// if we see a user with the exact username and password
		// may the person pass to this function, we go login that
		// user
		for (const user of users) {
			if (user.username == username && user.password == password) {
				loggedInUser = user;
			}
		}

		if (loggedInUser == undefined) {
			// alert();
			throw "invalid username or password";
		}
	}

	function getLoggedInUser() {
		return loggedInUser;
	}

	setContext("getLoggedInUser", getLoggedInUser);
	setContext("addNewUser", addNewUser);
	setContext("loginUser", loginUser);

	function logUserOut() {
		loggedInUser = undefined;
	}

	function toggleFollowUser(userId: number) {
		if (loggedInUser == undefined) {
			goto("/login");
			return;
			// throw "You need to login before you can follow users";
		}

		let selectedUser: User | undefined = undefined;
		let currentIndex: number = 0;

		let userIndex: number = 0;

		for (const user of users) {
			if (user.id == userId) {
				selectedUser = user;
				userIndex = currentIndex;
			}
			currentIndex = currentIndex + 1;
		}

		if (selectedUser == undefined) {
			throw "Not user found";
		}

		let isAlreadyFollowing = false;
		for (const followerId of selectedUser.followsId) {
			if (followerId == loggedInUser.id) {
				isAlreadyFollowing = true;
			}
		}

		if (isAlreadyFollowing) {
			selectedUser.followsId = selectedUser.followsId.filter(
				(id) => id != loggedInUser?.id,
			);
		} else {
			selectedUser.followsId.push(loggedInUser.id);
		}

		users[userIndex] = selectedUser;
	}

	setContext("toggleFollowUser", toggleFollowUser);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="w-full p-10 h-screen mx-auto bg-neutral-900">
	<div class="max-w-md mx-auto relative">
		<div class="flex justify-between p-4 bg-white border-b-2 mb-10">
			<a href="/"
				><h1 class="font-black text-2xl text-neutral-950">Chat</h1></a
			>

			<div class="">
				{#if loggedInUser == undefined}
					<a href="/login" class="bg-blue-500 p-2 rounded-md text-sm"
						>Login</a
					>
					<a
						href="/register"
						class="bg-green-500 p-2 rounded-md text-sm">Register</a
					>
				{:else}
					<a
						href="/profile"
						class="bg-blue-500 p-2 rounded-md text-sm"
						>@{loggedInUser.username}</a
					>
					<button
						onclick={logUserOut}
						class="bg-red-500 p-2 rounded-md text-sm">Logout</button
					>
				{/if}
			</div>
		</div>

		{@render children()}
	</div>
</div>
