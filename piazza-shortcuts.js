// ==UserScript==
// @name         Piazza Shortcuts
// @namespace    http://scion-interactive.com/
// @version      0.2
// @description  Make navigating post history friendlier and add deep share links.
// @author       Arka
// @match        https://piazza.com/class/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Arkaaito/piazza-js/master/piazza-shortcuts.js
// @downloadURL  https://raw.githubusercontent.com/Arkaaito/piazza-js/master/piazza-shortcuts.js
// ==/UserScript==

function debox() {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.className = 'die-box-die';
    style.type = 'text/css';
    style.innerHTML = '#question_history_description_wrapper { position: relative; top: -60px; }';
    // Uncomment to get rid of the thing altogether.
    // style.innerHTML = '#question_history_description_wrapper { visibility: hidden; }';
    head.appendChild(style);
}

function addHotkeys() {
    document.onkeydown = function(event) {
        if (event.shiftKey && (event.keyCode == 37)) navigateHistoryLeft();
        else if (event.shiftKey && (event.keyCode == 39)) navigateHistoryRight();
        else if (event.shiftKey && (event.keyCode == 38)) navigatePostsUp();
        else if (event.shiftKey && (event.keyCode == 40)) navigatePostsDown();
    };
}

function getFirstUnread() {
    // Because Piazza demolishes the history when it calculates this the first time,
    // we have to reverse-engineer it based on the graphical layout...
    var redBar = $('.slider-red')[0];
    if (redBar) {
        var redPct = redBar.style.left.replace("%", "");
        return Math.ceil(redPct / 100.0 * P.history_slider.slider.max);
    }
    return P.history_slider.slider.max;
}

function navigateHistoryLeft() {
    var oldHistory = P.history_slider.slider.getValue();
    if (oldHistory > 0) {
        var newHistory = (oldHistory - 1);
        P.history_slider.slider.setValue(newHistory);
        $('#actual_history_slider').trigger("slide");
        $('#actual_history_slider').trigger("slideStop");
    }
}

function navigateHistoryRight() {
    var oldHistory = P.history_slider.slider.getValue();
    var newHistory = null;
    if (oldHistory == P.history_slider.slider.max) {
        newHistory = getFirstUnread();
    } else if (oldHistory < P.history_slider.slider.max) {
        newHistory = (oldHistory + 1);
    }
    if (newHistory !== null) {
        P.history_slider.slider.setValue(newHistory);
        $('#actual_history_slider').trigger("slide");
        $('#actual_history_slider').trigger("slideStop");
    }
}

function navigatePostsUp() {
    var feedItems = $('.feed_item');
    var currentContentId = P.feed.selectedItem.id;
    var newContentId = null;
    for (var i = 0; i < feedItems.length; i++) {
        if (feedItems[i].id == currentContentId) {
            break;
        }
        newContentId = feedItems[i].id;
    }
    if (newContentId !== null) P.feed.selectContent(newContentId);
}

function navigatePostsDown() {
    var feedItems = $('.feed_item');
    var currentContentId = P.feed.selectedItem.id;
    var newContentId = null;
    for (var i = feedItems.length - 1; i >= 0; i--) {
        if (feedItems[i].id == currentContentId) {
            break;
        }
        newContentId = feedItems[i].id;
    }
    if (newContentId !== null) P.feed.selectContent(newContentId);
}

function addShareLinks(content) {
    // Add share link on individual follow-ups
    var contentItems = $('.clarifying_discussion, .discussion_replies.existing_replies, #s_answer, #i_answer');
    for (var i = 0; i < contentItems.length; i++) {
        if (contentItems[i].id !== "" && contentItems[i].id != "clarifying_discussion") {
            var directLink = window.location.href + "#" + contentItems[i].id;
            var linkNode = document.createElement('div');
            linkNode.innerHTML = "Direct link: <a href='"+ directLink + "'>"+directLink+"</a>";
            linkNode.style = "font-size: 8pt; padding: 10pt; float: right;";
            contentItems[i].insertBefore(linkNode,contentItems[i].firstChild);
            //contentItems[i].appendChild(linkNode);
        }
    }
}

function addHistoryZoom() {
    stockSlider = $('.slider_wrapper');
    if ($('.slider_wrapper')[0]) {
        wrappedSlider = "<div id='zoom'><div class='small'>" + stockSlider.innerHTML + "</div></div>";
        stockSlider.innerHTML = new_html;
    }
    $("#zoom").anythingZoomer();
}

(function() {
    'use strict';
    debox();
    addHotkeys();
    $(document).ready(function() {
        // Javascript that requires interaction with existing page elements goes here.
        
        PEM.addListener("content", addShareLinks);
        addShareLinks(P.feed.content);
        //PEM.addListener("content", addHistoryZoom);
        //addHistoryZoom();
    });
})();