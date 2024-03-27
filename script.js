const button = document.getElementById('submitButton');
const dataContainer = document.getElementById('dataContainer');

button.addEventListener('click', fetchData);

function fetchData() {
    const searchTerm = document.getElementById('searchInput').value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            let outputHTML = '';

            data.forEach(entry => {
                const meanings = entry.meanings;

                meanings.forEach(meaning => {
                    const partOfSpeech = meaning.partOfSpeech;
                    const definitions = meaning.definitions;

                    definitions.forEach(definition => {
                        const verb = definition.definition;
                        const example = definition.example;

                        let speechLabel = '';
                        if (partOfSpeech === 'noun' || partOfSpeech === 'verb') {
                            if (partOfSpeech === 'noun') {
                                speechLabel = 'Noun';
                            } else if (partOfSpeech === 'verb') {
                                speechLabel = 'Verb';
                            }

                            outputHTML += `
                                <p>${speechLabel}: ${verb}</p>
                                ${example ? `<p>Example: ${example}</p>` : ''}
                            `;
                        }
                    });
                });
            });

            dataContainer.innerHTML = outputHTML;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
