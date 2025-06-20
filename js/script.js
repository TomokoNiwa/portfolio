document.addEventListener('DOMContentLoaded', () => {
    // --- 背景画像の自動切り替えロジック (Vanilla JS) ---
    const images = [
        './img/ph01.jpg',
        './img/ph02.jpg',
        './img/ph03.jpg',
        './img/ph04.jpg',
        './img/ph05.jpg',		
        './img/ph06.jpg',	
        './img/ph07.jpg'
    ];

    let currentIndex = 0;
    const bgImg1 = document.getElementById('bg-img-1');
    const bgImg2 = document.getElementById('bg-img-2');

    const fadeDuration = 2000; // CSSのtransition時間と合わせる
    const totalInterval = 5000; // 切り替え間隔

    // 初回設定: 最初の画像をbgImg1にロード
    if (bgImg1 && images.length > 0) {
        bgImg1.src = images[currentIndex];
        bgImg1.classList.add('active');
    }

    // 画像を切り替える関数
    function changeBackgroundImage() {
        const nextIndex = (currentIndex + 1) % images.length;
        const nextImageSrc = images[nextIndex];

        // 現在アクティブな画像と、次にアクティブになる画像を特定
        const currentActiveImg = bgImg1.classList.contains('active') ? bgImg1 : bgImg2;
        const currentInactiveImg = bgImg1.classList.contains('active') ? bgImg2 : bgImg1;

        // 次の画像を非アクティブなimg要素にロード
        // 画像のプリロードは、img要素のsrcを更新するだけで行われます
        currentInactiveImg.src = nextImageSrc;

        // アクティブクラスを切り替える
        // CSSでactiveクラスにtransitionを設定することでフェード効果が出ます
        currentActiveImg.classList.remove('active');
        currentInactiveImg.classList.add('active');
        
        currentIndex = nextIndex;
    }

    // 指定した間隔で画像を切り替える
    setInterval(changeBackgroundImage, totalInterval);

    // --- ハンバーガーメニューの開閉ロジック (Vanilla JS) ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const spNav = document.querySelector('.sp-nav');
    const spNavLinks = document.querySelectorAll('.sp-nav ul li a'); // aタグ要素を取得

    // メニューを閉じる共通関数を定義
    const closeMenu = () => {
        hamburgerMenu.classList.remove('active');
        spNav.classList.remove('active');
        document.body.classList.remove('no-scroll'); // bodyのno-scrollクラスを削除
    };

    if (hamburgerMenu && spNav) {
        hamburgerMenu.addEventListener('click', () => {
            if (spNav.classList.contains('active')) {
                closeMenu();
            } else {
                hamburgerMenu.classList.add('active');
                spNav.classList.add('active');
                document.body.classList.add('no-scroll'); // bodyにno-scrollクラスを追加
            }
        });

        // spNavの背景部分をクリックしてメニューを閉じる
        spNav.addEventListener('click', (event) => {
            if (event.target === spNav) { // クリックされたのがspNav自身か確認
                closeMenu();
            }
        });

        // spNav内のリンクがクリックされた時にメニューを閉じる
        spNavLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                // ページ内リンクの場合のみ処理（#から始まるhrefを持つリンク）
                if (link.hash !== '') {
                    closeMenu();
                }
                // デフォルトのスムーズスクロール (CSSのscroll-behavior) に任せるため
                // event.preventDefault() は呼び出しません
            });
        });
    }

    // --- スクロールによる要素のフェードインアニメーション (Vanilla JS) ---
    const fadeInTargets = document.querySelectorAll('.fade-in-up'); // アニメーションを適用する要素

    // 要素が表示範囲に入ったかチェックする関数
    function checkVisibility() {
        const windowHeight = window.innerHeight; // ウィンドウの高さ
        const scrollTop = window.scrollY;        // スクロール量

        fadeInTargets.forEach(el => {
            // すでに表示済みなら何もしない
            if (el.classList.contains('is-visible')) {
                return;
            }

            const elementOffset = el.getBoundingClientRect().top + scrollTop; // 要素の上端のドキュメントからの距離

            // 要素が画面の下端から入ってきたかチェック
            // 要素の上端が、現在のスクロール位置 + ウィンドウの高さ - 閾値（例: 100px）よりも上にある場合
            if (elementOffset < (scrollTop + windowHeight - 100)) { // -100は少し早めにアニメーションさせるための調整
                el.classList.add('is-visible');
            }
        });
    }

    // ロード時とスクロール時にチェック関数を実行
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('load', checkVisibility);

    // 初回ロード時にもチェックを実行 (DOMContentLoadedですでに実行されるが念のため)
    checkVisibility();
});



// js/script.js の一番下に追記

// --- フッターの年を自動更新するロジック ---
// 現在の年を取得
const year = new Date().getFullYear();

// idが "current-year" の要素を取得
const yearElement = document.getElementById('current-year');

// 要素が存在すれば、そのテキストコンテンツを現在の年に設定
if (yearElement) {
    yearElement.textContent = year;
}