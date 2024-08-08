const formRef = document.querySelector('.form');

export function getImg() {
  const API_KEY = '42059071-0978dc0d7158b742eee7c30f5';
  const BASE_URL = 'https://pixabay.com/api/';
  const query = formRef.elements.input.value;
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true,`;

  fetch(url)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .then(data => {
      if (data.hits.length === 0 || query === '') {
        iziToast.error({
          title: '',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'bottomLeft',
          maxWidth: 360,
        });
      }
    });
}
