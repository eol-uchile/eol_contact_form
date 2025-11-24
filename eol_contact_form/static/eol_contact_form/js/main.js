var correctCaptcha = function(response) {
    if(response.length != 0) {
        $('.form-submit').prop('disabled', false);
    } else {
        $('.form-submit').prop('disabled', true);
    }
};
$(window).on('load',function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    // get different types of url params
    if (urlParams.has('course')){
        $('#form-type').val(gettext("New run"));
        $('.form-course-name').show();
        $("#form-course").prop('required',true);
        $('#form-course').val(urlParams.get('course'));
        $('#form-message').val(gettext("I would like to participate in a new run of this course")+": " + urlParams.get('course'));
    }
});
$(function() {
    const show_permanently_identifier = document.getElementById("config").dataset.showPermanentlyIdentifier === "True";
    const referrer = document.referrer;
    $('#form-referrer').val(referrer);
    show_course_name();
    show_identifier();
    show_eol_link();
    show_honor_link();

    $('#form-type').on('change', function() {
        show_course_name();
        show_identifier();
        show_eol_link();
        show_honor_link();
    });
    function show_course_name() {
        if($('#form-type :selected').parent().attr('label') == gettext("Specific course questions")) {
            $('.form-course-name').show();
            $("#form-course").prop('required',true);
        } else {
            $('.form-course-name').hide();
            $('#form-course').val('');
            $("#form-course").prop('required',false);
        }
    }
    function show_identifier() {
        if (show_permanently_identifier) {
            $('.form-identifier-text').show();
            return;
        }
        if($('#form-type').val() == gettext("Login problems")) {
            $('.form-identifier-text').show();
        } else {
            $('.form-identifier-text').hide();
            $('#form-identifier').val('');
        }
    }
    function show_eol_link() {
        if($('#form-type').val() == gettext("Teacher training")) {
            $('#eol-link').show();
        } else {
            $('#eol-link').hide();
        }
    }
    function show_honor_link() {
        if($('#form-type').val() == gettext("Honor code")) {
            $('#honor-link').show();
        } else {
            $('#honor-link').hide();
        }
    }
});
