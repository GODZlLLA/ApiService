import ApiService from './api-service';

const API_PATH = '/sample.json';
const submit = document.querySelector('button[type=submit]') as HTMLButtonElement;
let searchCount = 1;

submit.addEventListener('click', async (e) => {
  e.preventDefault();

  // 再検索を確認するために一定を超えたら1にもどす
  if (searchCount > 5) {
    searchCount = 1;
  }

  // 再検索が阻止されているかはデベロッパーツールで確認する
  const response = await ApiService.fetch({
    path: API_PATH,
    option: {
      params: {
        key: searchCount
      }
    },
  });

  console.log(response, 'key=' + searchCount);

  searchCount++;
});