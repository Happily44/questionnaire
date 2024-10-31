function openInGoogleMapsApp() {
    const googleMapsAppURL = "https://g.page/r/CcwSNU3G9-lMEAE/review"; // Googleマップアプリ専用スキーム
    const googleMapsURL = "https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJBWueYZaPQTURzBI1Tcb36Uw"; // Web版GoogleマップのURL
    const chromeURL = "googlechrome://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJBWueYZaPQTURzBI1Tcb36Uw"; // Chromeで開くURLスキーム

    // Googleマップアプリを最初に試みる
    window.location.href = googleMapsAppURL;

    // アプリがインストールされていない場合は、Chromeで開く
    setTimeout(() => {
        if (navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")) {
            // Safariの場合はChromeでの開きを試みる
            window.location.href = chromeURL;
        } else {
            // Safari以外、またはChromeがない場合は通常のURLを開く
            window.location.href = googleMapsURL;
        }
    }, 500);
}

function handleNext() {
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    
    if (selectedRating) {
        const selectedRatingValue = selectedRating.value;
        const ratingText = selectedRating.parentElement.textContent.trim();
        
        // 評価をローカルストレージに保存
        localStorage.setItem('selectedRatingText', ratingText);
        
        // アンケートセクションを非表示
        document.getElementById('surveySection').style.display = 'none';

        if (selectedRatingValue === "5" || selectedRatingValue === "4") {
            // 満足以上の場合はGoogleマップ案内画面に遷移
            document.getElementById('googleMapSection').style.display = 'block';
            setTimeout(openInGoogleMapsApp, 3000); // 3秒後にGoogleマップを開く
        } else {
            // それ以外の評価ではコメント入力画面に遷移
            window.location.href = "feedback-form.html"; // コメントページのURL
        }
    } else {
        alert('評価を選択してください。');
    }
}
