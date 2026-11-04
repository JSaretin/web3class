<script lang="ts">

    // variable
    // condition
    // loop
    // function

    let enteredPassword: string = $state("")

    interface Human {
        name: string
        username: string
        password: string
    }


    function registerUser(){
        if (enteredUsername == "John"){
            alert("Correct guy")
        }
        else {
            alert("Not John. Entered username: " + enteredUsername);
        }

    }
   

    // == -> "is"
    // != -> "is not"
    // && -> "and"

    let isPassword = $state(true)

    function togglePassword(){
        if (isPassword){
            isPassword =false;
        }
        else{
            isPassword = true
        }
    }


    let enteredUsername: string = $state("")
    
    function callShoutFocus(){
        enteredUsername = "Bla bla bla"
    }
    function deleteUsername(){
        enteredUsername = ""
    }


</script>


<input type="text" onfocus={callShoutFocus} onblur={deleteUsername} class="bg-yellow-600" placeholder="Username" bind:value={enteredUsername}/>
<!-- <input type={isPassword ? "password" : "text"} class="bg-gray-600" placeholder="Password" bind:value={enteredPassword}/> -->


<button class="bg-amber-950 p-4" onclick={togglePassword}>()</button>

<!-- 

onmouseenter 

on mouse enter
when mouse enter -->



<button onclick={registerUser} class="bg-red-600 text-white p-2 rounded-md">Register</button>
<!-- 
when clicked call registerUser function
-->


<!-- switch => join wire => current enter bulb => bulb light -->