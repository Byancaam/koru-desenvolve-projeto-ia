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

  setTimeout(function () {
    askButton.disabled = false;
    askButton.textContent = 'Perguntar';
  }, 2000);

  console.log('Pronto para fazer a requisição');
});
