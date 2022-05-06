var editing = false
var CurrentData = {};

$(document).ready(function() {
    $(document).on("click", "#info-form-submit", function (event) {
        var inputs = $(".info-form input").toArray();
        var department = $("#department").val();
        DisplayID({
            image: inputs[0].value,
            name: inputs[1].value,
            age: inputs[2].value,
            sex: inputs[3].value,
            number_id: inputs[4].value,
            rank: inputs[5].value,
            department: department
        })
        $.post('http://lg-identification/editSubmit', JSON.stringify(CurrentData));
        editing = false;
    });
});

window.addEventListener("message", function(ev) {
    if (ev.data.type == "id") {
        DisplayID(ev.data.data);
    }
    else if (ev.data.type == "edit") {
        EditID(ev.data.data);
    }
    else if (ev.data.type == "hide") {
        editing = false;
        DisplayID(CurrentData, true);
    }
    else if (ev.data.type == "config") {
        Config = ev.data.data;
    }
})

function EditID(data) {
    var data = data || CurrentData;
    DisplayID(data, true);
    data = CurrentData;
    var inputs = $(".info-form input").toArray();
    $("#department").val();
    for (var i = 0; i < inputs.length; i++) {
        $(inputs[i]).val(data[inputs[i].id]);
    }
    var department = $("#department").val(data["department"]);
    $(".info-form").css("display", "flex");
    $("#footer-display").css("display", "none");
    $(".container").css("top", "10px");
    editing = true;
}

function SetIDElements(data) {
    var image = data.image || "https://vanwinefest.ca/wp-content/uploads/bfi_thumb/profile-default-male-nyg4vc4i3m1d5pote7rfsv4o4c7p5ka5an0pselxcc-nyhjt6b1oifa23xq2ehfxoh9vink6vuxyns1y35vkc.png";
    var name = data.name || "John Doe";
    var age = data.age || "N/A";
    var sex = data.sex || "N/A";
    var number_id = data.number_id || "N/A";
    var rank = data.rank || "N/A";
    var department = data.department || "lspd";
    var fields = $(".fields-end").children(".field").children().toArray()
    CurrentData = {
        image: image,
        name: name,
        age: age,
        sex: sex,
        number_id: number_id,
        rank: rank,
        department: department
    };
    $(".sub-container").css("color", Config.Departments[department].colors.text);
    $(".field").css("border-bottom", "1px solid " + Config.Departments[department].colors.underline);
    $(".sub-container-background").css("background-image", "url(" + Config.Departments[department].background_image + ")");
    $(".sub-container").css("background-color", Config.Departments[department].background_color);
    $(".sub-container-header").html(Config.Departments[department].label);
    $(".photo-id").css("background-image", "url(" + image + ")");
    $(".photo-id").css("border", "2px solid " + Config.Departments[department].colors.photo);    
    $(fields[0]).html(name);
    $(fields[1]).html(age);
    $(fields[2]).html(sex);
    $(fields[3]).html(number_id);
    $(fields[4]).html(rank);
    $("#footer-text").html(Config.Departments[department].description);
    $(".info-form").css("display", "none");
    $("#footer-display").css("display", "block");
}

function DisplayID(data, hideID) {
    SetIDElements(data);
    if (hideID) {
        $(".container").css("top", "-600px");
    }
    else {
        $(".container").css("top", "10px");
        setTimeout(function() {
            if (editing) {return;}
            $(".container").css("top", "-600px");
        }, Config.DisplayTimer * 1000);
    }
}