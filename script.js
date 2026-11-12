'use strict';

// 달빛카페 스크립트
// 1단계: 뼈대만 연결한다. 기능은 단계별로 채운다.
//   2단계 입장 화면 장면, 3단계 메뉴 표시와 탭, 4단계 주문, 5단계 애니메이션

// 화면 상태
const state = {
    tab: 'drink',   // 'drink' 또는 'dessert'
    cart: []        // 담은 메뉴 (4단계)
};

// 처음 한 번 실행 (3단계부터 메뉴 표시와 탭을 여기서 시작한다)
// 'js' 클래스는 입장 화면 깜빡임을 막으려고 index.html 위쪽에서 먼저 붙인다.
function init() {
}

document.addEventListener('DOMContentLoaded', init);
