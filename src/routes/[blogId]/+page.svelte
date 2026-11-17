<script lang="ts">
    import type { Blog } from "#lib/types.ts";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { getContext, onMount } from "svelte";

    let getBlogs: () => Blog[] = getContext("getBlogs");
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
</script>

{#if visitedBLog == undefined}
    <h1 class="text-3xl">Blog not found</h1>
{:else}
    <div class="">
        {visitedBLog.description}

        <div class="">
            <button
                onclick={runDeletePost}
                class="bg-red-500 text-xs p-x rounded-md">delete post</button
            >
            <button
                onclick={redirectToEditPost}
                class="bg-blue-500 text-xs p-x rounded-md">edit post</button
            >
        </div>
    </div>
{/if}
