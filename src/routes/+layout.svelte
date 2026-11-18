<script lang="ts">
	import "./layout.css";
	import favicon from "#lib/assets/favicon.svg";
	import type { LayoutProps } from "./$types";
	import { setContext } from "svelte";
	import type { Blog, User } from "#lib/types.ts";
	import { goto } from "$app/navigation";

	let { children }: LayoutProps = $props();

	function getBLogsFromDatabase(): Blog[] {
		return [
			{
				description: "This is the blog body",
				author: {
					name: "John Osaretin",
				},
				id: 1,
				likes: 0,
				comments: [],
			},
		];
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

<div class="w-full h-screen bg-neutral-950">
	<div class="max-w-sm border-neutral-500 mx-auto min-h-screen border-x">
		<div class="w-full flex justify-center bg-gray-300">
			<a href="/"
				><h1 class="text-xl font-mono text-neutral-900">X-Tweet</h1></a
			>
		</div>
		{@render children()}
	</div>
</div>
