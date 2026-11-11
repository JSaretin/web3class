<script lang="ts">
    import { getContext } from "svelte";
    import type { User } from "#lib/types.ts";

    let users: User[] = getContext("users");

    let getLoggedInUser: () => User | undefined = getContext("getLoggedInUser");

    let loggedInUser = $derived(getLoggedInUser());

    let toggleFollowUser: (userId: number) => void =
        getContext("toggleFollowUser");
</script>

<!-- <h1 class="text-5xl text-white">
    {loggedInUser?.name || "Not logged in"}
</h1> -->

<div class=" flex flex-col gap-4">
    {#each users as user (user.id)}
        {#if user.id != loggedInUser?.id}
            <div
                class="bg-white flex justify-between align-middle place-items-center"
            >
                <div class="">
                    <p>{user.name} ({user.followsId.length})</p>
                    <p>@{user.username}</p>
                </div>

                {#if loggedInUser != undefined}
                    {#if user.followsId.filter((id) => {
                        if (id == loggedInUser.id) {
                            return true;
                        }
                    }).length > 0}
                        <button
                            onclick={() => {
                                toggleFollowUser(user.id);
                            }}
                            class="bg-yellow-500 text-white p-2 h-fit rounded-md"
                            >unfollow</button
                        >
                    {:else}
                        <button
                            onclick={() => {
                                toggleFollowUser(user.id);
                            }}
                            class="bg-blue-500 text-white p-2 h-fit rounded-md"
                            >follow</button
                        >
                    {/if}
                {/if}
            </div>
        {/if}
    {/each}
</div>
