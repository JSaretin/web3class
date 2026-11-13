<script lang="ts">
   import type { User } from "#lib/types.ts";
   import { goto } from "$app/navigation";
   import { getContext, onMount } from "svelte";
   import favicon from "#lib/assets/favicon.svg";
   import { page } from "$app/state";

   let getLoggedInUser: () => User | undefined = getContext("getLoggedInUser");

   let users: User[] = getContext("users");

   let loggedInUser = $derived(getLoggedInUser());

   let user: User | undefined = $state(undefined);

   function callWhenPageLoad() {
      for (const currentUser of users) {
         if (currentUser.username == page.params.username) {
            user = currentUser;
         }
      }
   }

   onMount(callWhenPageLoad);

   let showFollowers = $state(false);

   function showListOfFollowers() {
      showFollowers = true;
   }
</script>

{#if user == undefined}
   <h2 class="text-4xl text-white">User not found</h2>
{:else}
   <div class="w-full h-full bg-gray-200 relative">
      {#if showFollowers}
         <div class="absolute bg-amber-950 left-0 bottom-0 h-full w-full">
            <h2 class="text-2xl">Followers</h2>
         </div>
      {/if}

      <h2 class="text-2xl">Profile</h2>

      <div class="flex  justify-center align-middle place-items-center">
         <div class="rounded-full">
            <img src={favicon} alt="" class="w-20 h-20 rounded-full" />
         </div>
        <div class="">
          <p>{user.name}</p>
         <p>@{user.username}</p>
         <div class="">
            <span>0 following</span>
            <button onclick={showListOfFollowers}>
               <span>{user.followsId.length} followers</span>
            </button>
         </div>
         {#if user.followsId.filter((id) => id == loggedInUser?.id).length == 0}
            <div class="mb-10">
               <button
                  class="px-6 py-2 rounded-md bg-blue-500 text-white text-xs font-bold"
                  >Follow</button
               >
            </div>
         {/if}
        </div>
      </div>
      <!-- {getLoggedInUser()?.username} -->
   </div>
{/if}
