<script lang="ts">
    import type { Author, Blog } from "#lib/types.ts";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    import { getContext, onMount, setContext } from "svelte";

    let getBlogs: () => Blog[] = getContext("getBlogs");
    const replacePost: (newBlog: Blog) => void = getContext("replacePost");

    let blogs = $derived(getBlogs());

    let getLoggedInUser: () => Author | undefined =
        getContext("getLoggedInUser");

    let loggedInUser = $derived(getLoggedInUser());

    function getAllUserBlog() {
        let userPosts: Blog[] = [];

        for (const blog of blogs) {
            if (blog.author.username == loggedInUser?.username) {
                userPosts.push(blog);
            }
        }
        return userPosts;
    }

    let userPosts = $derived(getAllUserBlog());
</script>

{#each userPosts as blog (blog.id)}
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
