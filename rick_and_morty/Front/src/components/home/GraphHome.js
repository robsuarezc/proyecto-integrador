import React, { useEffect,useState } from 'react';
import Card from '../card/Card';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';

const GraphHome = () => {

  const [chars,setChars] = useState([]);

  let query = gql`
  {
      characters{
        results{
          name
          image
        }
      }
    }
  `

  let {data,loading,error} = useQuery(query)

  useEffect(()=>{
    if(data && !loading && !error){
      setChars([...data.characters.results])
    }
  },[data,loading,error])

  const nextCharacter = () => {
    chars.shift()
    setChars([...chars])
  }

 

  return(
    <>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <Card
      
        leftClick={nextCharacter}
        {...chars[0]}
        />
    )}
    </>
  )
}

export default GraphHome;
