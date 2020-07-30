import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const {repos} = React.useContext(GithubContext)
  // console.log(repos)

    // STEP 2 - Chart Data
    const chartData = [
      {
        label: "Forked empty",
        value: "4"
      },
      {
        label: "Forked sample",
        value: "2"
      },
      {
        label: "Forked not yet seen",
        value: "5"
      },
      
    ];
  

  const languages = repos.reduce((total, item)=>{
    //we iterate over the array using reduce, we return the total which is an object and each item
    //we return a total if not reduce wont work, we destruct each item object
      const { language, stargazers_count } = item;
      //check if language is null return total
      if(!language) return total;
      // console.log(language)
     //we check if the object we are return have the dynamic property of the laguage
      if(!total[language]) {
        //if it does not have any property, we create an object
        total[language]  = {label: language, value: 1, stars: stargazers_count}
      }else{//if the language value is available den copy the value using spread
        //spread operator to copy all my properties
        total[language] = {...total[language], value: total[language].value + 1, stars: total[language].stars + stargazers_count}

      }
      return total;
  }, {})
  // console.log(languages); //Object representation

      //MOST USED LANGUAGE
    //Here we convert the object to an arrays from the languages
    const mostUsed = Object.values(languages).sort((a, b)=>{
      //sort the highest value first using b parameter
      return b.value - a.value
    }).slice(0, 5);
    //Slice method will essentially copy the part ofour array(start at index 0 and end at index 5)
  // console.log(languages); //Array representation

      //MOST STARS PER LANGUANGE
      //Here we convert the object to an arrays from the languages
      const mostPopular = Object.values(languages).sort((a, b)=>{
        //sort the highest value first using b parameter
        return b.stars - a.stars
      }).slice(0, 5);

      //STARS FORK
      let {stars, forks } = repos.reduce((total, item)=>{
        //return an object 
        const {stargazers_count, name, forks} = item;
        //We set the stars count as a property and equal to repo same with value 
        //We create a new property with value of starsgazer
        total.stars[stargazers_count] = {label: name, value: stargazers_count}
        //We set the forks count as a property and equal to repo same with value 
        //We create a new property with value of starsgazer
        total.stars[forks] = {label: name, value: forks}


        return total
      
      }, {stars:{}, forks:{} });
      //we get the last 5 by using the slice method in the array and reverse it
      stars = Object.values(stars).slice(-5).reverse();
       //we get the last 5 by using the slice method in the array and reverse it
       forks = Object.values(forks).slice(-5).reverse();
    

  return <section className="section">
    <Wrapper className="section-center">
      {/* <ExampleChart data={chartData} ></ExampleChart> */}
      <Pie3D data={mostUsed} />
      <Column3D data={stars}/>
      <Doughnut2D data={mostPopular}/>
      <Bar3D data={forks.length !== 0 ? forks : chartData } />
    </Wrapper>
  </section>;
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
