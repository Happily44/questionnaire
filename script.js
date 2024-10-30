function handleNext() {
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    
    if (selectedRating) {
        const selectedRatingValue = selectedRating.value;
        const ratingText = selectedRating.parentElement.textContent.trim();
        
        // 選択した評価をローカルストレージに保存
        localStorage.setItem('selectedRatingText', ratingText);
        
        // アンケートセクションを非表示
        document.getElementById('surveySection').style.display = 'none';

        if (selectedRatingValue === "5" || selectedRatingValue === "4") {
            // 満足以上の場合はGoogleマップ案内画面に遷移
            document.getElementById('googleMapSection').style.display = 'block';
            setTimeout(redirectToGoogle, 3000);
        } else {
            // それ以外の評価ではコメント入力画面に遷移
            window.location.href = "http://127.0.0.1:5500/feedback-form.html"; // コメントページのURL
        }
    } else {
        alert('評価を選択してください。');
    }
}

function redirectToGoogle() {
    window.location.href = 'https://g.page/r/CcwSNU3G9-lMEAE/review';
}
