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
            // 満足以上の場合はGoogleマップ案内画面に遷移し、ボタンを表示
            document.getElementById('googleMapSection').style.display = 'block';
        } else {
            // それ以外の評価ではコメント入力画面に遷移
            window.location.href = "/feedback-form.html"; // コメントページのURL
        }
    } else {
        alert('評価を選択してください。');
    }
}


function openInGoogleMapsApp() {
    const placeID = "ChIJBWueYZaPQTURzBI1Tcb36Uw"; // Place IDを設定
    const googleMapsAppURL = `comgooglemaps://?q=place_id:${placeID}`; // Googleマップアプリ用URL
    const googleMapsReviewURL = `https://search.google.com/local/writereview?placeid=${placeID}`; // Web版レビュー投稿URL
    const chromeURL = `googlechrome://search.google.com/local/writereview?placeid=${placeID}`; // Chromeスキーム

    // Googleマップアプリ専用のスキームで開く
    window.location.href = googleMapsAppURL;

    // アプリがインストールされていない場合にChromeやWeb版にフォールバック
    setTimeout(() => {
        if (navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")) {
            window.location.href = chromeURL; // Safariの場合はChromeを試みる
        } else {
            window.location.href = googleMapsReviewURL; // Safari以外またはChromeがない場合は通常のWeb版URL
        }
    }, 500);
}
