// ==UserScript==
// @name         Piazza Themes
// @namespace    http://scion-interactive.com/
// @version      1.0
// @description  Customize Piazza colors and menu contents.
//               To theme your classes:
//               1. Pull open the class in your web browser.
//               2. You'll see a url like /class/<your-class-id>
//               3. Scroll to the updateTheme method and put in a check like this:
//               if (window.location.pathname.indexOf('/class/<your-class-id>') > -1) {
//                   addTheme('<some-unique-name-like-your-class-number>', themes.jackets);
//               } else {
//                   $('style.<some-unique-name-like-your-class-number>').remove();
//               }
//               To change the current term (hiding older classes):
//               1. Scroll to the hideOutdated method and change the value of the term variable:
//               var term = 'Fall 2017';
// @author       Arka
// @match        https://piazza.com/class/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Arkaaito/piazza-js/master/piazza-themes.js
// @downloadURL  https://raw.githubusercontent.com/Arkaaito/piazza-js/master/piazza-themes.js
// ==/UserScript==

// See https://somethingididnotknow.wordpress.com/2013/07/01/change-page-styles-with-greasemonkeytampermonkey/
function addGlobalStyle(className, css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.className = className;
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function addTheme(themeName, settings) {
    if (typeof settings.bg_color == 'undefined') {
        settings.bg_color = '#E0EFDD';
    }
    if (typeof settings.link_color == 'undefined') {
        settings.link_color = '#34802C';
    }
    if (typeof settings.button_color == 'undefined') {
        settings.button_color = '#357548';
    }
    if (typeof settings.button_gradient == 'undefined') {
        settings.button_gradient = '#5D9B6C';
    }
    if (typeof settings.logo_info == 'undefined') {
        settings.logo_info = 'width: 28px !important; height: 28px !important; background: no-repeat url(//ssl.gstatic.com/chat/emoji/highdpi2-e79204e23d7d12d2c0c1d4a08d6a5117.png) -435px -406px; -webkit-background-size: 550px,724px; background-size: 550px,724px; margin: 2px;';
    }
    if (typeof settings.nav_bar_color == 'undefined') {
        settings.nav_bar_color = '#3E5A2B';
    }
    if (typeof settings.nav_bar_tab_color == 'undefined') {
        settings.nav_bar_tab_color = '#D9ECE4';
    }
    if (typeof settings.nav_bar_active_color == 'undefined') {
        settings.nav_bar_active_color = '#FFFFFF';
    }
    if (typeof settings.folder_color == 'undefined') {
        settings.folder_color = '#707D8D';
    }
    if (typeof settings.folder_bg_color == 'undefined') {
        settings.folder_bg_color = '#D2E8F1';
    }

    addGlobalStyle(themeName, '#page_main .main_panel, .post_type_box.active { background: '+settings.bg_color+' !important; }');
    addGlobalStyle(themeName, 'a, li.classDropdownItem { color: '+settings.link_color+' !important; }');
    addGlobalStyle(themeName, '.btn-primary { background: '+settings.button_color+' !important; background: -khtml-gradient(linear, left top, left bottom, from('+settings.button_gradient+'), to('+settings.button_color+')) !important; background: -webkit-gradient(linear, left top, left bottom, from('+settings.button_gradient+'), to('+settings.button_color+')) !important; background: -webkit-linear-gradient(top, '+settings.button_gradient+' 0%, '+settings.button_gradient+' 100%) !important; background: -moz-linear-gradient(center top, '+settings.button_color+', '+settings.button_gradient+') !important; background: -ms-linear-gradient(top, '+settings.button_gradient+' 0%, '+settings.button_gradient+' 100%) !important; background: -o-linear-gradient(top, '+settings.button_gradient+' 0%, '+settings.button_gradient+' 100%) !important; background: linear-gradient(top, '+settings.button_gradient+' 0%, '+settings.button_gradient+' 100%) !important; }');
    addGlobalStyle(themeName, '#classes_brand { '+settings.logo_info+'}');
    addGlobalStyle(themeName, '#top_bar.top_bar .navbar-inner, #top_bar.top_bar .nav.dark_nav { background: '+settings.nav_bar_color+' !important; }');
    addGlobalStyle(themeName, 'a.btn-primary, .class_list a, .top_bar_tab a, ul.top_bar_careers_homescreen a, ul.nav a { color: '+settings.nav_bar_tab_color+' !important; }');
    addGlobalStyle(themeName, 'a.btn-primary, .top_bar_tab.active a { color: '+settings.nav_bar_active_color+' !important; }');
    addGlobalStyle(themeName, '#popular_tags_bar a, #new_folder_list a { color: '+settings.folder_color+' !important; }');
    addGlobalStyle(themeName, '.post_region_folders .tag.folder, #new_folder_list .tag.folder { background: '+settings.folder_bg_color+' !important; }');
}

function updateTheme() {
    var themes = {
        'frogs': {
            'bg_color': '#E0EFDD',
            'link_color': '#34802C',
            'button_color': '#357548',
            'button_gradient': '#5D9B6C',
            'logo_info': 'width: 28px !important; height: 28px !important; background: no-repeat url(//ssl.gstatic.com/chat/emoji/highdpi2-e79204e23d7d12d2c0c1d4a08d6a5117.png) -435px -406px; -webkit-background-size: 550px,724px; background-size: 550px,724px; margin: 2px;',
            'nav_bar_color': '#3E5A2B',
            'nav_bar_tab_color': '#D9ECE4',
            'nav_bar_active_color': '#FFFFFF',
            'folder_color': '#707D8D',
        },
        'homebrew': {
            'bg_color': '#EAEFF4',
            'link_color': '#3C7CC0',
            'button_color': '#3575A8',
            'button_gradient': '#5D9BCC',
            'logo_info': 'background: url("/images/splash/layout/topbar/piazza_classes_logo_white_new.png") left top no-repeat; background-size: 156px 18px;',
            'nav_bar_color': '#3E7AAB',
            'nav_bar_tab_color': '#D9E4EC',
            'nav_bar_active_color': '#FFFFFF',
            'folder_color': '#707D8D'
        },
        'nighttime': {
            'bg_color': '#EAEFF4',
            'link_color': '#3C7CC0',
            'button_color': '#3575A8',
            'button_gradient': '#5D9BCC',
            'logo_info': 'background: url("/images/splash/layout/topbar/piazza_classes_logo_white_new.png") left top no-repeat; background-size: 156px 18px;',
            'nav_bar_color': '#3E7AAB',
            'nav_bar_tab_color': '#D9E4EC',
            'nav_bar_active_color': '#FFFFFF',
            'folder_color': '#707D8D'
        },
        'jackets': {
            'bg_color': '#00254C',
            'link_color': '#C59353',
            'button_color': '#EEB211',
            'button_gradient': '#C59353',
            'logo_info': 'background: url("/images/splash/layout/topbar/piazza_classes_logo_white_new.png") left top no-repeat; background-size: 156px 18px;',
            'nav_bar_color': '#15467A',
            'nav_bar_tab_color': '#EEB211',
            'nav_bar_active_color': '#FFFFFF',
            'folder_color': '#707D8D'
        },
        'grayscale': {
            'bg_color': '#DDDDDD',
            'link_color': '#737373',
            'button_color': '#6A6A6A',
            'button_gradient': '#909090',
            'logo_info': 'background: url("/images/splash/layout/topbar/piazza_classes_logo_white_new.png") left top no-repeat; background-size: 156px 18px;',
            'nav_bar_color': '#6F6F6F',
            'nav_bar_tab_color': '#E2E2E2',
            'nav_bar_active_color': '#FFFFFF',
            'folder_color': '#7B7B7B',
            'folder_bg_color': '#EFEFEF'
        },
        'orange': {
            'bg_color': '#F4EFEA',
            'link_color': '#C07C3C',
            'button_color': '#A87535',
            'button_gradient': '#CC9B5D',
            'logo_info': 'background: url("/images/splash/layout/topbar/piazza_classes_logo_white_new.png") left top no-repeat; background-size: 156px 18px;',
            'nav_bar_color': '#AB7A3E',
            'nav_bar_tab_color': '#ECE4D9',
            'nav_bar_active_color': '#FFFFFF',
            'folder_color': '#8D7D70',
            'folder_bg_color': '#F1E8D2'
        },
        'raspberry': {
            'bg_color': '#F4EAEF',
            'link_color': '#C03C7C',
            'button_color': '#A83575',
            'button_gradient': '#CC5D9B',
            'logo_info': 'background: url("/images/splash/layout/topbar/piazza_classes_logo_white_new.png") left top no-repeat; background-size: 156px 18px;',
            'nav_bar_color': '#AB3E7A',
            'nav_bar_tab_color': '#ECD9E4',
            'nav_bar_active_color': '#FFFFFF',
            'folder_color': '#8D707D',
            'folder_bg_color': '#F1D2E8'
        },
        'grass': {
            'bg_color': '#EAF4EF',
            'link_color': '#3CC07C',
            'button_color': '#35A875',
            'button_gradient': '#5DCC9B',
            'logo_info': 'background: url("/images/splash/layout/topbar/piazza_classes_logo_white_new.png") left top no-repeat; background-size: 156px 18px;',
            'nav_bar_color': '#3EAB7A',
            'nav_bar_tab_color': '#D9ECE4',
            'nav_bar_active_color': '#FFFFFF',
            'folder_color': '#708D7D',
            'folder_bg_color': '#D2F1E8'
        },
        'lime': {
            'bg_color': '#EFF4EA',
            'link_color': '#7CC03C',
            'button_color': '#75A835',
            'button_gradient': '#9BCC5D',
            'logo_info': 'background: url("/images/splash/layout/topbar/piazza_classes_logo_white_new.png") left top no-repeat; background-size: 156px 18px;',
            'nav_bar_color': '#7AAB3E',
            'nav_bar_tab_color': '#E4ECD9',
            'nav_bar_active_color': '#FFFFFF',
            'folder_color': '#7D8D70',
            'folder_bg_color': '#E8F1D2'
        },
        'purple': {
            'bg_color': '#EFEAF4',
            'link_color': '#7C3CC0',
            'button_color': '#7535A8',
            'button_gradient': '#9B5DCC',
            'logo_info': 'background: url("/images/splash/layout/topbar/piazza_classes_logo_white_new.png") left top no-repeat; background-size: 156px 18px;',
            'nav_bar_color': '#7A3EAB',
            'nav_bar_tab_color': '#E4D9EC',
            'nav_bar_active_color': '#FFFFFF',
            'folder_color': '#7D708D',
            'folder_bg_color': '#E8D2F1'
        },
        'normal': {
            'bg_color': '#EAEFF4',
            'link_color': '#3C7CC0',
            'button_color': '#3575A8',
            'button_gradient': '#5D9BCC',
            'logo_info': 'background: url("/images/splash/layout/topbar/piazza_classes_logo_white_new.png") left top no-repeat; background-size: 156px 18px;',
            'nav_bar_color': '#3E7AAB',
            'nav_bar_tab_color': '#D9E4EC',
            'nav_bar_active_color': '#FFFFFF',
            'folder_color': '#707D8D',
            'folder_bg_color': '#D2E8F1'
        },
    };

    if (window.location.pathname.indexOf('/class/j6bjwhz4dwi4e6') > -1) {
        addTheme('cs6750', themes.grayscale);
    } else {
        $('style.cs6750').remove();
    }
    if (window.location.pathname.indexOf('/class/j6gt7ycx6nk145') > -1) {
        addTheme('cse6242', themes.frogs);
    } else {
        $('style.cse6242').remove();
    }
    if (window.location.pathname.indexOf('/class/j6azklk4gaf4v9') > -1) {
        addTheme('cs6460', themes.raspberry);
    } else {
        $('style.cs6460').remove();
    }
    
}

function hideOutdated() {
    var term = 'Fall 2017';
    $('li.classDropdownItem').each(function() {
        var span = $(this).find('span.term');
        if (span.text() != '[' + term + ']') {
            $(this).hide();
        }
    });
}

updateTheme();
hideOutdated();

$(document).ready(function() {
    $('li.classDropdownItem.networkDropdown').on('click', function() {
        updateTheme();
    });
});
