// ページの読み込み時にlocalStorageからデータを取得して確認
document.addEventListener('DOMContentLoaded', () => {
    const selectedRatingText = localStorage.getItem('selectedRatingText');
    console.log("Selected Rating Text on Page Load:", selectedRatingText);
});


// フォームの送信処理
document.getElementById("feedback-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    // localStorageから評価データを取得
    const selectedRatingText = localStorage.getItem('selectedRatingText');
    console.log("Selected Rating Text:", selectedRatingText); // デバッグ用

    const data = {
        review: selectedRatingText ? selectedRatingText : "未評価", // された評価。未評価の場合はデフォルト値を設定
        comments: formData.get("comments") // コメント
    };

    fetch("https://script.google.com/macros/s/AKfycbxPcLyQ93n1zGxGW_LkmLyfHF4n7qWlgIi4xMTpC7IRJ1DbDo3up9FE49W43dE86Ppeuw/exec", {
        method: "POST",
        body: new URLSearchParams(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            document.getElementById("feedback-form").style.display = "none";
            document.getElementById("thankYouMessage").style.display = "block";
            localStorage.removeItem('selectedRatingText'); // データ送信後にローカルストレージをクリア
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
