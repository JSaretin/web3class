<script lang="ts">
    import type { Blog } from "#lib/types.ts";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { getContext, onMount } from "svelte";

    let getBlogs: () => Blog[] = getContext("getBlogs");
    const replacePost: (newBlog: Blog) => void = getContext("replacePost");
    let visitedBLog: Blog | undefined = $state(undefined);

    let blogs = $derived(getBlogs());

    function getVisitedBlog() {
        for (const blog of blogs) {
            if (blog.id == Number(page.params.blogId)) {
                visitedBLog = blog;
            }
        }
    }

    onMount(getVisitedBlog);

    const deleteBlog: (blogId: number) => void = getContext("deleteBlog");

    function runDeletePost() {
        deleteBlog(Number(page.params.blogId));
        goto("/");
    }

    function redirectToEditPost() {
        goto("/?edit=true&blog_id=" + Number(page.params.blogId));
    }

    function likePost() {
        if (visitedBLog == undefined) {
            return;
        }
        visitedBLog.likes = visitedBLog.likes + 1;
        replacePost(visitedBLog);
    }

    let typedComment: string = $state("");

    function addNewCommentToPost() {
        if (visitedBLog == undefined) {
            return;
        }

        let firstCommentId = 0;
        let firstComment = visitedBLog.comments[0];
        if (firstComment != undefined) {
            firstCommentId = firstComment.id;
        }

        visitedBLog.comments = [
            {
                id: firstCommentId + 1,
                description: typedComment,
                author: {
                    name: "John Osareting",
                },
            },
            ...visitedBLog.comments,
        ];
        replacePost(visitedBLog);
        typedComment = "";
    }
</script>

{#if visitedBLog == undefined}
    <h1 class="text-3xl">Blog not found</h1>
{:else}
    <div class="border-b border-neutral-500 p-4 text-sm text-white">
        <!-- <h2 class="text-2xl">{blog.id}</h2> -->
        <p>{visitedBLog.description}</p>
        <div class="mt-4">
            <button onclick={likePost}>{visitedBLog.likes} ❤️</button>
        </div>
        <div class="mt-4">
            <button
                onclick={runDeletePost}
                class="pg-2 bg-red-500 text-xs p-x rounded-md"
                >delete post</button
            >
            <button
                onclick={redirectToEditPost}
                class="pg-2 bg-blue-500 text-xs p-x rounded-md"
                >edit post</button
            >
        </div>
    </div>
    <div class="w-full gap-2 border-b border-neutral-500 p-4">
        <textarea
            bind:value={typedComment}
            class="w-full p-2 resize-none bg-neutral-600 rounded-md outline-none border-none text-white text-sm"
            placeholder="What are you thinking right now?"></textarea>
        <div class="w-full flex justify-end">
            <button
                onclick={addNewCommentToPost}
                class="bg-blue-500 px-4 py-1 rounded-md text-sm">Comment</button
            >
        </div>
    </div>

    <div class="flex flex-col gap-4">
        {#each visitedBLog.comments as comment (comment.id)}
            <div class="border-b border-neutral-500 p-4 text-sm text-white">
                <!-- <h2 class="text-2xl">{blog.id}</h2> -->
                <p>{comment.description}</p>
                <!-- <div class="mt-4">
                    <div class="">{comment.likes} ❤️</div>
                </div> -->
            </div>
        {/each}
    </div>
{/if}
