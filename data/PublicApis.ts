import { PublicApi } from '@/models/PublicApi';

export const publicApis: PublicApi[] = [
  new PublicApi("https://api.fbi.gov/wanted/v1/list", "FBI Wanted List", "List of wanted criminals.", "Government"),
  new PublicApi("https://api.artic.edu/api/v1/artworks", "Art Institute of Chicago", "Art collections access.", "Art"),
  new PublicApi("https://fakerapi.it/api/v2/addresses", "Faker API Addresses", "Generates fake addresses.", "Mock Data"),
  new PublicApi("https://www.refugerestrooms.org/api/v1/restrooms/", "REFUGE Restrooms", "Inclusive restroom locations.", "Public"),
  new PublicApi("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json", "NHTSA Vehicle Makes", "Vehicle makes data.", "Transportation"),
  new PublicApi("https://cat-fact.herokuapp.com/facts", "Cat Facts", "Random cat facts.", "Animals"),
  new PublicApi("https://dog.ceo/api/breeds/image/random", "Random Dog Image", "Random dog images.", "Animals"),
  new PublicApi("https://collectionapi.metmuseum.org/public/collection/v1/objects/2", "Metropolitan Museum of Art", "Data on artworks.", "Art"),
  new PublicApi("https://gutendex.com/books/", "Project Gutenberg Index", "Access free eBooks.", "Books"),
  new PublicApi("https://openlibrary.org/search.json?q=the+lord+of+the+rings", "Open Library", "Search books catalog.", "Books"),
  new PublicApi("https://date.nager.at/api/v3/PublicHolidays/2024/US", "Public Holiday API", "US public holidays list.", "Calendar"),
  new PublicApi("https://api.dictionaryapi.dev/api/v2/entries/en/hello", "Free Dictionary", "Word definitions.", "Reference"),
  new PublicApi("https://corporatebs-generator.sameerkumar.website/", "Corporate Buzzword Generator", "Generates buzzwords.", "Entertainment"),
  new PublicApi("https://api.imgflip.com/get_memes", "Imgflip API", "Popular meme templates.", "Entertainment"),
  new PublicApi("https://uselessfacts.jsph.pl/api/v2/facts/random", "Useless Facts", "Random quirky facts.", "Entertainment"),
  new PublicApi("https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates", "Department of Treasury", "US fiscal data.", "Finance"),
  new PublicApi("https://foodish-api.com/api", "Foodish", "Random food images.", "Food"),
  new PublicApi("https://api.openbrewerydb.org/v1/breweries?per_page=25", "Open Brewery", "US brewery details.", "Food"),
  new PublicApi("https://www.cheapshark.com/api/1.0/deals?&upperPrice=15", "Cheap Shark", "Deals on PC games.", "Games"),
  new PublicApi("https://digimon-api.vercel.app/api/digimon", "Digimon", "Digimon data.", "Games"),
  new PublicApi("https://api.disneyapi.dev/character", "Disney", "Disney character info.", "Games"),
  new PublicApi("https://www.dnd5eapi.co/api/spells/acid-arrow/", "D&D API", "D&D spell data.", "Games"),
  new PublicApi("https://api.magicthegathering.io/v1/cards", "Magic the Gathering", "MTG card data.", "Games"),
  new PublicApi("https://opentdb.com/api.php?amount=10", "Open Trivia", "Trivia questions.", "Games"),
  new PublicApi("https://pokeapi.co/api/v2/pokemon/ditto", "Pokemon API", "Pokemon data.", "Games"),
  new PublicApi("https://api.zippopotam.us/us/ma/belmont", "Zippopotam", "Location data.", "Location"),
  new PublicApi("https://datausa.io/api/data?drilldowns=Nation&measures=Population&year=latest", "Data USA", "US population data.", "Government"),
  new PublicApi("https://disease.sh/v3/covid-19/historical/all?lastdays=all", "Open Disease API", "COVID-19 data.", "Healthcare"),
  new PublicApi("https://api.lyrics.ovh/v1/cher/believe", "Lyrics API", "Song lyrics fetcher.", "Music"),
  new PublicApi("http://de1.api.radio-browser.info/json/stations?limit=50", "Internet Radio Stations", "Internet radio list.", "Music"),
  new PublicApi("http://universities.hipolabs.com/search?country=turkey", "Universities API", "University data.", "Education"),
  new PublicApi("https://picsum.photos/v2/list?page=2&limit=100", "Lorem Picsum", "Random placeholder images.", "Photos"),
  new PublicApi("https://jsonplaceholder.typicode.com/posts", "JSONPlaceholder", "Fake REST API.", "Mock Data"),
  new PublicApi("https://api.agify.io?name=michael", "Agify API", "Predicts age from name.", "Data"),
  new PublicApi("https://api.nationalize.io?name=michael", "Nationalize API", "Predicts nationality from name.", "Data"),
  new PublicApi("https://catfact.ninja/fact", "Cat Fact API", "Random cat facts.", "Animals"),
  new PublicApi("https://randomuser.me/api/", "Random User Generator", "Generates random users.", "Mock Data"),
  new PublicApi("https://api.adviceslip.com/advice", "Advice Slip API", "Random advice.", "Advice"),
  new PublicApi("https://deckofcardsapi.com/api/deck/new/draw/", "Deck of Cards API", "Draws from a deck.", "Games"),
  new PublicApi("https://www.themealdb.com/api/json/v1/1/random.php", "MealDB", "Random meal recipes.", "Food"),
  new PublicApi("https://v2.jokeapi.dev/joke/Any", "Joke API", "Random jokes.", "Entertainment"),
  new PublicApi("https://swapi.dev/api/people/1/", "Star Wars API", "Star Wars character data.", "Movies"),
  new PublicApi("https://random-data-api.com/api/users/random_user", "Random User Data", "Generates random users.", "Mock Data"),
  new PublicApi("https://random-data-api.com/api/v2/users", "Random User Data", "Generates random users.", "Mock Data"),
  new PublicApi("https://api.funtranslations.com/translate/yoda.json?text=Hello%20world", "Yoda Translations", "Translates to Yoda speak.", "Entertainment"),
  new PublicApi("https://api.spacexdata.com/v4/launches", "SpaceX Launches", "SpaceX launch info.", "Space"),
  new PublicApi("https://api.thecatapi.com/v1/breeds", "Cat Breeds", "List of cat breeds.", "Animals"),
  new PublicApi("https://api.coindesk.com/v1/bpi/currentprice.json", "Bitcoin Price Index", "Current Bitcoin prices.", "Finance"),
  new PublicApi("https://api.thecatapi.com/v1/images/search", "Random Cat Image", "Random cat images.", "Animals"),
  new PublicApi("https://api.kanye.rest", "Kanye West Quotes", "Quotes from Kanye West.", "Quotes"),
  new PublicApi("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", "NASA Astronomy Picture of the Day", "Daily NASA image.", "Space"),
  new PublicApi("https://api.github.com/users", "GitHub Users", "List of GitHub users.", "Data"),
  new PublicApi("https://www.amiiboapi.com/api/amiibo/?name=mario", "AmiiboAPI", "Amiibo data.", "Games"),
  new PublicApi("https://earthquake.usgs.gov/fdsnws/event/1/application.json", "Earthquake Catalog", "Earthquake data.", "Disasters"),
  new PublicApi("https://api.reelgood.com/v3.0/content/random?availability=onSources&content_kind=both&nocache=true&region=us&sources=netflix&spin_count=1", "Netflix Roulette", "Random Netflix suggestions.", "Entertainment"),
  new PublicApi("https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=Arsenal", "Free Sports API", "Sports data.", "Sports"),
  new PublicApi("https://api.fda.gov/drug/label.json", "openFDA", "Data on drugs and devices.", "Health"),
  new PublicApi("https://randomfox.ca/floof/?ref=apilist.fun", "Randomfox", "Random fox images.", "Animals"),
  new PublicApi("https://anapioficeandfire.com/api/books/1", "An API of Ice and Fire", "Game of Thrones data.", "Books"),
  new PublicApi("https://archive.org/metadata/principleofrelat00eins", "Archive.org", "Access to archived materials.", "Data"),
  new PublicApi("https://api.reliefweb.int/v1/reports?appname=public-api-explorer&limit=20", "reliefweb", "Disaster updates.", "Disasters"),
  new PublicApi("https://hellosalut.stefanbohacek.dev/?lang=es", "Hellosalut", "Hello in many languages.", "Language"),
  new PublicApi("https://chroniclingamerica.loc.gov/lccn/sn86069873/1900-01-05/ed-1.json", "Chronicling America", "Historic newspaper access.", "History"),
  new PublicApi("https://www.federalregister.gov/api/v1/documents.json?per_page=20", "Federal Register", "US government journal.", "Government"),
  new PublicApi("https://www.travel-advisory.info/api?countrycode=AU", "Travel Advisory Data", "Travel safety advisories.", "Travel"),
  new PublicApi("https://api.funtranslations.com/translate/shakespeare.json?text=You%20are%20testing%20this%20api", "Shakespeare Translation Api", "Translates to Shakespearean English.", "Entertainment"),
  new PublicApi("https://api.tvmaze.com/search/shows?q=the%20simpsons", "Tvmaze", "TV show database.", "Entertainment"),  
  new PublicApi("http://api.citybik.es/v2/networks", "City Bikes", "Bike-sharing data.", "Transportation"),
  new PublicApi("https://api.worldbank.org/v2/country/br?format=json", "World Bank", "Global economic data.", "Economics"),
  new PublicApi("http://api.open-notify.org/iss-now.json", "Open Notify", "ISS location data.", "Space"),
  new PublicApi("https://api.oceandrivers.com/v1.0/getWeatherDisplay/cnarenal/?period=latestdata", "Odweather", "Weather data and webcams.", "Weather"),
  new PublicApi("https://www.asterank.com/api/mpc", "Minor Planet Center API", "Asteroid data.", "Space"),
  new PublicApi("https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400", "Sunrise and Sunset", "Sunrise and sunset times.", "Astronomy"),
  new PublicApi("https://api.usaspending.gov/api/v2/references/agency/456/", "USA Spending", "Federal spending data.", "Finance"),
];
