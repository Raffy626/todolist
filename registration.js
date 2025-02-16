// $(document).ready(function(){

//     $("#registration").submit(function(event){
//         event.preventDefault();
//         registration();
//     })

//     function registration(){
//         $.ajax({
//             url: 'https://api-latihan.rakryan.id/api/register',
//             type: 'POST',
//             data: {
//                 nama: $("#nama").val(),
//                 email: $("#email").val(),
//                 password: $("#password").val(),
//                 password_confirmation: $("#confirmPassword").val()
//             },
//             success: function(){
//                 const Toast = Swal.mixin({
//                     toast: true,
//                     position: "top-end",
//                     showConfirmButton: false,
//                     timer: 3000,
//                     timerProgressBar: true,
//                     didOpen: (toast) => {
//                       toast.onmouseenter = Swal.stopTimer;
//                       toast.onmouseleave = Swal.resumeTimer;
//                     }
//                   });
//                   Toast.fire({
//                     icon: "success",
//                     title: "Berhasil Mendaftarkan Akun"
//                   });

//                   $("#nama").val("");
//                   $("#email").val("");
//                   $("#password").val("");
//                   $("#confirmPassword").val("");
//             },
//             error: function(response){

//                 let errorResponse = response.responseJSON;

//                 console.log(errorResponse);
//                 $(".errorMessage").remove();

//                 if(errorResponse.errors && errorResponse.errors.nama && errorResponse.errors.email && errorResponse.errors.password){
//                     errorMessage(errorResponse.errors.nama, $("#emailLabel"));
//                     errorMessage(errorResponse.errors.email, $("#passwordLabel"));
//                     errorMessage(errorResponse.errors.password, $("#signUp"));
//                 }
//                 else if(errorResponse.errors && errorResponse.errors.nama && errorResponse.errors.email){
//                     errorMessage(errorResponse.errors.nama, $("#emailLabel"));
//                     errorMessage(errorResponse.errors.email, $("#passwordLabel"));
//                 }
//                 else if(errorResponse.errors && errorResponse.errors.email && errorResponse.errors.password){
//                     errorMessage(errorResponse.errors.email, $("#passwordLabel"))
//                     errorMessage(errorResponse.errors.password, $("#signUp"));
//                 }
//                 else if(errorResponse.errors && errorResponse.errors.nama && errorResponse.errors.password){
//                     errorMessage(errorResponse.errors.nama, $("#emailLabel"));
//                     errorMessage(errorResponse.errors.password, $("#signUp"));
//                 }
//                 else if(errorResponse.errors && errorResponse.errors.nama){
//                     errorMessage(errorResponse.errors.nama, $("#emailLabel"));
//                 }
//                 else if(errorResponse.errors && errorResponse.errors.email){
//                     errorMessage(errorResponse.errors.email, $("#passwordLabel"))
//                 }
//                 else if(errorResponse.errors && errorResponse.errors.password){
//                     errorMessage(errorResponse.errors.password, $("#signUp"))
//                 }
//                 else{
//                     errorMessage(errorResponse.message, $("#signUp"))
//                 }
//             }
//         })
//     }

//     function errorMessage(message, element){
//         let errorMessageElement = $('<div class="form-text mb-3 errorMessage" id="errorMessage" style="font-size: 12px; color: red;"><i class="fa-solid fa-circle-exclamation" style="color: #ff0000;"></i> '+ message +'</div>');

//         errorMessageElement.insertBefore(element);
//     }
// })

$(document).ready(function(){

    $("#registration").submit(function(event){
        event.preventDefault();
        registration();
    })

    function registration(){
        $.ajax({
            url: 'https://api-latihan.rakryan.id/api/register',
            type: 'POST',
            data: {
                nama: $("#nama").val(),
                email: $("#email").val(),
                password: $("#password").val(),
                password_confirmation: $("#confirmPassword").val()
            },
            success: function(){
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Berhasil Mendaftarkan Akun"
                  });

                  $("#nama").val("");
                  $("#email").val("");
                  $("#password").val("");
                  $("#confirmPassword").val("");
            },
            error: function(response){

                let errorResponse = response.responseJSON;

                console.log(errorResponse);
                $(".errorMessage").remove();

                if(errorResponse.errors && errorResponse.errors.nama && errorResponse.errors.email && errorResponse.errors.password){
                    errorMessage(errorResponse.errors.nama, $("#emailLabel"));
                    errorMessage(errorResponse.errors.email, $("#passwordLabel"));
                    errorMessage(errorResponse.errors.password, $("#signUp"));
                }
                else if(errorResponse.errors && errorResponse.errors.nama && errorResponse.errors.email){
                    errorMessage(errorResponse.errors.nama, $("#emailLabel"));
                    errorMessage(errorResponse.errors.email, $("#passwordLabel"));
                }
                else if(errorResponse.errors && errorResponse.errors.email && errorResponse.errors.password){
                    errorMessage(errorResponse.errors.email, $("#passwordLabel"))
                    errorMessage(errorResponse.errors.password, $("#signUp"));
                }
                else if(errorResponse.errors && errorResponse.errors.nama && errorResponse.errors.password){
                    errorMessage(errorResponse.errors.nama, $("#emailLabel"));
                    errorMessage(errorResponse.errors.password, $("#signUp"));
                }
                else if(errorResponse.errors && errorResponse.errors.nama){
                    errorMessage(errorResponse.errors.nama, $("#emailLabel"));
                }
                else if(errorResponse.errors && errorResponse.errors.email){
                    errorMessage(errorResponse.errors.email, $("#passwordLabel"))
                }
                else if(errorResponse.errors && errorResponse.errors.password){
                    errorMessage(errorResponse.errors.password, $("#signUp"))
                }
                else{
                    errorMessage(errorResponse.message, $("#signUp"))
                }
            }
        })
    }

    function errorMessage(message, element){
        let errorMessageElement = $('<div class="form-text mb-3 errorMessage" id="errorMessage" style="font-size: 12px; color: red;"><i class="fa-solid fa-circle-exclamation" style="color: #ff0000;"></i> '+ message +'</div>');

        errorMessageElement.insertBefore(element);
    }
})