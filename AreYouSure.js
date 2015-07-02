// ==UserScript==
// @name         Are You Sure? Piazza edition
// @namespace    http://scion-interactive.com/
// @version      0.1
// @description  Prompts you to confirm whether you really want to make your Piazza posts public
// @author       Arka
// @match        https://piazza.com/class/*
// @grant        none
// ==/UserScript==

normalPost = null;

var confirmSubmit = function() {
    var isPublic = $('#entire_group').is(':checked');
    var text = tinyMCE.get("rich_old_new_post").getContent().toLowerCase();
    var saysPrivate = (text.indexOf("private") > -1 || text.indexOf("public") > -1 || text.indexOf("grade") > -1 || test.indexOf("deduction") > -1);
    if (isPublic && saysPrivate) {
        if (window.confirm("Your post may mention grade-related information, but is currently public.  Are you sure you want to post?")) {
            $('#post_button').off('click');
            $('#post_button').on('click', function(e) {
                normalPost.handler();
            });
            $('#post_button').trigger('click');
        }
    } else {
        $('#post_button').off('click');
        $('#post_button').on('click', function(e) {
            normalPost.handler();
        });
        $('#post_button').trigger('click');
    }
}

var guardSubmit = function() {
    if ($('#post_button').length > 0 && (typeof $('#post_button').data("events") !== "undefined") && $('#post_button').data("events").click[0].handler != confirmSubmit) {
        normalPost = $('#post_button').data("events").click[0];
        $('#post_button').off('click');
        $('#post_button').on('click', confirmSubmit);
    }
};

$(document).ready(function() {
    guardSubmit();
    $('#new_post_button').on('click', guardSubmit);
    $('#question_feed_questions').on('click', '#draft_group .feed_item', guardSubmit);
});