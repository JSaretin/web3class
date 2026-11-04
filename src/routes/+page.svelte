<script lang="ts">
    import { onMount } from "svelte";

    // variable
    // condition
    // loop
    // function

    const username = "John";
    const password = "Password";

    let enteredUsername = $state("");
    let enteredPassword = $state("");

    let isLoggedIn = $state(false);
    let feedback = $state("");

    function login() {
        // if (enteredUsername == username && enteredPassword == password) {
        //     // entered username is username and entered password is password
        //     feedback = "";
        //     isLoggedIn = true;
        // } 
        
        // else {
        //     feedback = "invalid username or password";
        //     isLoggedIn = false;
        // }




        if (enteredUsername == username){
            // entered username is expected username


            if (enteredPassword == password){
                // entered password is expected password
                feedback = ""
                isLoggedIn = true
            }
            else {
                // entered password in not expected password
                feedback = "wrong password"
                isLoggedIn = false;
            }
        }
        else {
            
            // entered username is not expected username
            feedback = "wrong username"
            isLoggedIn = false;
        }
    }

    // == -> "is"
    // != -> "is not"
    // && -> "and"
    let buttonIsActive = $state(false)
    function activeButton(){
        // buttonIsActive = !buttonIsActive
        if (buttonIsActive){
            buttonIsActive = false
        }
        else {
            buttonIsActive = true
        }
    }


</script>


<button onclick={activeButton}>
    <div class={"w-96 h-96 rounded-full " + (buttonIsActive ? "bg-green-500" : "bg-red-500")}></div>
</button>
