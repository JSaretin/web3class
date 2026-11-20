<script lang="ts">
    import type { Author, Blog } from "#lib/types.ts";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { getContext, onMount, setContext } from "svelte";

    let getBlogs: () => Blog[] = getContext("getBlogs");

    let blogs = $derived(getBlogs());

    const createBlog: (blog: Blog) => void = getContext("createBlog");
    const setFullListOfBlog: (newBlogs: Blog[]) => void =
        getContext("setFullListOfBlog");

    let getLoggedInUser: () => Author | undefined =
        getContext("getLoggedInUser");

    let loggedInUser = $derived(getLoggedInUser());

    let typedBlogPost: string = $state("");
    let isNewPost = $state(true);

    function addNewBlog() {
        if (loggedInUser == undefined) {
            throw "You need to login to create post";
        }
        if (isNewPost) {
            // alert("new post");
            let firstPostId = 0;
            let firstPost = blogs[0];
            if (firstPost != undefined) {
                firstPostId = firstPost.id;
            }

            createBlog({
                description: typedBlogPost,
                author: loggedInUser,
                id: firstPostId + 1,
                likes: [],
                comments: [],
            });
        } else {
            let tempBLogs: Blog[] = [];

            let query = page.url.searchParams;
            let blogId = Number(query.get("blog_id"));

            for (const blog of blogs) {
                if (blog.id == blogId) {
                    if (blog.author.username != loggedInUser?.username) {
                        throw "You are not the owner of the post";
                    }
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
                    <div class="">{blog.likes.length} ❤️</div>
                    <div class="">{blog.comments.length} 🫂</div>
                </div>
                <div class="">@{blog.author.username}</div>
            </div>
        </a>
    {/each}
</div>
