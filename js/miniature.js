const picturesListElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

export const createMiniature = (pictures) => {
  pictures.forEach(({id, url, likes, comments}) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.dataset.id = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    picturesFragment.append(pictureElement);

    picturesFragment.append(pictureElement);
  });
  picturesListElement.append(picturesFragment);
};
