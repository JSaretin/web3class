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
			},
		];
	}

	let blogs: Blog[] = $state(getBLogsFromDatabase());

	setContext("getBlogs", () => blogs);

	function createBlog(blog: Blog) {
		blogs.push(blog);
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

	setContext("createBlog", createBlog);
	setContext("deleteBlog", deleteBlog);
	setContext("setFullListOfBlog", setFullListOfBlog);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="w-full h-screen bg-neutral-950">
	<div class="max-w-md mx-auto min-h-screen bg-neutral-300 p-4">
		{@render children()}
	</div>
</div>
