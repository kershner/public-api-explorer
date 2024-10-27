import { View, ScrollView, StyleSheet, PanResponder } from 'react-native';
import FetchButton from '@/components/FetchButton';
import React, { useRef } from 'react';

interface PublicApi {
  url: string;
  description: string;
  category: string;
}

// Array of PublicApi data
const apiList: PublicApi[] = [
  { url: 'https://api.fbi.gov/wanted/v1/list', description: 'FBI Wanted List', category: 'Government' },
  { url: 'https://api.artic.edu/api/v1/artworks', description: 'Art Institute of Chicago', category: 'Art' },
  { url: 'https://fakerapi.it/api/v2/addresses', description: 'Faker API Addresses', category: 'Mock Data' },
  { url: 'https://www.refugerestrooms.org/api/v1/restrooms/', description: 'REFUGE Restrooms', category: 'Public' },
  { url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json', description: 'NHTSA Vehicle Makes', category: 'Vehicles' },
  { url: 'https://cat-fact.herokuapp.com/facts', description: 'Cat Facts', category: 'Animals' },
  { url: 'https://dog.ceo/api/breeds/image/random', description: 'Random Dog Image', category: 'Animals' },
  { url: 'https://collectionapi.metmuseum.org/public/collection/v1/objects/2', description: 'Metropolitan Museum of Art', category: 'Art' },
  { url: 'https://gutendex.com/books/', description: 'Project Gutenberg Index', category: 'Books' },
  { url: 'https://openlibrary.org/search.json?q=the+lord+of+the+rings', description: 'Open Library', category: 'Books' },
  { url: 'https://date.nager.at/api/v3/PublicHolidays/2024/US', description: 'Public Holiday Api', category: 'Calendar' },
  { url: 'https://api.dictionaryapi.dev/api/v2/entries/en/hello', description: 'Free Dictionary', category: 'Dictionary' },
  { url: 'https://corporatebs-generator.sameerkumar.website/', description: 'Corporate Buzzword Generator', category: 'Entertainment' },
  { url: 'https://api.imgflip.com/get_memes', description: 'Imgflip API', category: 'Entertainment' },
  { url: 'https://uselessfacts.jsph.pl/api/v2/facts/random', description: 'Useless Facts', category: 'Entertainment' },
  { url: 'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates', description: 'Dep of Treasury', category: 'Finance' },
  { url: 'https://foodish-api.com/api', description: 'Foodish', category: 'Food' },
  { url: 'https://api.openbrewerydb.org/v1/breweries?per_page=25', description: 'Open Brewery', category: 'Food' },
  { url: 'https://www.cheapshark.com/api/1.0/deals?&upperPrice=15', description: 'Cheap Shark', category: 'Games' },
  { url: 'https://digimon-api.vercel.app/api/digimon', description: 'Digimon', category: 'Games' },
  { url: 'https://api.disneyapi.dev/character', description: 'Disney', category: 'Games' },
  { url: 'https://www.dnd5eapi.co/api/spells/acid-arrow/', description: 'D&D', category: 'Games' },
  { url: 'https://api.magicthegathering.io/v1/cards', description: 'Magic the Gathering', category: 'Games' },
  { url: 'https://opentdb.com/api.php?amount=10', description: 'Open Trivia', category: 'Games' },
  { url: 'https://pokeapi.co/api/v2/pokemon/ditto', description: 'Pokemon', category: 'Games' },
  { url: 'https://api.zippopotam.us/us/ma/belmont', description: 'Zippopotam', category: 'Location' },
  { url: 'https://datausa.io/api/data?drilldowns=Nation&measures=Population&year=latest', description: 'Data USA', category: 'Government' },
  { url: 'https://disease.sh/v3/covid-19/historical/all?lastdays=all', description: 'Open Disease', category: 'Healthcare' },
  { url: 'https://api.lyrics.ovh/v1/cher/believe', description: 'lyrics.ovh', category: 'Music' },
  { url: 'http://de1.api.radio-browser.info/json/stations?limit=50', description: 'Internet Radio Stations', category: 'Music' },
  { url: 'http://universities.hipolabs.com/search?country=turkey', description: 'Universities', category: 'Data' },
  { url: 'https://picsum.photos/v2/list?page=2&limit=100', description: 'Lorem Picsum', category: 'Photos' },
];

const ApiButtons: React.FC = () => {
  const scrollRef = useRef<ScrollView | null>(null);
  const scrollStartX = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
      onPanResponderGrant: () => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ x: scrollStartX.current, animated: false });
        }
      },
      onPanResponderMove: (_, gestureState) => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            x: scrollStartX.current - gestureState.dx,
            animated: false,
          });
        }
      },
      onPanResponderRelease: () => {
        if (scrollRef.current) {
          scrollStartX.current = scrollRef.current.getScrollableNode().scrollLeft || 0;
        }
      },
    })
  ).current;

  return (
    <View {...panResponder.panHandlers}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false} >
        <View style={apiButtonsStyles.container}>
          {apiList.map((api) => (
            <FetchButton key={api.url} url={api.url} title={api.description} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const apiButtonsStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10
  },
});

export default ApiButtons;
