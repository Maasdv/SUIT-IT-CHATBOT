async function send() {
    const input = document.getElementById("question");
    const chat = document.getElementById("chat");
    const text = input.value;

    if (!text) return;

    chat.innerHTML += `<div class="user"><div class="bubble">${text}</div></div>`;
    input.value = "";

    const response = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text })
    });

    const data = await response.json();
    chat.innerHTML += `<div class="bot"><div class="bubble">${data.answer}</div></div>`;
    chat.scrollTop = chat.scrollHeight;
}
