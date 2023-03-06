const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')
const searchedSection = document.getElementById('search-section')
const afterSearchSection = document.getElementById('after-search')
const mainH1 = document.getElementById('start-exploring-text')
let movieIdsArray = []
let watchlistMovieIds = []
let watchlistIds = []
let movieToremove


if (searchBtn) {
searchBtn.addEventListener('click', renderMovies )} 
else {watchlistIds = JSON.parse(localStorage.getItem('watchlist-storage'))
            getWatchlistHtml()
    
    }




            


function renderMovies() {
    
    
    
    
    if (searchInput.value) {
    movieIdsArray = []
    afterSearchSection.innerHTML = ''
    searchedSection.style.display = "none"


    fetch(`https://www.omdbapi.com/?s=${searchInput.value}&apikey=db11493d`)
        .then(res => res.json())
        .then(data => { if (data.Search) {
            data.Search.filter((movie) => {
                movieIdsArray.push(movie.imdbID)   
                
            })
            searchMovies(movieIdsArray)
        } else {
            searchedSection.style.display = "flex"
            mainH1.textContent = 'MOVIE CAN NOT BE FOUND'
            mainH1.style.color = 'black'
            mainH1.style.fontSize = '40px'
        }
        })
    }
        searchInput.value = ''
        
}

function searchMovies(array) {
    array.forEach((item) => {
        afterSearchSection.innerHTML = ''
        fetch(`https://www.omdbapi.com/?i=${item}&apikey=db11493d`)
            .then(res => res.json())
            .then(data => {
                
                    getMovieHtml(data)
           
        })

    })
            
}



function getMovieHtml(item) {

    afterSearchSection.innerHTML += `
            <div class="movie-container">
                        <img src="${item.Poster}"> 
                        <h2 class="movie-title" >${item.Title}</h2>
                        <div class="movie-description1">
                            <p class="duration">${item.Genre}</p>
                            <button  id="add-btn">+</button>
                            <p id="watchlist-p">watchlist</p>
                        </div>
                        <div class="movie-description2">
                            <p class="plot">${item.Plot}</p>
                        </div>
                    </div>
            ` 
            

        const btnTexts = document.querySelectorAll("#watchlist-p")
        const addBtns = document.querySelectorAll('#add-btn')
        addBtns.forEach((button, index) =>{
            button.style.cursor = "pointer"
            button.addEventListener('click', () => {
                watchlistMovieIds.push(movieIdsArray[index])
                localStorage.setItem('watchlist-storage', JSON.stringify(watchlistMovieIds))
                console.log(localStorage)
                addBtns[index].style.background = "green"
                addBtns[index].textContent = "-"
                addBtns[index].disabled = true
                btnTexts[index].textContent = "added to watchlist"
            })
        })
}

        
           
        
    


    


 
function getWatchlistHtml() {
    if (!watchlistIds.length) {
    document.getElementById('watchlist-search-section').style.display = "flex"
    }
    for(let i = 0; i < watchlistIds.length; i++) {
        fetch(`https://www.omdbapi.com/?i=${watchlistIds[i]}&apikey=db11493d`)
                    .then(res => res.json())
                    .then(item => {
                            document.getElementById('watchlist-search-section').style.display = "none"
                            document.getElementById('watchlist-section').innerHTML += `
                    <div class="movie-container">
                                <img src="${item.Poster}"> 
                                <h2 class="movie-title" >${item.Title}</h2>
                                <div class="movie-description1">
                                    <p class="duration">${item.Genre}</p>
                                    <button  id="add-btn">-</button>
                                    <p id="watchlist-p">remove</p>
                                </div>
                                <div class="movie-description2">
                                    <p class="plot">${item.Plot}</p>
                                </div>
                            </div>

                        ` 

                       const btns = document.querySelectorAll('#add-btn')
                        btns.forEach((button,index) => {
                            console.log
                            button.style.cursor = "pointer"
                            button.addEventListener('click', ()=>{
                                if(watchlistIds.length) {
                                 movieToremove = item.imdbID
                                    watchlistIds.splice(index, 1)
                                    localStorage.clear()
                                    localStorage.setItem('watchlist-storage', JSON.stringify(watchlistIds))
                                    document.getElementById('watchlist-section').innerHTML = ''
                                    getWatchlistHtml()
                                    console.log(watchlistIds, index)} else {
                                        console.log("empty")
                                    }
                                })

                            })
                        })
    }
}