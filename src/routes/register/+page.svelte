<script lang="ts">
    import { goto } from "$app/navigation";
    import { getContext } from "svelte";

    // variable
    // condition
    // loop
    // function
    interface User {
        id: number;
        name: string;
        username: string;
        password: string;
        followsId: string[];
    }

    const users: User[] = getContext("users");

    let enteredName = $state("");
    let enteredUsername = $state("");
    let enteredPassword = $state("");
    let enteredConfirmPassword = $state("");

    function addNewUser() {
        if (enteredPassword != enteredConfirmPassword) {
            alert("Password is incorrect");
            return;
        }

        let isRegistered = false;
        for (const user of users) {
            // for user in users
            if (enteredUsername == user.username) {
                isRegistered = true;
            }
        }

        if (isRegistered) {
            alert("You are already registered. Login instead");
            return;
        }

        users.push({
            id: users.length + 1,
            name: enteredName,
            username: enteredUsername,
            password: enteredPassword,
            followsId: [],
        });

        enteredName = "";
        enteredPassword = "";
        enteredConfirmPassword = "";
        enteredUsername = "";

        goto("/");
    }
</script>

<div class="flex flex-col gap-4">
    <div class="flex flex-col">
        Name
        <input class="bg-gray-200" type="text" bind:value={enteredName} />
    </div>
    <div class="flex flex-col">
        Username
        <input class="bg-gray-200" type="text" bind:value={enteredUsername} />
    </div>

    <div class="flex flex-col">
        Password
        <input class="bg-gray-200" type="text" bind:value={enteredPassword} />
    </div>
    <div class="flex flex-col">
        Confirm Password
        <input
            class="bg-gray-200"
            type="text"
            bind:value={enteredConfirmPassword}
        />
    </div>

    <button onclick={addNewUser} class="bg-blue-500">Register</button>
</div>
