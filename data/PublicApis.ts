import { PublicApi } from '@/models/PublicApi';

export const publicApis: PublicApi[] = [
  new PublicApi(
    "https://api.fbi.gov/wanted/v1/list",
    "FBI Wanted List",
    "Detailed profiles of individuals currently wanted by the FBI.",
    "Government",
    "https://www.fbi.gov/wanted"
  ),
  new PublicApi(
    "https://api.artic.edu/api/v1/artworks",
    "Art Institute of Chicago",
    "Explore comprehensive information on artworks in the Art Institute of Chicago's collection.",
    "Art",
    "https://api.artic.edu/docs/"
  ),
  new PublicApi(
    "https://fakerapi.it/api/v2/addresses",
    "Faker API Addresses",
    "Creates random address data for development and testing purposes.",
    "Mock Data",
    "https://fakerapi.it/en"
  ),
  new PublicApi(
    "https://www.refugerestrooms.org/api/v1/restrooms/",
    "REFUGE Restrooms",
    "Locate safe, accessible, and inclusive public restrooms worldwide.",
    "Public",
    "https://www.refugerestrooms.org/api/docs/"
  ),
  new PublicApi(
    "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json",
    "NHTSA Vehicle Makes",
    "Official registry data on all vehicle makes recognized by the NHTSA.",
    "Transportation",
    "https://vpic.nhtsa.dot.gov/api/"
  ),
  new PublicApi(
    "https://cat-fact.herokuapp.com/facts",
    "Cat Facts",
    "A collection of amusing and educational facts about cats.",
    "Animals",
    "https://alexwohlbruck.github.io/cat-facts/"
  ),
  new PublicApi(
    "https://dog.ceo/api/breeds/image/random",
    "Random Dog Image",
    "Retrieves random photos of dogs across different breeds.",
    "Animals",
    "https://dog.ceo/dog-api/"
  ),
  new PublicApi(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects/2",
    "Metropolitan Museum of Art",
    "Access metadata and images for artworks from the Met’s global collection.",
    "Art",
    "https://metmuseum.github.io/"
  ),
  new PublicApi(
    "https://gutendex.com/books/",
    "Project Gutenberg Index",
    "Index of public domain eBooks available on Project Gutenberg.",
    "Books",
    "https://gutendex.com/"
  ),
  new PublicApi(
    "https://openlibrary.org/search.json?q=the+lord+of+the+rings",
    "Open Library",
    "Search book details and availability across the Open Library catalog.",
    "Books",
    "https://openlibrary.org/developers/api"
  ),
  new PublicApi(
    "https://date.nager.at/api/v3/PublicHolidays/2024/US",
    "Public Holiday API",
    "Lists official public holidays by country and year.",
    "Calendar",
    "https://date.nager.at/Api"
  ),
  new PublicApi(
    "https://api.dictionaryapi.dev/api/v2/entries/en/hello",
    "Free Dictionary",
    "Provides free definitions, phonetics, and word examples.",
    "Reference",
    "https://dictionaryapi.dev/"
  ),
  new PublicApi(
    "https://corporatebs-generator.sameerkumar.website/",
    "Corporate Buzzword Generator",
    "Generates random, humorous corporate buzzwords.",
    "Entertainment",
    "https://github.com/sameerkumar18/corporate-bs-generator-api"
  ),
  new PublicApi(
    "https://api.imgflip.com/get_memes",
    "Imgflip API",
    "Access popular meme templates for image creation.",
    "Entertainment",
    "https://imgflip.com/api"
  ),
  new PublicApi(
    "https://uselessfacts.jsph.pl/api/v2/facts/random",
    "Useless Facts",
    "Fetches random, obscure, and quirky facts.",
    "Entertainment",
    "https://uselessfacts.jsph.pl/"
  ),
  new PublicApi(
    "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates",
    "Department of Treasury",
    "Provides data on U.S. fiscal activity, including interest rates.",
    "Finance",
    "https://fiscaldata.treasury.gov/api-documentation/"
  ),
  new PublicApi(
    "https://foodish-api.com/api",
    "Foodish",
    "Randomly fetches food images for various cuisines.",
    "Food",
    "https://github.com/surhud004/Foodish#readme"
  ),
  new PublicApi(
    "https://api.openbrewerydb.org/v1/breweries?per_page=25",
    "Open Brewery",
    "Offers detailed information on breweries across the U.S.",
    "Food",
    "https://www.openbrewerydb.org/"
  ),
  new PublicApi(
    "https://www.cheapshark.com/api/1.0/deals?&upperPrice=15",
    "Cheap Shark",
    "Lists discounted PC games and deals.",
    "Games",
    "https://apidocs.cheapshark.com/"
  ),
  new PublicApi(
    "https://digimon-api.vercel.app/api/digimon",
    "Digimon",
    "Provides data on Digimon characters, their types, and attributes.",
    "Games",
    "https://digimon-api.vercel.app/"
  ),
  new PublicApi(
    "https://api.disneyapi.dev/character",
    "Disney",
    "Explore data on Disney characters and their details.",
    "Games",
    "https://disneyapi.dev/"
  ),
  new PublicApi(
    "https://www.dnd5eapi.co/api/spells/acid-arrow/",
    "D&D API",
    "Access D&D spells, monsters, and more for 5th edition.",
    "Games",
    "https://www.dnd5eapi.co/"
  ),
  new PublicApi(
    "https://api.magicthegathering.io/v1/cards",
    "Magic the Gathering",
    "Detailed card data for the Magic: The Gathering game.",
    "Games",
    "https://magicthegathering.io/"
  ),
  new PublicApi(
    "https://opentdb.com/api.php?amount=10",
    "Open Trivia",
    "Access trivia questions across various topics and difficulties.",
    "Games",
    "https://opentdb.com/api_config.php"
  ),
  new PublicApi(
    "https://pokeapi.co/api/v2/pokemon/ditto",
    "Pokemon API",
    "Data on Pokémon species, abilities, moves, and more.",
    "Games",
    "https://pokeapi.co/docs/v2"
  ),
  new PublicApi(
    "https://api.zippopotam.us/us/ma/belmont",
    "Zippopotam",
    "Provides postal and location data for various regions.",
    "Location",
    "https://www.zippopotam.us/"
  ),
  new PublicApi(
    "https://datausa.io/api/data?drilldowns=Nation&measures=Population&year=latest",
    "Data USA",
    "Insightful data on U.S. population, economy, and more.",
    "Government",
    "https://datausa.io/about/api/"
  ),
  new PublicApi(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all",
    "Open Disease API",
    "Global and country-level data on COVID-19 statistics.",
    "Healthcare",
    "https://disease.sh/"
  ),
  new PublicApi(
    "https://api.lyrics.ovh/v1/cher/believe",
    "Lyrics API",
    "Fetches lyrics for songs by specified artist and title.",
    "Music",
    "https://lyricsovh.docs.apiary.io/"
  ),
  new PublicApi(
    "https://de1.api.radio-browser.info/json/stations?limit=50",
    "Internet Radio Stations",
    "Provides a list of internet radio stations worldwide.",
    "Music",
    "https://www.radio-browser.info/"
  ),
  new PublicApi(
    "https://universities.hipolabs.com/search?country=turkey",
    "Universities API",
    "Database of universities globally, searchable by country.",
    "Education",
    "https://github.com/Hipo/university-domains-list"
  ),
  new PublicApi(
    "https://picsum.photos/v2/list?page=2&limit=100",
    "Lorem Picsum",
    "Generates random images for placeholders in development.",
    "Photos",
    "https://picsum.photos/"
  ),
  new PublicApi(
    "https://jsonplaceholder.typicode.com/posts",
    "JSONPlaceholder",
    "Fake online REST API for testing and prototyping.",
    "Mock Data",
    "https://jsonplaceholder.typicode.com/"
  ),
  new PublicApi(
    "https://api.agify.io?name=michael",
    "Agify API",
    "Predicts age based on first names using demographic data.",
    "Data",
    "https://agify.io/"
  ),
  new PublicApi(
    "https://api.nationalize.io?name=michael",
    "Nationalize API",
    "Predicts nationality based on first names using global data.",
    "Data",
    "https://nationalize.io/"
  ),
  new PublicApi(
    "https://catfact.ninja/fact",
    "Cat Fact API",
    "Fetches interesting and random facts about cats.",
    "Animals",
    "https://catfact.ninja/"
  ),
  new PublicApi(
    "https://randomuser.me/api/",
    "Random User Generator",
    "Generates random user profiles for testing purposes.",
    "Mock Data",
    "https://randomuser.me/"
  ),
  new PublicApi(
    "https://api.adviceslip.com/advice",
    "Advice Slip API",
    "Generates random advice slips with a single line of wisdom.",
    "Advice",
    "https://api.adviceslip.com/"
  ),
  new PublicApi(
    "https://deckofcardsapi.com/api/deck/new/draw/",
    "Deck of Cards API",
    "Simulates a deck of cards for drawing and shuffling.",
    "Games",
    "https://deckofcardsapi.com/"
  ),
  new PublicApi(
    "https://www.themealdb.com/api/json/v1/1/random.php",
    "MealDB",
    "Fetches random meal recipes with ingredients and instructions.",
    "Food",
    "https://www.themealdb.com/"
  ),
  new PublicApi(
    "https://v2.jokeapi.dev/joke/Any",
    "Joke API",
    "Fetches random jokes across different categories and formats.",
    "Entertainment",
    "https://jokeapi.dev/"
  ),
  new PublicApi(
    "https://swapi.dev/api/people/1/",
    "Star Wars API",
    "Access data on characters, planets, and vehicles from Star Wars.",
    "Movies",
    "https://swapi.dev/documentation"
  ),
  new PublicApi(
    "https://random-data-api.com/api/users/random_user",
    "Random User Data",
    "Generates randomized user profiles for testing.",
    "Mock Data",
    "https://random-data-api.com/documentation"
  ),
  new PublicApi(
    "https://random-data-api.com/api/v2/users",
    "Random User Data",
    "Generates randomized user profiles for testing.",
    "Mock Data",
    "https://random-data-api.com/documentation"
  ),
  new PublicApi(
    "https://api.funtranslations.com/translate/yoda.json?text=Hello+world",
    "Yoda Translations",
    "Converts regular English text into Yoda's dialect.",
    "Entertainment",
    "https://api.funtranslations.com/"
  ),
  new PublicApi(
    "https://api.spacexdata.com/v4/launches",
    "SpaceX Launches",
    "Provides detailed information on SpaceX launches and missions.",
    "Space",
    "https://github.com/r-spacex/SpaceX-API/tree/master/docs#rspacex-api-docs"
  ),
  new PublicApi(
    "https://api.thecatapi.com/v1/breeds",
    "Cat Breeds",
    "Comprehensive data on various cat breeds.",
    "Animals",
    "https://thecatapi.com/"
  ),
  new PublicApi(
    "https://api.coindesk.com/v1/bpi/currentprice.json",
    "Bitcoin Price Index",
    "Fetches the latest Bitcoin price index and historical data.",
    "Finance",
    "https://www.coindesk.com/coindesk-api"
  ),
  new PublicApi(
    "https://api.thecatapi.com/v1/images/search",
    "Random Cat Image",
    "Fetches random images of cats for general use.",
    "Animals",
    "https://thecatapi.com/"
  ),
  new PublicApi(
    "https://api.kanye.rest",
    "Kanye West Quotes",
    "Generates random quotes attributed to Kanye West.",
    "Quotes",
    "https://kanye.rest/"
  ),
  new PublicApi(
    "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY",
    "NASA Astronomy Picture of the Day",
    "Provides NASA’s daily astronomy image with descriptions.",
    "Space",
    "https://api.nasa.gov/"
  ),
  new PublicApi(
    "https://api.github.com/users",
    "GitHub Users",
    "Lists GitHub users with associated profile data.",
    "Data",
    "https://docs.github.com/en/rest"
  ),
  new PublicApi(
    "https://www.amiiboapi.com/api/amiibo/?name=mario",
    "AmiiboAPI",
    "Data on Nintendo's Amiibo figures, including characters and games.",
    "Games",
    "https://www.amiiboapi.com/"
  ),
  new PublicApi(
    "https://earthquake.usgs.gov/fdsnws/event/1/application.json",
    "Earthquake Catalog",
    "Data on recent earthquakes, including magnitude and location.",
    "Disasters",
    "https://earthquake.usgs.gov/fdsnws/event/1/"
  ),
  new PublicApi(
    "https://api.reelgood.com/v3.0/content/random?availability=onSources&content_kind=both&nocache=true&region=us&sources=netflix&spin_count=1",
    "Netflix Roulette",
    "Suggests random Netflix content based on selected filters.",
    "Entertainment",
    "https://reelgood.com/roulette/netflix"
  ),
  new PublicApi(
    "https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=Arsenal",
    "Free Sports API",
    "Provides sports data, including teams, players, and events.",
    "Sports",
    "https://www.thesportsdb.com/api.php"
  ),
  new PublicApi(
    "https://api.fda.gov/drug/label.json",
    "openFDA",
    "Access data on FDA-regulated drugs and devices.",
    "Health",
    "https://open.fda.gov/apis/"
  ),
  new PublicApi(
    "https://randomfox.ca/floof/?ref=apilist.fun",
    "Randomfox",
    "Generates random images of foxes.",
    "Animals",
    "https://randomfox.ca/"
  ),
  new PublicApi(
    "https://www.anapioficeandfire.com/api/books/1",
    "An API of Ice and Fire",
    "Provides data on characters, books, and houses from Game of Thrones.",
    "Books",
    "https://www.anapioficeandfire.com/"
  ),
  new PublicApi(
    "https://archive.org/metadata/principleofrelat00eins",
    "Archive.org",
    "Accesses metadata for digital archived materials.",
    "Data",
    "https://archive.org/developers/"
  ),
  new PublicApi(
    "https://api.reliefweb.int/v1/reports?appname=public-api-explorer&limit=20",
    "reliefweb",
    "Updates and reports on global humanitarian emergencies.",
    "Disasters",
    "https://reliefweb.int/help/api"
  ),
  new PublicApi(
    "https://hellosalut.stefanbohacek.dev/?lang=es",
    "Hellosalut",
    "Provides greetings in various languages.",
    "Language",
    "https://stefanbohacek.dev/projects/hellosalut-api/"
  ),
  new PublicApi(
    "https://chroniclingamerica.loc.gov/lccn/sn86069873/1900-01-05/ed-1.json",
    "Chronicling America",
    "Access historical U.S. newspaper archives and metadata.",
    "History",
    "https://chroniclingamerica.loc.gov/about/api/"
  ),
  new PublicApi(
    "https://www.federalregister.gov/api/v1/documents.json?per_page=20",
    "Federal Register",
    "U.S. government notices, rules, and public announcements.",
    "Government",
    "https://www.federalregister.gov/reader-aids/developer-resources"
  ),
  new PublicApi(
    "https://www.travel-advisory.info/api?countrycode=AU",
    "Travel Advisory Data",
    "Current travel safety advisories by country.",
    "Travel",
    "https://www.travel-advisory.info"
  ),
  new PublicApi(
    "https://api.funtranslations.com/translate/shakespeare.json?text=You+are+testing+this+api",
    "Shakespeare Translation Api",
    "Converts text to Shakespearean English.",
    "Entertainment",
    "https://funtranslations.com/api/shakespeare"
  ),
  new PublicApi(
    "https://api.tvmaze.com/search/shows?q=the+simpsons",
    "Tvmaze",
    "Searches and retrieves TV show information, including episodes and cast.",
    "Entertainment",
    "https://www.tvmaze.com/api"
  ),
  new PublicApi(
    "https://api.citybik.es/v2/networks",
    "City Bikes",
    "Provides real-time bike-sharing data from networks worldwide.",
    "Transportation",
    "https://api.citybik.es/v2/"
  ),
  new PublicApi(
    "https://api.worldbank.org/v2/country/br?format=json",
    "World Bank",
    "Accesses global economic indicators, including data by country.",
    "Economics",
    "https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation"
  ),
  new PublicApi(
    "https://api.open-notify.org/iss-now.json",
    "Open Notify",
    "Real-time location data of the International Space Station.",
    "Space",
    "https://open-notify.org/Open-Notify-API/ISS-Location-Now/"
  ),
  new PublicApi(
    "https://api.oceandrivers.com/v1.0/getWeatherDisplay/cnarenal/?period=latestdata",
    "Odweather",
    "Provides weather data and webcam feeds for specified locations.",
    "Weather",
    "https://api.oceandrivers.com/"
  ),
  new PublicApi(
    "https://www.asterank.com/api/mpc",
    "Minor Planet Center API",
    "Asteroid tracking data from the Minor Planet Center.",
    "Space",
    "https://www.asterank.com/api"
  ),
  new PublicApi(
    "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400",
    "Sunrise and Sunset",
    "Calculates sunrise and sunset times for any location.",
    "Astronomy",
    "https://sunrise-sunset.org/api"
  ),
  new PublicApi(
    "https://api.usaspending.gov/api/v2/references/agency/456/",
    "USA Spending",
    "Detailed data on U.S. federal government spending.",
    "Finance",
    "https://api.usaspending.gov/"
  ),
  new PublicApi(
    "https://www.kershner.org/api/",
    "kershner.org API",
    "Personal website for a very handsome developer.",
    "Data",
    "https://kershner.org/api/"
  )
];
