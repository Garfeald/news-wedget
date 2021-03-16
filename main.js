
// const apiKey = '4dbc17e007ab436fb66416009dfb59a8'; #1
const apiKey = '7878eaa2b917400fbc0b81e516b55e6b'

const conteiner = document.getElementById('conteiner');

const buttonHideNews = document.getElementById('button-hide')

const data = new Date();
let fixedDate = `${data.getDate()}.${data.getMonth() + 1}.${data.getFullYear()}`

let statusCheckbox = document.getElementsByTagName('input')

let statusText = document.getElementById('status__text')


if(statusCheckbox.checked){
		statusCheckbox.classList.add('status__text-active')
	}
  

function showNews() {
  fetch(`https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=${apiKey}`)
    .then((response) => {
      return response.json();
    })
    .then(renderContext);
  conteiner.classList.add('conteiner_active');
  buttonHideNews.classList.add('button-hide_active');
}
  
const renderContext = (response) => {
  const { articles } = response;
  let content = document.getElementById('conteiner').innerHTML
  let messageContent = document.getElementById('block-message').innerHTML
  articles.map((dataFields) => {
      content += 
      ` 
        <div class="news-block">
          <div class="img-block">
            <img src="${dataFields.urlToImage}" class="img" />
          </div>
          <div class="text-block">
            <p><b>Title:</b> ${dataFields.title}</p>
            <p><b>Author:</b> ${dataFields.author}</p>
            <div><b>Details: </b><a href="${dataFields.url}">ShowDetails</a></div>
            <p><b>Date:</b> ${fixedDate}</p>
            <div class="status" >
              <b>Status:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="checkbox" id="status">
              <p class="status__text" id="status__text">не прочитано</p>
            </div>
          </div>
        </div>

      `;
      messageContent =
      `
        <div class="message"><b class="messageCount" >${articles.length}!!!</b></div>

      `
      document.getElementById('block-message').innerHTML = messageContent;
      console.log(articles)
  })
  document.getElementById('conteiner').innerHTML = content;
}

const hideNews = () => {
  document.getElementById('conteiner').innerHTML = '';
  buttonHideNews.classList.remove('button-hide_active');
  conteiner.classList.remove('conteiner_active');
}


