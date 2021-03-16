
// const apiKey = '4dbc17e007ab436fb66416009dfb59a8';
// const apiKey = '7878eaa2b917400fbc0b81e516b55e6b';
// const apiKey = '295c6b46f60d41d18d38545d6281f15f';
const apiKey = '279ea6339b4c42cb99b8d3f02219d9d7';

const conteiner = document.getElementById('conteiner');

const buttonHideNews = document.getElementById('button-hide');

const messageCount= document.getElementsByClassName('messageCount')

const data = new Date();

const fixedDate = `${data.getDate()}.${data.getMonth() + 1}.${data.getFullYear()}`;

const showMessage = (id) => {
  const notReadedMessage = document.getElementById(id).innerHTML
  console.log(notReadedMessage)
}

const readMessage = (id) => {
    const statusText = document.getElementById(id)
    statusText.classList.add('status__text-active');
    document.getElementById(id).innerHTML = 'Readed'
    const messageCount = document.getElementById('messageCount').innerHTML
    document.getElementById('messageCount').innerHTML = messageCount - 1
    statusText.removeAttribute('onclick')
    if(messageCount - 1 === 0){
      document.getElementById('block-message').innerHTML = ''
    }
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
  articles.map((dataFields, index) => {
      content += 
      ` 
        <div class="news-block">
          <div class="img-block">
            <img src="${dataFields.urlToImage}" class="img" />
          </div>
          <div class="text-block">
            <p><b id="">Title:</b> ${dataFields.title}</p>
            <p><b>Author:</b> ${dataFields.author}</p>
            <div><b>Details: </b><a href="${dataFields.url}">ShowDetails</a></div>
            <p><b>Date:</b> ${fixedDate}</p>
            <div class="status">
              <b>Status:</b>
              <p id="${index}" class="status__text" onclick="readMessage('${index}')">Not Readed!</p>
            </div>
          </div>
        </div>

      `;
      messageContent =
      `
        <div class="message"><b class="messageCount" id="messageCount" onclick="showMessage()">${articles.length}</b></div>

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


