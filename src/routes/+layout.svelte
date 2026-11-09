<script lang="ts">
	import "./layout.css";
	import favicon from "#lib/assets/favicon.svg";
	import type { LayoutProps } from "./$types";
	import { setContext } from "svelte";

	let { children }: LayoutProps = $props();

	interface User {
		id: number;
		name: string;
		username: string;
		password: string;
		followsId: string[];
	}

	let users: User[] = $state([
		{
			id: 1,
			name: "John Osaretin",
			username: "Jsaretin",
			password: "12345678",
			followsId: [],
		},
	]);

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

	setContext("addNewUser", addNewUser);
	setContext("loginUser", loginUser);

	function logUserOut() {
		loggedInUser = undefined;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="w-full p-10 h-screen mx-auto bg-amber-200">
	<div class="">
		{#if loggedInUser == undefined}
			<a href="/login" class="bg-blue-500">Login</a>
			<a href="/register" class="bg-green-500">Register</a>
		{:else}
			<a href="/profile" class="bg-blue-500">Profile</a>
			<button onclick={logUserOut} class="bg-red-500">Logout</button>
		{/if}
	</div>
	<div class=" flex flex-col gap-4">
		{#each users as user (user.id)}
			<div class="bg-white">
				<p>{user.name} ({user.followsId.length})</p>
				<p>@{user.username}</p>
			</div>
		{/each}
	</div>
	{@render children()}
</div>
