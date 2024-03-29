
const button = document.getElementById('submitButton');
const dataContainer = document.getElementById('dataContainer');

button.addEventListener('click', fetchData);

function fetchData() {
    const searchTerm = document.getElementById('searchInput').value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
         .then(response => response.json())
         .then(data => {
            let outputHTML = `<h2> ${searchTerm}</h2>`;

            data.forEach(datas => {
            
                datas.meanings.forEach(meaning => {
                    outputHTML += `<h3>${meaning.partOfSpeech}</h3>`;

                    meaning.definitions.forEach(definition => {
                        outputHTML += `<p> ${definition.definition}</p>`;
                        if (definition.example) {
                            outputHTML += `<p>${definition.example}</p>`;
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

