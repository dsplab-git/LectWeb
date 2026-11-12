'use strict';

// 달빛카페 스크립트
//   3단계: 메뉴 표시와 탭 (이 파일)
//   4단계 주문, 5단계 애니메이션 마무리는 이어서 채운다

// ===== 메뉴 데이터 =====
// 메뉴를 바꾸려면 이 배열만 고치면 된다.
// temps: 고를 수 있는 온도 ('HOT', 'ICED'), 디저트는 비워 둔다.
// signature: true이면 연꽃 아이콘을 붙인다.
const MENU = {
    drink: [
        {
            title: '달빛 시그니처',
            items: [
                { id: 'moon-latte', name: '달빛 라떼', desc: '바닐라 크림을 보름달처럼 올린 시그니처 라떼', price: 6000, temps: ['HOT', 'ICED'], signature: true }
            ]
        },
        {
            title: '커피',
            items: [
                { id: 'espresso', name: '에스프레소', desc: '진하게 추출한 커피 한 잔', price: 3500, temps: ['HOT'] },
                { id: 'americano', name: '아메리카노', desc: '에스프레소에 물을 더한 깔끔한 커피', price: 4000, temps: ['HOT', 'ICED'] },
                { id: 'latte', name: '카페라떼', desc: '에스프레소와 부드러운 우유', price: 4800, temps: ['HOT', 'ICED'] },
                { id: 'vanilla-latte', name: '바닐라라떼', desc: '달콤한 바닐라 시럽을 더한 라떼', price: 5300, temps: ['HOT', 'ICED'] },
                { id: 'cappuccino', name: '카푸치노', desc: '에스프레소 위에 풍성한 우유 거품', price: 4800, temps: ['HOT'] },
                { id: 'caramel-macchiato', name: '카라멜 마키아토', desc: '카라멜 시럽과 드리즐을 올린 라떼', price: 5500, temps: ['HOT', 'ICED'] },
                { id: 'cold-brew', name: '콜드브루', desc: '찬물로 오래 우려낸 부드러운 커피', price: 5000, temps: ['ICED'] }
            ]
        },
        {
            title: '논커피',
            items: [
                { id: 'choco-latte', name: '초콜릿 라떼', desc: '진한 초콜릿과 우유', price: 5300, temps: ['HOT', 'ICED'] },
                { id: 'green-tea-latte', name: '녹차 라떼', desc: '은은하게 쌉쌀한 말차 라떼', price: 5500, temps: ['HOT', 'ICED'] },
                { id: 'sweet-potato-latte', name: '고구마 라떼', desc: '달콤한 고구마를 갈아 넣은 라떼', price: 5500, temps: ['HOT', 'ICED'] },
                { id: 'strawberry-milk', name: '딸기 우유', desc: '생딸기 청으로 만든 딸기 우유', price: 5800, temps: ['ICED'] }
            ]
        },
        {
            title: '에이드 · 티',
            items: [
                { id: 'lemon-ade', name: '레몬 에이드', desc: '상큼한 수제 레몬청', price: 5500, temps: ['ICED'] },
                { id: 'grapefruit-ade', name: '자몽 에이드', desc: '쌉쌀하고 상큼한 자몽청', price: 5500, temps: ['ICED'] },
                { id: 'chamomile-tea', name: '캐모마일 티', desc: '편안한 향의 허브 티', price: 4500, temps: ['HOT'] },
                { id: 'earl-grey-tea', name: '얼그레이 티', desc: '베르가못 향이 은은한 홍차', price: 4500, temps: ['HOT', 'ICED'] }
            ]
        },
        {
            title: '전통차',
            items: [
                { id: 'jujube-tea', name: '대추차', desc: '대추를 오래 달인 따뜻하고 달큰한 차', price: 5500, temps: ['HOT'] },
                { id: 'ssanghwa-tea', name: '쌍화차', desc: '한약재 향과 견과류를 올린 진한 전통차', price: 6000, temps: ['HOT'] },
                { id: 'sujeonggwa', name: '수정과', desc: '계피와 생강으로 끓인 시원한 전통 음료', price: 5500, temps: ['ICED'] },
                { id: 'yuja-tea', name: '유자차', desc: '새콤달콤한 수제 유자청', price: 5500, temps: ['HOT', 'ICED'] }
            ]
        }
    ],
    dessert: [
        {
            title: '케이크',
            items: [
                { id: 'cheesecake', name: '뉴욕 치즈케이크', desc: '꾸덕하고 진한 치즈케이크', price: 6500, temps: [] },
                { id: 'tiramisu', name: '티라미수', desc: '마스카포네와 커피 시트의 클래식', price: 6500, temps: [] },
                { id: 'choco-cake', name: '초코 케이크', desc: '촉촉한 초콜릿 시트와 가나슈', price: 6500, temps: [] },
                { id: 'carrot-cake', name: '당근 케이크', desc: '향신료와 크림치즈 프로스팅', price: 6500, temps: [] }
            ]
        },
        {
            title: '구움과자 · 베이커리',
            items: [
                { id: 'croissant', name: '크루아상', desc: '겹겹이 바삭한 버터 크루아상', price: 4000, temps: [] },
                { id: 'scone', name: '플레인 스콘', desc: '잼과 크림이 함께 나오는 스콘', price: 3800, temps: [] },
                { id: 'madeleine', name: '마들렌', desc: '버터 향 가득한 작은 케이크', price: 3000, temps: [] },
                { id: 'financier', name: '휘낭시에', desc: '겉은 바삭, 속은 촉촉한 구움과자', price: 3000, temps: [] },
                { id: 'cookie', name: '초코칩 쿠키', desc: '큼직한 초코칩이 박힌 쿠키', price: 3000, temps: [] },
                { id: 'croffle', name: '크로플', desc: '크루아상 반죽을 구운 와플, 아이스크림 추가 가능', price: 6000, temps: [] }
            ]
        }
    ]
};

// ===== 아이콘 =====
// 연잎: 소분류 제목 앞에, 연꽃: 시그니처 메뉴 옆에 붙인다.
const ICON_LEAF =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<ellipse cx="12" cy="13" rx="10" ry="6" fill="currentColor"/>' +
    '<path d="M12 13 L21 10.5 M12 13 L3.5 11 M12 13 L12 18.5" stroke="#081a45" stroke-width="0.9" stroke-linecap="round" fill="none" opacity=".55"/>' +
    '</svg>';

const ICON_LOTUS =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<ellipse cx="12" cy="12" rx="3.6" ry="8" transform="rotate(-38 12 19)" fill="currentColor" opacity=".75"/>' +
    '<ellipse cx="12" cy="12" rx="3.6" ry="8" transform="rotate(38 12 19)" fill="currentColor" opacity=".75"/>' +
    '<ellipse cx="12" cy="11" rx="3.8" ry="8.5" fill="currentColor"/>' +
    '</svg>';

// ===== 화면 상태 =====
const state = {
    tab: 'drink',   // 'drink' 또는 'dessert'
    cart: []        // 담은 메뉴: { id, temp, qty } 목록 (이름과 가격은 MENU에서 찾는다)
};

const CART_KEY = 'moonlight-cafe-cart';   // 브라우저에 주문서를 저장하는 이름
const MAX_QTY = 20;                       // 한 메뉴를 담을 수 있는 최대 수량

// id로 메뉴를 바로 찾기 위한 표
const MENU_BY_ID = {};
Object.values(MENU).forEach(function (groups) {
    groups.forEach(function (group) {
        group.items.forEach(function (item) {
            MENU_BY_ID[item.id] = item;
        });
    });
});

// ===== 보조 함수 =====
function formatPrice(price) {
    return price.toLocaleString('ko-KR') + '원';
}

// 요소를 만들고 글자를 넣는다 (글자는 textContent로 넣어 안전하게 처리)
function createEl(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function createIcon(className, svg) {
    const span = createEl('span', className);
    span.innerHTML = svg;
    return span;
}

// ===== 메뉴 표시 =====
function renderItem(item) {
    const card = createEl('article', 'item');
    card.dataset.id = item.id;

    const top = createEl('div', 'item__top');
    const name = createEl('h4', 'item__name');
    name.append(item.name);
    if (item.signature) {
        const lotus = createIcon('item__icon', ICON_LOTUS);
        lotus.setAttribute('title', '달빛카페 시그니처');
        name.append(lotus);
    }
    top.append(name, createEl('span', 'item__price', formatPrice(item.price)));
    card.append(top, createEl('p', 'item__desc', item.desc));

    // 아래 줄: 온도 선택(고를 수 없으면 표시만)과 담기 버튼
    const bottom = createEl('div', 'item__bottom');
    let selectedTemp = item.temps.length > 0 ? item.temps[0] : '';

    if (item.temps.length === 1) {
        bottom.append(createEl('span', 'badge badge--' + selectedTemp.toLowerCase(), selectedTemp));
    } else if (item.temps.length > 1) {
        const group = createEl('div', 'temps');
        group.setAttribute('role', 'group');
        group.setAttribute('aria-label', item.name + ' 온도 선택');

        const buttons = item.temps.map(function (temp, index) {
            const btn = createEl('button', 'temp temp--' + temp.toLowerCase(), temp);
            btn.type = 'button';
            btn.setAttribute('aria-pressed', String(index === 0));
            btn.addEventListener('click', function () {
                selectedTemp = temp;
                buttons.forEach(function (other) {
                    other.setAttribute('aria-pressed', String(other === btn));
                });
            });
            return btn;
        });
        group.append(...buttons);
        bottom.append(group);
    }

    const add = createEl('button', 'item__add', '담기');
    add.type = 'button';
    add.setAttribute('aria-label', item.name + ' 담기');
    let flashTimer = 0;
    add.addEventListener('click', function () {
        addToCart(item.id, selectedTemp);
        add.classList.add('is-added');
        add.textContent = '담았어요';
        clearTimeout(flashTimer);
        flashTimer = setTimeout(function () {
            add.classList.remove('is-added');
            add.textContent = '담기';
        }, 900);
    });
    bottom.append(add);

    card.append(bottom);
    return card;
}

function renderCategory(category) {
    const section = createEl('section', 'cat');
    const title = createEl('h3', 'cat__title');
    title.append(createIcon('cat__icon', ICON_LEAF), category.title);
    section.append(title);

    const list = createEl('div', 'cat__items');
    category.items.forEach(function (item) {
        list.append(renderItem(item));
    });
    section.append(list);
    return section;
}

function renderMenu() {
    const list = document.getElementById('menu-list');
    list.replaceChildren(...MENU[state.tab].map(renderCategory));
    list.setAttribute('aria-labelledby', 'tab-' + state.tab);
}

// ===== 탭 =====
function setTab(tab) {
    state.tab = tab;
    document.querySelectorAll('.tabs__btn').forEach(function (btn) {
        const active = btn.dataset.tab === tab;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', String(active));
        btn.tabIndex = active ? 0 : -1;
    });
    renderMenu();
}

function setupTabs() {
    const buttons = Array.from(document.querySelectorAll('.tabs__btn'));

    buttons.forEach(function (btn, index) {
        btn.addEventListener('click', function () {
            setTab(btn.dataset.tab);
        });

        // 키보드: 좌우 화살표로 탭 이동
        btn.addEventListener('keydown', function (event) {
            let next = -1;
            if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
            if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
            if (next < 0) return;
            event.preventDefault();
            setTab(buttons[next].dataset.tab);
            buttons[next].focus();
        });
    });
}

// ===== 주문: 상태와 저장 =====
function lineKey(line) {
    return line.id + '|' + line.temp;
}

function lineLabel(line) {
    const item = MENU_BY_ID[line.id];
    return line.temp ? item.name + ' (' + line.temp + ')' : item.name;
}

function cartCount() {
    return state.cart.reduce(function (sum, line) {
        return sum + line.qty;
    }, 0);
}

function cartTotal() {
    return state.cart.reduce(function (sum, line) {
        return sum + MENU_BY_ID[line.id].price * line.qty;
    }, 0);
}

// 저장된 주문서를 읽는다. 잘못된 값이나 없어진 메뉴는 걸러낸다.
function loadCart() {
    const cart = [];
    try {
        const saved = JSON.parse(localStorage.getItem(CART_KEY));
        if (!Array.isArray(saved)) return cart;

        saved.forEach(function (line) {
            const item = line && MENU_BY_ID[line.id];
            if (!item) return;
            const tempOk = item.temps.length === 0 ? line.temp === '' : item.temps.includes(line.temp);
            if (!tempOk || !Number.isInteger(line.qty) || line.qty < 1) return;

            const same = cart.find(function (other) {
                return lineKey(other) === lineKey(line);
            });
            if (same) {
                same.qty = Math.min(MAX_QTY, same.qty + line.qty);
            } else {
                cart.push({ id: line.id, temp: line.temp, qty: Math.min(MAX_QTY, line.qty) });
            }
        });
    } catch (error) {
        // 저장소를 쓸 수 없거나 값이 깨졌으면 빈 주문서로 시작한다.
        return [];
    }
    return cart;
}

function saveCart() {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
    } catch (error) {
        // 저장이 막힌 환경에서는 저장 없이 계속 동작한다.
    }
}

// 스크린 리더에게 알려 주는 짧은 안내
function announce(message) {
    document.getElementById('live').textContent = message;
}

// ===== 주문: 담기, 수량, 삭제 =====
function addToCart(id, temp) {
    const key = id + '|' + temp;
    const line = state.cart.find(function (other) {
        return lineKey(other) === key;
    });

    if (!line) {
        state.cart.push({ id: id, temp: temp, qty: 1 });
    } else if (line.qty >= MAX_QTY) {
        announce('한 메뉴는 최대 ' + MAX_QTY + '개까지 담을 수 있어요.');
        return;
    } else {
        line.qty += 1;
    }

    onCartChange();
    announce(lineLabel({ id: id, temp: temp }) + ' 담았어요. 주문서에 ' + cartCount() + '개');
}

function changeQty(key, delta) {
    const line = state.cart.find(function (other) {
        return lineKey(other) === key;
    });
    if (!line) return;

    if (delta > 0 && line.qty >= MAX_QTY) {
        announce('한 메뉴는 최대 ' + MAX_QTY + '개까지 담을 수 있어요.');
        return;
    }
    line.qty += delta;
    if (line.qty < 1) {
        removeLine(key);
        return;
    }
    onCartChange();
}

function removeLine(key) {
    state.cart = state.cart.filter(function (line) {
        return lineKey(line) !== key;
    });
    onCartChange();
}

function clearCart() {
    state.cart = [];
    onCartChange();
}

// 주문서가 바뀔 때마다: 저장하고, 하단 바와 열려 있는 주문서를 갱신한다
function onCartChange() {
    saveCart();
    updateOrderBar();
    if (document.getElementById('order-sheet').open) {
        renderSheet();
    }
}

// ===== 주문: 하단 바 =====
function updateOrderBar() {
    const count = cartCount();
    document.getElementById('order-count').textContent = String(count);
    document.getElementById('order-total').textContent = cartTotal().toLocaleString('ko-KR');
    document.getElementById('order-bar').hidden = count === 0;
}

// ===== 주문: 주문서 =====
function renderLine(line) {
    const item = MENU_BY_ID[line.id];
    const key = lineKey(line);
    const label = lineLabel(line);
    const row = createEl('div', 'line');

    const name = createEl('h3', 'line__name', item.name);
    if (line.temp) {
        name.append(createEl('span', 'badge badge--' + line.temp.toLowerCase(), line.temp));
    }
    const info = createEl('div', 'line__info');
    info.append(name, createEl('p', 'line__unit', formatPrice(item.price)));

    const top = createEl('div', 'line__top');
    top.append(info, createEl('span', 'line__price', formatPrice(item.price * line.qty)));

    const minus = createEl('button', 'stepper__btn', '−');
    minus.type = 'button';
    minus.setAttribute('aria-label', label + ' 수량 줄이기');
    minus.addEventListener('click', function () {
        changeQty(key, -1);
    });

    const plus = createEl('button', 'stepper__btn', '+');
    plus.type = 'button';
    plus.setAttribute('aria-label', label + ' 수량 늘리기');
    plus.addEventListener('click', function () {
        changeQty(key, 1);
    });

    const stepper = createEl('div', 'stepper');
    stepper.append(minus, createEl('span', 'stepper__qty', String(line.qty)), plus);

    const remove = createEl('button', 'line__remove', '삭제');
    remove.type = 'button';
    remove.setAttribute('aria-label', label + ' 삭제');
    remove.addEventListener('click', function () {
        removeLine(key);
    });

    const bottom = createEl('div', 'line__bottom');
    bottom.append(stepper, remove);

    row.append(top, bottom);
    return row;
}

function renderSheet() {
    const body = document.getElementById('sheet-body');
    const empty = state.cart.length === 0;

    body.replaceChildren();
    if (empty) {
        body.append(createEl('p', 'sheet__empty', '아직 담은 메뉴가 없어요. 메뉴판에서 담아 주세요.'));
    } else {
        state.cart.forEach(function (line) {
            body.append(renderLine(line));
        });
    }

    document.getElementById('sheet-total').textContent = formatPrice(cartTotal());
    document.getElementById('sheet-clear').hidden = empty;
    document.getElementById('sheet-confirm').hidden = empty;
}

// ===== 주문: 확인 화면 (직원에게 보여주는 화면) =====
function renderConfirm() {
    const body = document.getElementById('ticket-body');
    body.replaceChildren();

    state.cart.forEach(function (line) {
        const row = createEl('div', 'ticket__line');
        row.append(
            createEl('span', 'ticket__name', lineLabel(line)),
            createEl('span', 'ticket__qty', '× ' + line.qty),
            createEl('span', 'ticket__price', formatPrice(MENU_BY_ID[line.id].price * line.qty))
        );
        body.append(row);
    });

    document.getElementById('ticket-total').textContent = formatPrice(cartTotal());
    const time = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('ticket-time').textContent = '주문 시각 ' + time + ' · 총 ' + cartCount() + '개';
}

function setupOrder() {
    const sheet = document.getElementById('order-sheet');
    const confirmSheet = document.getElementById('confirm-sheet');
    const clearBtn = document.getElementById('sheet-clear');
    let clearTimer = 0;

    // 비우기는 실수로 누르지 않도록 두 번 눌러야 한다
    function disarmClear() {
        clearTimeout(clearTimer);
        clearBtn.dataset.armed = 'false';
        clearBtn.textContent = '비우기';
    }

    document.getElementById('order-open').addEventListener('click', function () {
        renderSheet();
        sheet.showModal();
    });

    document.getElementById('sheet-close').addEventListener('click', function () {
        sheet.close();
    });

    clearBtn.addEventListener('click', function () {
        if (clearBtn.dataset.armed === 'true') {
            disarmClear();
            clearCart();
            return;
        }
        clearBtn.dataset.armed = 'true';
        clearBtn.textContent = '정말 비울까요?';
        clearTimer = setTimeout(disarmClear, 3000);
    });

    sheet.addEventListener('close', disarmClear);

    document.getElementById('sheet-confirm').addEventListener('click', function () {
        renderConfirm();
        sheet.close();
        confirmSheet.showModal();
    });

    document.getElementById('confirm-close').addEventListener('click', function () {
        confirmSheet.close();
    });

    document.getElementById('confirm-back').addEventListener('click', function () {
        confirmSheet.close();
        renderSheet();
        sheet.showModal();
    });

    document.getElementById('confirm-new').addEventListener('click', function () {
        clearCart();
        confirmSheet.close();
    });

    // 어두운 배경을 누르면 닫는다
    [sheet, confirmSheet].forEach(function (dialog) {
        dialog.addEventListener('click', function (event) {
            if (event.target === dialog) dialog.close();
        });
    });
}

// ===== 시작 =====
// 'js' 클래스는 입장 화면 깜빡임을 막으려고 index.html 위쪽에서 먼저 붙인다.
function init() {
    state.cart = loadCart();
    setupTabs();
    setTab(state.tab);
    setupOrder();
    updateOrderBar();
}

document.addEventListener('DOMContentLoaded', init);
