$(document).ready(function(){

    $("#login").submit(function(event){
        event.preventDefault();
        login();
        $("#errorEmailPassword").remove();
    })

    function login(){
        $.ajax({
            url: 'https://api-latihan.rakryan.id/api/login',
            type: 'POST',
            data: {
                email: $("#email").val(),
                password: $("#password").val()
            },
            success: function(response){

                let token = response.data.token
                sessionStorage.setItem("token", token);


                // localStorage.setItem("token", token)

                window.location.href = "index.html";
                
            },
            error: function(response){

                console.log(response);

                let responseJsonString = JSON.stringify(response.responseJSON)
                let responseJsonParse = JSON.parse(responseJsonString);

                console.log(responseJsonParse);
                $(".errorMessage").remove();

                if(responseJsonParse.errors && responseJsonParse.errors.email && responseJsonParse.errors.password){
                    errorMessage(responseJsonParse.errors.email, $("#passwordLabel"))
                    errorMessage(responseJsonParse.errors.password, $("#loginButton"))
                }
                else if(responseJsonParse.errors && responseJsonParse.errors.email){
                    errorMessage(responseJsonParse.errors.email, $("#passwordLabel"))
                }
                else if(responseJsonParse.errors && responseJsonParse.errors.password){
                    errorMessage(responseJsonParse.errors.password, $("#loginButton"))
                    }
                else{
                    errorMessage(responseJsonParse.message, $("#loginButton"))
                }
            }
                
        })
    }

    function errorMessage(message, element){
        let errorMessageElement = $('<div class="form-text mb-3 errorMessage" style="font-size: 12px; color: red;"><i class="fa-solid fa-circle-exclamation" style="color: #ff0000;"></i> '+ message+'</div>');

        errorMessageElement.insertBefore(element);
    }
})