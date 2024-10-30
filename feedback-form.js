document.getElementById("feedback-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    // localStorageから評価データを取得
    const selectedRatingText = localStorage.getItem('selectedRatingText');
    console.log("Selected Rating Text:", selectedRatingText); // デバッグ用

    const data = {
        review: selectedRatingText, // された評価
        comments: formData.get("comments") // コメント
    };

    fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
        method: "POST",
        body: new URLSearchParams(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            document.getElementById("feedback-form").style.display = "none";
            document.getElementById("thankYouMessage").style.display = "block";
            localStorage.removeItem('selectedRatingText');
            setTimeout(() => {
                window.close();
            }, 3000);
        } else {
            alert("送信に失敗しました。もう一度お試しください。");
        }
    })
    .catch(error => {
        console.error("送信エラー:", error); 
        alert("送信中にエラーが発生しました: " + error);
    });
});
