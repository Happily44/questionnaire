document.getElementById("feedback-form").addEventListener("submit", function(event) {
    event.preventDefault(); // デフォルトの送信動作をキャンセル

    // フォームデータを収集
    const formData = new FormData(event.target);

    // フォームデータをオブジェクトに変換
    const data = {
        raview: formData.get("selectedRatingText"),
        comments: formData.get("comments")
    };

    // Google Apps ScriptのWebアプリURLにデータをPOST
    fetch("https://script.google.com/macros/s/AKfycbyGFV9XJ-TZbgToL5L0R92_i_RA0focZj0N8BGnNMMqDGsgqOfEjvlZmEnlHNyEZ9r1rg/exec", {
        method: "POST",
        body: new URLSearchParams(data)
    })
    if (data.status === "success") {
        // 送信成功時にThank Youメッセージを表示
        document.getElementById("feedback-form").style.display = "none"; // フォームを非表示
        document.getElementById("thankYouMessage").style.display = "block"; // Thank Youメッセージを表示
        
        // ローカルストレージから評価を削除
        localStorage.removeItem('selectedRatingText');
        
        // 必要に応じて数秒後に自動でウィンドウを閉じる
        setTimeout(() => {
            window.close();
        }, 3000); // 3秒後に閉じる
    } else {
        alert("送信に失敗しました。もう一度お試しください。");
    }
})
.catch(error => {
    console.error("送信エラー:", error); 
    alert("送信中にエラーが発生しました: " + error);
});
