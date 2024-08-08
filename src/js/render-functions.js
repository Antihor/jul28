export function renderImg() {
  const markup = data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a href="${largeImageURL}"
      ><li>
        <img src="${webformatURL}" alt="${tags}" />
        <p>Likes: ${likes}</p>
        <p>Views: ${views}</p>
        <p>Comments: ${comments}</p>
        <p>Downloads: ${downloads}</p></li
    ></a>`;
      }
    )
    .join('');
  galRef.insertAdjacentHTML('beforeend', markup);
}
