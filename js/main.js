$(document).ready(() => {
    window.addEventListener('resize', updateMaxVH);

    ['.event_banner', '.event_gnb_menu'].forEach(ele => $(ele).on('click', () => {
        $('.event_banner').toggleClass('-open');
    }));

    $('.event_gnb_gamestart').on('click', () => {
        window.open("https://galaxy.beanfun.com/webapi/view/login/twp?redirect_url=https://warsofprasia.beanfun.com/Main", "_blank");
    });

    $('.btn_up').on('click', () => {
        window.open("https://warsofprasia-event.beanfun.com/EventAD/EventAD?eventAdId=14398", "_blank");
    });

    $('.btn_down').on('click', () => {
        window.open("https://www.youtube.com/@user-warsofprasia", "_blank");
    });

    $('.btn_left').on('click', () => {
        if (!$('.agreement input')[0].checked) {
            $('#modalMessage').text("請勾選相關隱私權政策。");
            $('#customModal').show();
            return;
        }

        const check = validatePhone();
        if (!check.valid) {
            $('#modalMessage').text("手機號碼格式錯誤。");
            $('#customModal').show();
            return;
        }

        const phoneData = getDbPhoneNumber(); // 帶到後端的資料 國碼 與 號碼

        // TODO: 這裡呼叫 AJAX 送到後端即可
        /*$.ajax({
            url: "/api/savePhone",   // 你的後端 API 位址
            type: "POST",            // 使用 POST 方法
            data: JSON.stringify({
                countryCode: $("#countryCode").val(),
                phoneNumber: $("#phoneNumber").val()
            }),
            contentType: "application/json; charset=UTF-8", // 傳 JSON 給後端
            dataType: "json",        // 後端回傳的格式 (常見是 JSON)
            success: function (response) {
                // 輸入正確格式的手機號碼 要顯示下面的訊息
                // $("#modalMessage").html("恭喜您成功完成預約！<br>孵化世界 x 免費鑽石 x 三重傳說<br>9/30 (二) 等你來探索！"); 
            },
            error: function (xhr, status, error) {
                // 輸入錯誤格式的手機號碼
                // $('#modalMessage').text("手機號碼格式錯誤。");

                // 已預約過的號碼 要顯示下面的訊息 xx的部分請從後端取相關資料回前台顯示
                // $('#modalMessage').text("您已於xx月xx日成功完成預約。");
            }
        }); */
    });

    $('.btn_left_down').on('click', () => {
        window.open("https://tw.hicdn.beanfun.com/beanfun/promo/TWP/20250916K/index.html?redirect=1", "_blank");
    });

    $('.detail').on('click', () => {
        window.open("https://tw.hicdn.beanfun.com/beanfun/promo/TWP/20250916K/index.html", "_blank");
    });

    $('.privacyPolicy').on('click', (e) => {
        e.preventDefault();
        window.open("https://warsofprasia-event.beanfun.com/EventAD/EventAD?eventAdId=10199", "_blank");
    });

    $('#modalConfirm').on('click', () => {
        $('#customModal').hide();
    });


    if ($(window).width() > 1100) {
        $('.event_gnb').addClass('type_clear');
        $('.event_gnb').removeClass('type_default');
    } else {
        $('.event_gnb').removeClass('type_clear');
        $('.event_gnb').addClass('type_default');
    }

    function updateMaxVH() {
        if ($(window).width() > 1100) {
            $('.event_gnb').addClass('type_clear');
            $('.event_gnb').removeClass('type_default');
        } else {
            $('.event_gnb').removeClass('type_clear');
            $('.event_gnb').addClass('type_default');
        }
    }

    function validatePhone() {
        const $countryCode = $("#countryCode");
        const $phoneNumber = $("#phoneNumber");
        const country = $countryCode.val();
        const number = $phoneNumber.val();

        if (country === "852" || country === "853") {
            // 香港 / 澳門
            if (number.length !== 8) {
                return { valid: false };
            }
        } else if (country === "886") {
            // 台灣
            if (number.length === 9) {
                // ✅ 合法 (e.g. 912345678)
                return { valid: true };
            } else if (number.length === 10) {
                if (number.startsWith("0")) {
                    // ✅ 合法 (e.g. 0912345678)
                    return { valid: true };
                } else {
                    // ❌ 不合法 (10 碼但不是 0 開頭)
                    return { valid: false };
                }
            } else {
                // ❌ 長度不對
                return { valid: false };
            }
        }
        return { valid: true };
    }

    function getDbPhoneNumber() {
        const $countryCode = $("#countryCode");
        const $phoneNumber = $("#phoneNumber");
        const country = $countryCode.val();
        let number = $phoneNumber.val();

        if (country === "886" && number.length === 10 && number.startsWith("0")) {
            number = number.substring(1); // 去掉開頭 0
        }

        return { country, number };
    }
});