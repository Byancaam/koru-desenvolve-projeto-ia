const apiKeyInput = document.getElementById('apiKeyInput');
const questionInput = document.getElementById('questionInput');
const answerElement = document.getElementById('answerText');
const askButton = document.getElementById('askButton');

askButton.addEventListener('click', function () {
  if (!apiKeyInput.value) {
    alert('Por favor, insira sua Api key?');
    return;
  }

  if (!questionInput.value) {
    alert('Por favor, insira a sua pergunta!');
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

      // console.log('Data: ', data);

      answerElement.textContent =
        data.choices?.[0]?.message?.content || 'Sem resposta.';
      answerElement.parentElement.hidden = false;
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao consultar a IA.');
    } finally {
      askButton.disabled = false;
      askButton.textContent = 'Perguntar';
    }
  })();
});
