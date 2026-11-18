<script lang="ts">
	import "./layout.css";
	import favicon from "#lib/assets/favicon.svg";
	import type { LayoutProps } from "./$types";
	import { setContext } from "svelte";
	import type { Author, Blog, User } from "#lib/types.ts";
	import { goto } from "$app/navigation";

	let { children }: LayoutProps = $props();

	let loggedInUser: Author | undefined = $state(undefined);

	let registeredUsers: Author[] = $state([]);

	function registerUser(newUser: Author) {
		for (const registerUser of registeredUsers) {
			if (registerUser.username == newUser.username) {
				throw "Username already taken";
			}
		}

		registeredUsers.push(newUser);
	}

	setContext("registerUser", registerUser);

	function loginUser(username: string, password: string) {
		for (const registerUser of registeredUsers) {
			if (
				registerUser.username == username &&
				registerUser.password == password
			) {
				loggedInUser = registerUser;
			}
		}

		if (loggedInUser == undefined) {
			throw "Invalid username or password";
		}
	}

	setContext("loginUser", loginUser);

	interface User {
		age: number;
		name: string;
	}

	function getBLogsFromDatabase(): Blog[] {
		return [];
	}

	let blogs: Blog[] = $state(getBLogsFromDatabase());

	setContext("getBlogs", () => blogs);

	function createBlog(blog: Blog) {
		blogs = [blog, ...blogs];
	}

	function deleteBlog(blogId: number) {
		let newBlogs: Blog[] = [];

		for (const blog of blogs) {
			if (blog.id != blogId) {
				newBlogs.push(blog);
			}
		}

		blogs = newBlogs;
	}

	function setFullListOfBlog(newBlogs: Blog[]) {
		blogs = newBlogs;
	}

	function replacePost(newBlog: Blog) {
		let tempBLogs: Blog[] = [];

		for (const blog of blogs) {
			if (blog.id == newBlog.id) {
				tempBLogs.push(newBlog);
			} else {
				tempBLogs.push(blog);
			}
		}
	}

	setContext("replacePost", replacePost);
	setContext("createBlog", createBlog);
	setContext("deleteBlog", deleteBlog);
	setContext("setFullListOfBlog", setFullListOfBlog);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="w-full h-screen bg-neutral-950 overflow-y-scroll">
	<div class="max-w-sm border-neutral-500 mx-auto min-h-screen border-x">
		<div class="w-full px-4 py-2 flex justify-between bg-gray-300">
			<a href="/"
				><h1 class="text-xl font-mono text-neutral-900">X-Tweet</h1></a
			>

			<div class=" ">
				{#if loggedInUser == undefined}
					<a href="/login" class="p-2 text-sm bg-blue-700">Login</a>
					<a href="/register" class="p-2 text-sm bg-green-700"
						>Register</a
					>
				{:else}
					<p>@{loggedInUser.username}</p>
				{/if}
			</div>
		</div>
		{@render children()}
	</div>
</div>
