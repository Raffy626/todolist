$(document).ready(function(){

    $("body").css("backgroundImage", "linear-gradient(to right, #0d2432,#37526d,#6768ab,#ac8188,#feb17d)"); //style manipulation

    $(".container").css({ //style manipulation
        "maxWidth" : "550px",
        "margin" : "135px auto",
        "background" : "#fff",
        "borderRadius" : "15px",
        "padding" : "28px 0"
    })

    $("p").html("My TodoList").addClass("text-center fs-3 fw-bold mt-3"); //text, class manipulation
 
    $(".row").addClass("ms-5 mb-3");

    $("#input input").attr("placeholder", "Masukkan Tugas Baru").keyup(function(e){ //event handler
        if (e.key === "Enter"){//event key
            postTugas();
        }
    });

    let inputButton = $("#input button");
    inputButton.on({//multiple event handler
        click : function(){
            postTugas();
        },

        mouseenter : function(){
            inputButton.addClass("btn-warning");
        },

        mouseout : function(){
            inputButton.removeClass("btn-warning");
        }
    })

    $(".button button").click(function(){
        logOut();
    })

    function tambahTugas(namaTugas, idTugas, statusTugas){
            let divRow = $("<div>").addClass("row ms-5 mb-2");
            let divCol = $("<div>").addClass("col-8");
            let divForm = $("<div>").addClass("form-check mt-2");
            let inputTag = $("<input>").attr({class : "form-check-input", type : "checkbox"});
            let label = $("<label>").addClass("form-check-label").text(namaTugas);
            let divCol2 = $("<div>").addClass("col-2");
            let divBtn = $("<div>").addClass("btn ms-3");
            let icon = $("<i>").addClass("fa-sharp fa-solid fa-trash-can delete");
            
            $("#list").append(divRow);
            divRow.append(divCol, divCol2);
            divCol.append(divForm);
            divForm.append(inputTag, label);
            divCol2.append(divBtn);
            divBtn.append(icon);

            inputTag.change(function(){
                updateTugas(idTugas, inputTag, label);
            })

            icon.click(function(){
                deleteTugas(idTugas, icon, divRow);
            })


            if(statusTugas == "done"){
                inputTag.attr("checked", true);
                label.addClass("done");
            }
            else{
                inputTag.removeAttr("checked");
                label.removeClass("done");
            }
            $("#input input").val("");

    }

    function elSembunyiTugas(){
        let divRow = $("<div>").addClass("row ms-5 mb-2");
        let divCol = $("<div>").addClass("col-8");
        let divForm = $("<div>").addClass("form-check mt-2");
        let inputTag = $("<input>").attr({class : "form-check-input", type : "checkbox"});
        let label = $("<label>").addClass("form-check-label").text("Sembunyikan Tugas Selesai");
        
        inputTag.change(function(){
            sembunyikanTugas(inputTag);
        })
        
        $("#hide").append(divRow);
        divRow.append(divCol);
        divCol.append(divForm);
        divForm.append(inputTag, label);
    }

    function hapusTugas(icon, row){
        if (icon.hasClass("delete")){
            row.remove();
        }
    }

    function tugasSelesai(checkbox, label){
        if (checkbox.is(":checked")){
            label.addClass("done");
        }
        else{
            label.removeClass("done");
        }
    }

    function sembunyikanTugas(checkbox){
        if(checkbox.is(":checked")){
            $(".done").parent().parent().parent().hide();
        }
        else{
            $(".done").parent().parent().parent().show();
        }

    }

    var token = sessionStorage.getItem("token");
    getTugas();
    
    function getTugas(){
        $.ajax({
            url: 'https://api-latihan.rakryan.id/api/auth/todo-list',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(response){
                console.log(response.data);

                let daftarTugas = response.data;

                daftarTugas.forEach(tugas => {
                    tambahTugas(tugas.nama, tugas.id, tugas.status);
                    console.log(tugas);
                });

                if ($("#list .row").length > 0){
                    elSembunyiTugas();
                }
            },
            error: function(response){
                console.log(response);
            }
        })
    }

    function postTugas(){
        $.ajax({
            url: 'https://api-latihan.rakryan.id/api/auth/todo-list',
            type: 'POST',
            data: {
                nama_tugas: $("#input input").val()
            },
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(response){

                let tugas = response.data;
                tambahTugas(tugas.nama, tugas.id, tugas.status)

                if ($("#list .row").length == 1){
                    elSembunyiTugas();
                }
            },
            error: function(response){
                console.log(response);
                errorMessage(response.responseJSON);
            }
        })
    }

    function updateTugas(idTugas, checkbox, label){
        tugasSelesai(checkbox, label);
        sembunyikanTugas($("#hide input"));
        $.ajax({
            url: 'https://api-latihan.rakryan.id/api/auth/todo-list/' + idTugas,
            type: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: {
                status: checkbox.is(":checked") ? "done" : "pending"
            },
            success: function(){
                tugasSelesai(checkbox, label);
                console.log("Berhasil Update");
            },
            error: function(response){
                console.log(response);
            }
        })
    }

    function deleteTugas(idTugas, icon, row){
        // let token = localStorage.getItem("token");
        hapusTugas(icon, row)
        if($("#list .row").length === 0){
            $("#hide .row").empty();
        }
        $.ajax({
            url: 'https://api-latihan.rakryan.id/api/auth/todo-list/' + idTugas,
            type: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(){
                alert("Tugas Berhasil Dihapus");

                hapusTugas(icon, row);
            },
            error: function(response){
                console.log(response);

            } 
        })
    }

    function logOut(){
        $.ajax({
            url: 'https://api-latihan.rakryan.id/api/auth/logout',
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(){
                window.location.href = "login.html";
            },
            error: function(response){
                console.log(response);
            }
        })
    }

    function errorMessage(responseJSON){
        
        let responseJsonString = JSON.stringify(responseJSON);
        let responseJsonParse = JSON.parse(responseJsonString);

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: responseJsonParse.message
          });
    }

})