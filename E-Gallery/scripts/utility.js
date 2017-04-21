import 'jquery';
import 'jquery-ui';
function displayError(error) {
    $('#error').show()
        .text('Error: ' + error.responseJSON.description).hide("fade", 4000);
}

function showSuccessMessage(message) {
    $('#info').text(message).show().hide("fade", 4000);
}

export{displayError, showSuccessMessage};