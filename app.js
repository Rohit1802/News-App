// API_KEY = 0e6500cf660448cea6c49b7eb627648c

const API_KEY = "0e6500cf660448cea6c49b7eb627648c"
const url = "https://newsapi.org/v2/everything?q="



window.addEventListener('load', ()=>{
    fetchNews("India")
})

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json()
    bindData(data.articles);
}

function bindData(articles){
     const cardsContainer = document.getElementById("cards-container")
     const newsCardTemplate = document.getElementById("template-news-card")

     cardsContainer.innerHTML = "";

     articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article)
        cardsContainer.appendChild(cardClone)
     });
}

function fillDataInCard(cardClone , article){
    const newsImg = cardClone.getElementById("news-img")
    const newsTitle = cardClone.getElementById("news-title")
    const newsSource = cardClone.getElementById("news-source")
    const newsDesc = cardClone.getElementById("news-desc")

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsSource.innerHTML = article.source;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    })

    newsSource.innerHTML  = `${article.source.name} . ${date}`

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank")
    })
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id)
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active')
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active")
}

const searchButton = document.getElementById('search-button')
const searchText = document.getElementById('news-input')

searchButton.addEventListener("click", ()=>{
    const query = searchText.value;
    if(!query) return ;
    fetchNews(query)
    curSelectedNav?.classList.remove("active")
    curSelectedNav = null;
})

function reload(){
    window.location.reload()
}