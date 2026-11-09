<script lang="ts">
    import { goto } from "$app/navigation";
    import { getContext } from "svelte";

    let enteredUsername = $state("");
    let enteredPassword = $state("");

    const loginUser: (username: string, password: string) => void =
        getContext("loginUser");

    function login() {
        // loginUser(enteredUsername, enteredPassword);
        // enteredPassword = "";
        // enteredUsername = "";
        // goto("/");

        try {
            loginUser(enteredUsername, enteredPassword);
            enteredPassword = "";
            enteredUsername = "";
            goto("/");
        } catch (e) {
            alert(e);
        }
    }
</script>

<div class="w-full h-full bg-blue-200">
    <div class="mx-w-md w-full mx-auto p-4">
        <div class="flex flex-col">
            Username
            <input
                class="bg-gray-100"
                type="text"
                bind:value={enteredUsername}
            />
        </div>
        <div class="flex flex-col">
            Password
            <input
                class="bg-gray-100"
                type="text"
                bind:value={enteredPassword}
            />
        </div>

        <button onclick={login} class="bg-blue-400 text-white">Login</button>
    </div>
</div>
