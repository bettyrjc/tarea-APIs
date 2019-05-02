// PLAYLIST DE AMIGOS

(async function cargar() {

  async function datosAmigos(url){

    const responde = await fetch(url);
    const data = await responde.json();
    return data;
  }
  function templateItems(results){
    return(
        `
        <li class="playlistFriends-item">
        <a href="#">
        <img src="${results.picture.thumbnail}" />
        <span>
        ${results.name.first} ${results.name.last}
        </span>
        </li>
        `
    )
  }
  const $itemPlay = document.querySelector('.playlistFriends')
  const randomUsername = await datosAmigos('https://randomuser.me/api/?results=10');
  randomUsername.results.forEach( (result)=>{
    const HTMLString = templateItems(result);
    const html =document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    $itemPlay.append(html.body.children[0])
    $itemPlay.style.display = 'block'
    $itemPlay.style.fontSize = '20px'

  })
  // console.log(randomUsername);

})()



// FIN DE PLAYLIST DE AMIGOS
// HOME
console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}
const getUser= new Promise(function(todoBien, todoMal)
{
  // llamar un adipisicing
  setTimeout(function(){
    // luego del tiempo de 1000
    todoBien('jolo')
  }, 1000)
})
const getUserAll= new Promise(function(todoBien, todoMal)
{
  // llamar un adipisicing
  setTimeout(function(){
    // luego del tiempo de 1000
    todoBien('hola')
  }, 5000)
})

Promise.race([
 getUser,
 getUserAll
])
.then(function(parametro) {
 console.log(parametro)
})
.catch(function(parametro){
 console.log(parametro)
});


$.ajax('https://randomuser.me/api/sdfdsfdsfs', {
  method: 'GET',
  success: function(data) {
    console.log(data)
  },
  error: function(error) {
    console.log(error)
  }
});


fetch('https://randomuser.me/api/55845hh')
  .then(function (response) {
    // console.log(response)
    return response.json()
  })
  .then(function (user) {
    console.log('user', user.results[0].name.first)
  })
  .catch(function() {
    console.log('algo fallÃ³')
  });

(async function load(){
  async function getData(url){
    const response = await fetch(url)
    const data = await response.json()
    // debugger
    if (data.data.movie_count >0){
    return data;
  }
  // si no hay pelis aqui continua
  throw new Error('No se encontró ningun resultado');
  }
  const $form = document.querySelector('#form');
  const $home = document.querySelector('#home')
  const $featuringContainer = document.querySelector('#featuring')

function setAttributes($element, attributes){
    for (const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute]);

    }
}
const BASE_API = 'https://yts.am/api/v2/';
function featuringTemplate(peli) {
  return (
    `
    <div class="featuring">
      <div class="featuring-image">
        <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
      </div>
      <div class="featuring-content">
        <p class="featuring-title">Pelicula encontrada</p>
        <p class="featuring-album">${peli.title}</p>
      </div>
    </div>
    `
  )
}
// aparezaca el loader cuando busco alg e la parte de abajo
  $form.addEventListener('submit', async(event)=>{
    event.preventDefault();
     $home.classList.add('search-active')
     const $loader = document.createElement('img');
     setAttributes($loader, {src: 'src/images/loader.webp',
                            height:50,
                            width:50,})
      $featuringContainer.append($loader);

      const data = new FormData($form);
      try{
        const {
          data:{
            movies: pelis
          }
        } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
        // debugger
        const HTMLString = featuringTemplate(pelis[0]);
        $featuringContainer.innerHTML = HTMLString
      }catch(error)
      {
        // debugger
        alert(error.message);
        $loader.remove();
        $home.classList.remove('search-active')
      }
  });


  function videoItemTemplate(movie, category) { //ecma6
    return(
        `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category=${category}>
          <div class="primaryPlaylistItem-image">
            <img src="${movie.medium_cover_image}">
          </div>
          <h4 class="primaryPlaylistItem-title">
            ${movie.title}
          </h4>
        </div>`
    )
  }
  function createTemplate( HTMLString){
    const html =  document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString; //imprimira todo en el html propio
    return html.body.children[0]; //para que se muestre en el navegador
  }
  function addEventClick($element) {
    // const $element = document.getElementById('')
    $element.addEventListener('click', ()=>
    {
      showModal($element);
    });
  }
  function createTemplate(HTMLString) {
      const html = document.implementation.createHTMLDocument();
      html.body.innerHTML = HTMLString;
      return html.body.children[0];
    }

    function renderMovieList(list, $container, category) {
      $container.children[0].remove();
      list.forEach((movie) => {
        const HTMLString = videoItemTemplate(movie, category);
        const movieElement = createTemplate(HTMLString);
        $container.append(movieElement);
        const image = movieElement.querySelector('img')
        image.addEventListener('load', (event) =>{
          event.srcElement.classList.add('fadeIn')
        })
        addEventClick(movieElement);
      });
    }
  async  function cacheExist(category){
    const listName = `${category}list`
    const cacheList = window.localStorage.getItem(listName);
    // null  es false
    // {} [] "" true
    if (cacheList){
      return JSON.parse(cacheList);
    }
      const {data: {movies: data}} = await getData(`${BASE_API}list_movies.json?genre=${category}`)
      window.localStorage.setItem('listName', JSON.stringify(data))
      return data;
    }

  // const {data: {movies: actionList}} = await getData(`${BASE_API}list_movies.json?genre=action`);
  // window.localStorage.setItem('animationList', JSON.stringify(animationList))
  // window.localStorage.setItem('actionList', JSON.stringify(actionList) )
  // window.localStorage.setItem('dramaList', JSON.stringify(dramaList))
  const  actionList = await cacheExist('action');
  const $actionContainer = document.getElementById('action');
  renderMovieList(actionList, $actionContainer, 'action');

  const dramaList = await cacheExist('drama');
  const $dramaContainer = document.getElementById('drama');
  renderMovieList(dramaList, $dramaContainer, 'drama');
  console.log(dramaList)
  const animationList = await cacheExist('animation');
  const $animationContainer = document.getElementById('animation');
  renderMovieList(animationList, $animationContainer,'animation');


const $modal = document.getElementById('modal');
const $overlay = document.getElementById('overlay');
const $hideModal = document.getElementById('hide-modal');

 const $modalTitle = $modal.querySelector('h1')
 const $modalImage = $modal.querySelector('img')
 const $modalDescription = $modal.querySelector('p')

function findById(list, id){
  return list.find(movie => movie.id === parseInt(id, 10))
}

function findMovie(id, category){
  switch (category) {
    case  'action' : {
      return findById(actionList, id)
    }
    case 'drama' :
    {
      return findById(dramaList, id)
    }
    default : {
      return findById(animationList, id)
    }
  }
}

function showModal($element){
  $overlay.classList.add('active');
  $modal.style.animation='modalIn .8s forwards';

  const id = $element.dataset.id;
  const category = $element.dataset.category;
  const data = findMovie(id, category);

  $modalTitle.textContent = data.title;
  $modalImage.setAttribute('src', data.medium_cover_image);
  $modalDescription.textContent = data.description_full
}

$hideModal.addEventListener('click', hideModal);

function hideModal() {
  $overlay.classList.remove('active');
  $modal.style.animation='modalOut .8s forwards';
}
// console.log(videoItemTemplate('images/covers/bitcoin.jpg', 'bicoint'))

})()

// api de playlistFriends
// $.ajax({
  //   url: 'https://randomuser.me/api/',
  //   // dataType: 'json',
  //   method: 'GET',
  //   success: function(data) {
    //     console.log(data);
    //   }
    // });
