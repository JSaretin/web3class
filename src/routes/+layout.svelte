<script lang="ts">
	import "./layout.css";
	import favicon from "#lib/assets/favicon.svg";
	import type { LayoutProps } from "./$types";
	import { setContext } from "svelte";
	import { goto } from "$app/navigation";

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
			password: "1234",
			followsId: [],
		},
		{
			id: 2,
			name: "Mike Osaretin",
			username: "Msaretin",
			password: "3894",
			followsId: [],
		},
	]);

	setContext("users", users);
	let isLogin = $state(false);

	function setLogin(state: boolean) {
		isLogin = state;
	}

	setContext("setLogin", setLogin);

	function directUserToTheRegisterPage() {
		goto("/register");
	}

	function directUserToTheLoginPage() {
		goto("/login");
	}

	function callLogin() {
		setLogin(true);
	}

	function callLogout() {
		setLogin(false);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="max-w-md w-full mx-auto">
	<div class="mb-20">
		{#each users as user (user.id)}
			<div class="">
				Id: {user.id} username: {user.name}
				<span>({user.followsId.length})</span>
			</div>
		{/each}
	</div>

	<div class="flex gap-4">
		{#if isLogin}
			<button class="p-2 rounded-md bg-blue-500">Profile</button>
			<button class="p-2 rounded-md bg-red-500" onclick={callLogout}>Logout</button>
		{:else}
			<button class="p-2 rounded-md bg-blue-500" onclick={directUserToTheLoginPage}>Login</button>
			<button class="p-2 rounded-md bg-green-500" onclick={directUserToTheRegisterPage}
				>Register</button
			>
		{/if}
	</div>
	{@render children()}
</div>
