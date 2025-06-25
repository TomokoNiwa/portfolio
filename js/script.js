$(function() {
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
    const $bgImg1 = $('#bg-img-1');
    const $bgImg2 = $('#bg-img-2');

    const fadeDuration = 2000; // CSSのtransition時間と合わせる
    const totalInterval = 8000; // 切り替え間隔

    // 初回設定: 最初の画像を$bgImg1にロード
    if ($bgImg1.length && images.length > 0) { // 要素が存在するかどうかを.lengthで確認
        $bgImg1.attr('src', images[currentIndex]).addClass('active');
    }

    // 画像を切り替える関数
    function changeBackgroundImage() {
        const nextIndex = (currentIndex + 1) % images.length;
        const nextImageSrc = images[nextIndex];

        // 現在アクティブな画像と、次にアクティブになる画像を特定
        if ($bgImg1.hasClass('active')) {
            $currentActiveImg = $bgImg1; // $bgImg1がアクティブ
            $currentInactiveImg = $bgImg2; // $bgImg2が非アクティブ
        } else { // そうでなければ、$bgImg1に'active'クラスがない場合
            $currentActiveImg = $bgImg2; // $bgImg2がアクティブ
            $currentInactiveImg = $bgImg1; // $bgImg1が非アクティブ
        }

        // 次の画像を非アクティブなimg要素にロード
        $currentInactiveImg.attr('src', nextImageSrc);

        // アクティブクラスを切り替える
        $currentActiveImg.removeClass('active');
        $currentInactiveImg.addClass('active');
        
        currentIndex = nextIndex;
    }

    // 指定した間隔で画像を切り替える
    setInterval(changeBackgroundImage, totalInterval);

    // --- ハンバーガーメニューの開閉ロジック (jQuery) ---
    const $hamburgerMenu = $('.hamburger-menu');
    const $spNav = $('.sp-nav');
    const $spNavLinks = $('.sp-nav ul li a'); // aタグ要素を取得

    // メニューを閉じる共通関数を定義
    const closeMenu = () => {
        $hamburgerMenu.removeClass('active');
        $spNav.removeClass('active');
        $('body').removeClass('no-scroll'); // bodyのno-scrollクラスを削除
    };

    if ($hamburgerMenu.length && $spNav.length) { // 要素が存在するかどうかを.lengthで確認
        $hamburgerMenu.on('click', function() {
            if ($spNav.hasClass('active')) {
                closeMenu();
            } else {
                $hamburgerMenu.addClass('active');
                $spNav.addClass('active');
                $('body').addClass('no-scroll'); // bodyにno-scrollクラスを追加
            }
        });

        // $spNavの背景部分をクリックしてメニューを閉じる
        $spNav.on('click', function(event) {
            if ($(event.target).is($spNav)) { // クリックされたのが$spNav自身か確認
                closeMenu();
            }
        });

        // $spNav内のリンクがクリックされた時にメニューを閉じる
        $spNavLinks.on('click', function() {
            // ページ内リンクの場合のみ処理（#から始まるhrefを持つリンク）
            if ($(this).attr('href').startsWith('#')) {
                closeMenu();
            }
            // デフォルトのスムーズスクロール (CSSのscroll-behavior) に任せるため
            // event.preventDefault() は呼び出しません
        });
    }

    // --- スクロールによる要素のフェードインアニメーション (jQuery) ---
    const $fadeInTargets = $('.fade-in-up'); // アニメーションを適用する要素

    // 要素が表示範囲に入ったかチェックする関数
    function checkVisibility() {
        const windowHeight = $(window).height(); // ウィンドウの高さ
        const scrollTop = $(window).scrollTop(); // スクロール量

        $fadeInTargets.each(function() { // jQueryの.each()でループ処理
            const $el = $(this); // 各要素をjQueryオブジェクトとして取得

            // すでに表示済みなら何もしない
            if ($el.hasClass('is-visible')) {
                return;
            }

            const elementOffset = $el.offset().top; // 要素の上端のドキュメントからの距離

            // 要素が画面の下端から入ってきたかチェック
            // 要素の上端が、現在のスクロール位置 + ウィンドウの高さ - 閾値（例: 100px）よりも上にある場合
            if (elementOffset < (scrollTop + windowHeight - 100)) { // -100は少し早めにアニメーションさせるための調整
                $el.addClass('is-visible');
            }
        });
    }

    // ロード時とスクロール時にチェック関数を実行
    $(window).on('scroll load', checkVisibility);

    // 初回ロード時にもチェックを実行
    checkVisibility();

    // --- フッターの年を自動更新するロジック (jQuery) ---
    // 現在の年を取得
    const year = new Date().getFullYear();

    // idが "current-year" の要素を取得
    const $yearElement = $('#current-year');

    // 要素が存在すれば、そのテキストコンテンツを現在の年に設定
    if ($yearElement.length) {
        $yearElement.text(year);
    }

// ページトップ
  var pagetop = $('#pageTop');
  // 最初はボタンを非表示にする
  pagetop.hide();

  // スクロールイベント
  $(window).scroll(function() {
    // 100pxスクロールしたらボタンを表示、それ以外は非表示
    if ($(this).scrollTop() > 100) {
      pagetop.fadeIn(); // ゆっくり表示
    } else {
      pagetop.fadeOut(); // ゆっくり非表示
    }
  });

  // クリックイベント
  pagetop.click(function() {
    // ページトップへスムーズにスクロール
    $('body,html').animate({
      scrollTop: 0
    }, 500); // 500ミリ秒かけてスクロール
    return false; // ハッシュがURLに追加されるのを防ぐ
  });

});


// モーダル
$(document).ready(function() {
    // モーダル要素を取得
    var $modal = $("#myModal");
    var $modalImg = $("#img01");
    var $captionText = $("#caption");

    // サムネイルがクリックされたときの処理
    $(".thumbnail").on("click", function() {
        $modal.css("display", "block"); // モーダルを表示
        $modalImg.attr("src", $(this).attr("src")); // クリックされた画像のsrcを設定
        $captionText.html($(this).attr("alt")); // クリックされた画像のalt属性をキャプションに設定
    });

    // 閉じるボタンがクリックされたときの処理
    $(".close").on("click", function() {
        $modal.css("display", "none"); // モーダルを非表示
    });

    // モーダルの外側がクリックされたときの処理
    $(window).on("click", function(event) {
        if ($(event.target).is($modal)) { // クリックされた要素がモーダル自体であるか確認
            $modal.css("display", "none"); // モーダルを非表示
        }
    });
});