<script lang="ts">
    import type { Blog } from "#lib/types.ts";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { getContext, onMount } from "svelte";

    let getBlogs: () => Blog[] = getContext("getBlogs");

    let blogs = $derived(getBlogs());

    const createBlog: (blog: Blog) => void = getContext("createBlog");
    const setFullListOfBlog: (newBlogs: Blog[]) => void =
        getContext("setFullListOfBlog");

    let typedBlogPost: string = $state("");
    let isNewPost = $state(true);

    function addNewBlog() {
        if (isNewPost) {
            // alert("new post");
            let firstPostId = 0;
            let firstPost = blogs[0];
            if (firstPost != undefined) {
                firstPostId = firstPost.id;
            }

            createBlog({
                description: typedBlogPost,
                author: {
                    name: "John Osareting",
                },
                id: firstPostId + 1,
                likes: 0,
                comments: [],
            });
        } else {
            let tempBLogs: Blog[] = [];

            let query = page.url.searchParams;
            let blogId = Number(query.get("blog_id"));

            for (const blog of blogs) {
                if (blog.id == blogId) {
                    let blogCopy = { ...blog };
                    blogCopy.description = typedBlogPost;
                    tempBLogs.push(blogCopy);
                } else {
                    tempBLogs.push(blog);
                }
            }

            isNewPost = true;
            setFullListOfBlog(tempBLogs);
            goto("/");
        }

        typedBlogPost = "";
    }

    function runOnLoad() {
        let query = page.url.searchParams;
        if (query.get("edit")) {
            let blogId = Number(query.get("blog_id") || "0");

            for (const blog of blogs) {
                if (blog.id == blogId) {
                    typedBlogPost = blog.description;
                    isNewPost = false;
                }
            }
        }
    }

    onMount(runOnLoad);
</script>

<div class="w-full gap-2 border-b border-neutral-500 p-4">
    <textarea
        bind:value={typedBlogPost}
        class="w-full p-2 resize-none bg-neutral-600 rounded-md outline-none border-none text-white text-sm"
        placeholder="What are you thinking right now?"></textarea>
    <div class="w-full flex justify-end">
        <button
            onclick={addNewBlog}
            class="bg-blue-500 px-4 py-1 rounded-md text-sm">Post</button
        >
    </div>
</div>

<div class="flex flex-col gap-4">
    {#each blogs as blog (blog.id)}
        <a href={"/" + blog.id}>
            <div class="border-b border-neutral-500 p-4 text-sm text-white">
                <!-- <h2 class="text-2xl">{blog.id}</h2> -->
                <p>{blog.description}</p>
                <div class="mt-4 flex gap-4">
                    <div class="">{blog.likes} ❤️</div>
                    <div class="">{blog.comments.length} 🫂</div>
                </div>
            </div>
        </a>
    {/each}
</div>
