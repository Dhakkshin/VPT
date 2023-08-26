const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query === '') return;

    resultsDiv.innerHTML = 'Loading...';

    fetch(`https://openlibrary.org/search.json?q=${query}`)
        .then(response => response.json())
        .then(data => displayResults(data.docs))
        .catch(error => {
            console.error('Error fetching data:', error);
            resultsDiv.innerHTML = 'An error occurred.';
        });
});

function displayResults(docs) {
    resultsDiv.innerHTML = '';

    docs.forEach(doc => {
        const title = doc.title;
        const author = doc.author_name ? doc.author_name.join(', ') : 'Unknown Author';
        const year = doc.first_publish_year || 'N/A';
        const coverId = doc.cover_i;

        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');

        const titleElement = document.createElement('h2');
        titleElement.textContent = title;

        const authorElement = document.createElement('p');
        authorElement.textContent = `Author(s): ${author}`;

        const yearElement = document.createElement('p');
        yearElement.textContent = `Year: ${year}`;

        const coverElement = document.createElement('img');
        if (coverId) {
            coverElement.src = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
            coverElement.alt = `${title} Cover`;
        } else {
            coverElement.src = 'placeholder.jpg'; // You can provide a placeholder image
            coverElement.alt = 'No Cover Available';
        }

        resultDiv.appendChild(titleElement);
        resultDiv.appendChild(authorElement);
        resultDiv.appendChild(yearElement);
        resultDiv.appendChild(coverElement);

        resultsDiv.appendChild(resultDiv);
    });
}
