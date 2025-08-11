const apiKeyInput = document.getElementById('apiKeyInput');
const questionInput = document.getElementById('questionInput');
const answerElement = document.getElementById('answerText');
const askButton = document.getElementById('askButton');
const errorMessage = document.getElementById('errorMessage');

askButton.addEventListener('click', function () {
  errorMessage.hidden = true;
  errorMessage.textContent = '';
  answerElement.parentElement.hidden = true;

  if (!apiKeyInput.value) {
    errorMessage.textContent = 'Por favor, insira sua API Key.';
    errorMessage.hidden = false;
    return;
  }

  if (!questionInput.value) {
    errorMessage.textContent = 'Por favor, insira a sua pergunta.';
    errorMessage.hidden = false;
    return;
  }

  // Loading
  askButton.disabled = true;
  askButton.textContent = 'Carregando ...';

  // Requisição a API do chatGPT

  (async function () {
    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKeyInput.value}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: questionInput.value }],
            max_tokens: 100,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        errorMessage.textContent = data.error?.message || 'Erro desconhecido.';
        errorMessage.hidden = false;
        return;
      }

      answerElement.textContent =
        data.choices?.[0]?.message?.content || 'Sem resposta.';
      answerElement.parentElement.hidden = false;
    } catch (error) {
      console.error(error);
      errorMessage.textContent = 'Ocorreu um erro ao consultar a IA.';
      errorMessage.hidden = false;
    } finally {
      askButton.disabled = false;
      askButton.textContent = 'Perguntar';
    }
  })();
});
