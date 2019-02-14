var inputs = document.querySelectorAll('form input[ type="text" ]');
var submitBtn = document.getElementById('submit-form');
var form = document.getElementById( 'example-form' );

var invalidInputs = [];
var validInputs = [];

var errorSummaryContainer = document.getElementById( 'error-summary' );
var errorSummaryText = document.querySelector( '#error-summary ul' );
var errorSummaryHeading = document.querySelector( '#error-summary h3' );
var successSummaryContainer = document.getElementById( 'success-summary' );



// Event handlers


function submitForm( event ) {
    event.preventDefault();
    //check if all inputs have something inside
    checkInputValid( inputs );

    //add error states
    addErrorStates( invalidInputs );
    removeErrorStates( validInputs );

    if ( invalidInputs.length > 0 ) {
        errorSummaryContainer.style.display = "block";
        errorSummaryText.innerHTML = createErrorSummary( invalidInputs );
        var firstError = document.querySelector( '#error-summary a' );
        errorSummaryHeading.focus();
        
    }
    else {
        errorSummaryContainer.style.display = "none";
        form.style.display = "none";
        successSummaryContainer.style.display = "block";
    }

}


function checkInputValid( formInputs ) {
    invalidInputs = [];
    validInputs = [];
    for( var i = 0; i < formInputs.length; i++ ) {
        if ( formInputs[i].value.trim().length <1 ) {
            invalidInputs.push( formInputs[i] );
        }
        else {
            validInputs.push( formInputs[i] );
        }
    }
}

function addErrorStates( invalidInputs ) {
    
    for ( var i = 0; i < invalidInputs.length; i++ ) {
        var inputId = invalidInputs[ i ].id;
        var hintText = hasHintText( inputId );
        var errorText = document.getElementById( inputId + '-error' );

        errorText.classList.remove( 'au-error-text--hidden' );
        invalidInputs[ i ].classList.add( 'au-text-input--invalid' );
        invalidInputs[ i ].setAttribute( 'aria-invalid', 'true');
        invalidInputs[ i ].setAttribute( 'aria-describedby', errorText.id + ' ' +  hintText  );

        var parentDiv = invalidInputs[ i ].parentNode;
        parentDiv.classList.add( 'au-form-group--error' );
    }
}

function hasHintText( input ) {
    if ( document.getElementById( input + '-hint' ) ) {
        return document.getElementById( input + '-hint' ).id;
    }
    else {
        return "";
    }
}

function removeErrorStates( validInputs ) {

    for ( var i = 0; i < validInputs.length; i++ ) {
        var inputId = validInputs[ i ].id;
        var errorText = document.getElementById( inputId + '-error' );        

        errorText.classList.add( 'au-error-text--hidden' );
        validInputs[ i ].classList.remove( 'au-text-input--invalid' );
        validInputs[ i ].removeAttribute( 'aria-invalid');
        validInputs[ i ].removeAttribute( 'aria-describedby');

        var parentDiv = validInputs[ i ].parentNode;
        parentDiv.classList.remove( 'au-form-group--error' );
    }
}

function createErrorSummary( invalidInputs ) {
    var errorMessage = "";
    for( var i = 0; i < invalidInputs.length; i++ ){
        errorMessage += "<li><a href='#"+ invalidInputs[i].id+"'>" + invalidInputs[i].id +" was not filled in</a></li>";
    }

    return errorMessage;
}


// Event listeners

submitBtn.addEventListener( 'click', submitForm );