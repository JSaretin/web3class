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
    
    const setLogin: (status: boolean) => void = getContext("setLogin");

    let enteredUsername = $state("");
    let enteredPassword = $state("");

    function checkAndLoginUser() {
        let foundUser: User | undefined = undefined;

        for (const user of users) {
            if (
                enteredUsername == user.username &&
                enteredPassword == user.password
            ) {
                foundUser = user;
            }
        }

        if (foundUser == undefined) {
            alert("user not registered");
            return;
        }

        setLogin(true);

        enteredUsername = ""
        enteredPassword = ""

        goto("/")
    }
</script>

<div class="flex flex-col gap-4">
    <div class="flex flex-col">
        Username
        <input class="bg-gray-200" type="text" bind:value={enteredUsername} />
    </div>

    <div class="flex flex-col">
        Password
        <input class="bg-gray-200" type="text" bind:value={enteredPassword} />
    </div>

    <button onclick={checkAndLoginUser} class="bg-green-500">Login</button>
</div>
