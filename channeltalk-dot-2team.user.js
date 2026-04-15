// ==UserScript==
// @name         Channel.io Dot Style Modifier
// @namespace    https://github.com/yourusername
// @version      3.0
// @description  팀원 담당 채팅은 파란색, 그 외는 빨간색으로 알림 점 표시
// @author       윤도루리
// @match        https://desk.channel.io/*
// @grant        GM_addStyle
// @updateURL    https://gist.githubusercontent.com/yourusername/yourgistid/raw/channelio-dot-css.user.js
// @downloadURL  https://gist.githubusercontent.com/yourusername/yourgistid/raw/channelio-dot-css.user.js
// ==/UserScript==

(function () {
    'use strict';

    // 파란색 점으로 표시할 팀원 명단
    const TEAM_MEMBERS = [
        '윤도우리',
        '이민주',
        '김채영',
        '정유경',
        '이은정',
        '오민환',
        '김연수'
    ];

    GM_addStyle(`
        /* 기본 빨간색 점 (팀원이 아닌 담당자) */
        [class*="NotiBadgestyled__Dot"]:not([data-team-dot]),
        span[class*="Dot"]:not([data-team-dot]) {
            width: 10px !important;
            height: 10px !important;
            background: radial-gradient(circle at 30% 30%, #ff8787, #e03131) !important;
            border-radius: 50% !important;
            box-shadow:
                0 0 0 2px rgba(255, 255, 255, 0.95),
                0 2px 4px rgba(224, 49, 49, 0.35),
                0 0 8px rgba(224, 49, 49, 0.25) !important;
            transition: transform 0.2s ease !important;
            animation: pulseRed 2s infinite ease-in-out !important;
        }

        /* 팀원 담당 채팅 - 파란색 점 */
        [data-team-dot="true"] {
            width: 10px !important;
            height: 10px !important;
            background: radial-gradient(circle at 30% 30%, #74c0fc, #1971c2) !important;
            border-radius: 50% !important;
            box-shadow:
                0 0 0 2px rgba(255, 255, 255, 0.95),
                0 2px 4px rgba(25, 113, 194, 0.35),
                0 0 8px rgba(25, 113, 194, 0.25) !important;
            transition: transform 0.2s ease !important;
            animation: pulseBlue 2s infinite ease-in-out !important;
        }

        @keyframes pulseRed {
            0%, 100% {
                box-shadow:
                    0 0 0 2px rgba(255, 255, 255, 0.95),
                    0 2px 4px rgba(224, 49, 49, 0.35),
                    0 0 8px rgba(224, 49, 49, 0.25);
            }
            50% {
                box-shadow:
                    0 0 0 2px rgba(255, 255, 255, 0.95),
                    0 2px 6px rgba(224, 49, 49, 0.55),
                    0 0 14px rgba(224, 49, 49, 0.45);
            }
        }

        @keyframes pulseBlue {
            0%, 100% {
                box-shadow:
                    0 0 0 2px rgba(255, 255, 255, 0.95),
                    0 2px 4px rgba(25, 113, 194, 0.35),
                    0 0 8px rgba(25, 113, 194, 0.25);
            }
            50% {
                box-shadow:
                    0 0 0 2px rgba(255, 255, 255, 0.95),
                    0 2px 6px rgba(25, 113, 194, 0.55),
                    0 0 14px rgba(25, 113, 194, 0.45);
            }
        }
    `);

    // 담당자 이름을 보고 해당 채팅 항목의 dot을 마킹
    function markTeamMemberDots() {
        const assigneeTexts = document.querySelectorAll('[class*="AssigneeText"]');

        assigneeTexts.forEach(textEl => {
            const name = textEl.textContent.trim();
            const isTeamMember = TEAM_MEMBERS.includes(name);

            // 가장 가까운 채팅 항목 컨테이너 찾기
            const item = textEl.closest('[class*="UserChatListItem"]')
                      || textEl.closest('li')
                      || textEl.closest('[role="listitem"]');

            if (!item) return;

            const dots = item.querySelectorAll('[class*="Dot"]');
            dots.forEach(dot => {
                if (isTeamMember) {
                    dot.setAttribute('data-team-dot', 'true');
                } else {
                    // 담당자가 변경된 경우 파란색 → 빨간색 복귀
                    dot.removeAttribute('data-team-dot');
                }
            });
        });
    }

    // 초기 실행
    markTeamMemberDots();

    // 채팅 목록은 동적으로 갱신되므로 MutationObserver로 감시 + 디바운싱
    let debounceTimer;
    const observer = new MutationObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(markTeamMemberDots, 120);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log('Channel.io Dot Style Modifier v3.0 loaded - 팀원 구분 활성화');
})();
