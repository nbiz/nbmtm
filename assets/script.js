function formToJson(form$) {
    var array = form$.serializeArray();
    var json = {};

    jQuery.each(array, function () {
        json[this.name] = this.value || '';
    });

    return JSON.stringify(json);
}

$('#lead-form').on('submit', function (event) {
    event.preventDefault();
    console.log("Form submitted");
    var url = 'https://api.smartmoving.com/api/leads/from-provider/v2?providerKey=';
    var providerKey = 'f379ab14-601f-4852-9a49-afd601456102';

    var formObject = {};

    $(this).serializeArray().forEach(item => {
        formObject[item.name] = item.value;
    });

    console.log("Form data:", formObject);

    $.ajax({
        url: url + providerKey,
        type: "POST",
        data: JSON.stringify(formObject),
        contentType: "application/json",
        success: function (result) {
            console.log("Success response:", result);
            alert('Your information has been received!')
        },
        error: function (xhr, resp, text) {
            console.log("Error:", xhr, resp, text);
            alert('There was a problem submitting your information.')
        }
    });
});
