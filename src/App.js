import mountain from '../src/assets/img/mountain.jpg'
import laptop from '../src/assets/img/laptop.png'
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


function App() {

  const [ videos, setVideos ] = useState(null);
  const [ search , setSearch ] = useState()
  
  const makeRequest = async () => {
    const baseURL = 'https://www.googleapis.com/youtube/v3/search';
    const params = new URLSearchParams({
      part:'snippet',
      maxResults: 12,
      type: 'video',
      key: 'AIzaSyDwsRdF1ZlTLa1XeElC1JARbl57iCP-seg',
      q: search
    })
    const response = await fetch(`${baseURL}?${params}`);
    const videos = await response.json();
    console.log('hey', videos);
    setVideos(videos.items);
  }

  const handelChange = (e) => {
    setSearch(e.target.value)
    console.log("busqueda", e.target.value)
  }

  const handelFormSubmit = (e) => {
    e.preventDefault()
    console.log('nuevos resultados', search)
    makeRequest()
  }

  useEffect(() => {
    makeRequest();
  }, []);

  return (
    <div>
      <main>
        <nav className="App-nav">
          <section className="nav-logo">
            <img src={logo} className="App-logo" alt="logo" />
          </section>
          <section className="nav-profile">
            <p>Work</p>
            <p>About Us</p>
            <p>Contact</p>
          </section>
        </nav>
      </main>
      <header>
        <section className="header-primary">
            <img src={mountain} className="background-image" alt="montaña"/>
            <h1>Sed do eiusmod <span>tempor incididunt</span></h1>
            <p>Sed do eiusmod tempor incididunt</p>
        </section>
        <section>
          <div className="header-cover-image">
            <img src={laptop} className="cover-image" alt="Computadora"/>
          </div>
          <div className="secondary-header">
            <h2>Lorem ipsum dolor</h2>
            <p className="p-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt sequi ipsam necessitatibus nostrum cupiditate totam magni iure nihil provident? Illo voluptatem deleniti laboriosam, nam modi perspiciatis maiores itaque quod quaerat Nostrum aperiam quaerat maxime, magnam dolores obcaecati, ipsum alias provident ducimus earum natus nulla sapiente? Velit, accusantium odit dignissimos corporis magnam excepturi explicabo ea, iste error vitae unde architecto ullam.</p>
            <form onSubmit={handelFormSubmit}>
              <input 
                type='search' 
                placeholder="Search" 
                className="search-input" 
                value={search} 
                onInput={handelChange}
              />
            </form>
            <div>
              <ul className="video-result">
                  {videos?.map ((video) => {
                    console.log('video', video)
                    const { id, snippet = {} } = video;
                    const { title, thumbnails = {}, } = snippet;
                    const { medium = {} } = thumbnails;
                    return (
                      <li key={id.videoId}>
                        <a href={`https://www.youtube.com/watch?v=${id.videoId}`}>
                          <p>
                            <img width={medium.width } height={medium.height} src={medium.url} alt=''/>
                          </p>
                          <h4>{ title }</h4>
                        </a>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>
        </section>
      </header>
      <footer>
        <img src={mountain} className="footer-image" alt="montaña"/>
        <p>Contact Us</p>
        <h3>contact@ideaware.co</h3>
      </footer>
    </div>
  );
}

export default App;
