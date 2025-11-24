// ==UserScript==
// @name         Channel.io Dot Style Modifier (CSS Injection)
// @namespace    https://github.com/yourusername
// @version      2.1
// @description  Change notification dot to red on Channel.io Desk using CSS injection
// @author       문동규 / 수정 윤도우리
// @match        https://desk.channel.io/*
// @grant        GM_addStyle
// @updateURL    https://gist.githubusercontent.com/yourusername/yourgistid/raw/channelio-dot-css.user.js
// @downloadURL  https://gist.githubusercontent.com/yourusername/yourgistid/raw/channelio-dot-css.user.js
// ==/UserScript==

(function () {
    'use strict';
    
    // CSS로 스타일 강제 적용
    GM_addStyle(`
        /* NotiBadgestyled__Dot 패턴 매칭 */
        [class*="NotiBadgestyled__Dot"] {
            width: 20px !important;
            height: 20px !important;
            background-color: red !important;
            border-radius: 50% !important;
        }
        
        /* 더 넓은 범위로 span 태그 중 Dot 클래스 포함 */
        span[class*="Dot"] {
            width: 20px !important;
            height: 20px !important;
            background-color: red !important;
            border-radius: 50% !important;
        }
    `);
    
    console.log('Channel.io Dot Style Modifier (CSS Injection) loaded');
})();
