import React, {useState} from 'react'
import {Box, Flex}  from '@chakra-ui/react';
import styles from '../components/Banner/Post/Post.module.scss'
import useSWR from 'swr';
import Image from 'next/image'
import { Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import Post from '../components/Banner/Post/item';
import SearchFilter from '../components/Search/searchFilter'
import {Row, Col, Container} from 'react-bootstrap';




const baseUrl = "https://realprops.herokuapp.com/properties/"


const Search = () => {

    const router = useRouter()

    const {category} = router.query
    const {minPrice} = router.query
 
    const [searchFilter, SetsearchFilter] = useState(false)
    const [search, setSearch] = useState('')
    
    

    const {data : myItem, error} = useSWR(`${category? `${baseUrl}?price=${minPrice}&category=${category}`:baseUrl}`)

    if(!myItem) return <p><Spinner/></p>
    if(error) return <p>Error loading ........</p>

    const rentProperties = (item) =>{
        const result = myItem.filter((curr)=>{
            return curr.category === item
        })
        router.push(`/search?category=${item}`)
    }


    

    const filterSearch = () =>{
        SetsearchFilter(!searchFilter)
    }

  return (
    <Box>
        <div className={styles.searchBox} onClick={filterSearch}  >
                <SearchFilter text={search} result={setSearch}/>
            <h6 className={styles.searchHead}  color={'purple.800'} >{ category ? `PROPERTIES FOR ${router.query.category}`: 'Available Properties'}</h6>
           <div className={styles.cat_prop} > <p onClick={()=>rentProperties('sale')}>BUY PROPERTY</p>
            <p onClick={()=>rentProperties('rent')}>RENT PROPERTY</p></div>
        </div>

        
        
        <Container maxWidth={'1000px'} m='auto'>
      
        
        
        
        <Row flexWrap='wrap' className={styles.flexcon}>
              
               {myItem.filter((texts)=>{
                    return search.toLocaleLowerCase() === ''? texts : texts.title.toLocaleLowerCase().includes(search)
               })
               .map((item, index)=>(
                <Col sm={6} md={4} m='auto' p='0' key={index} >
                 <Post item={item} />
                </Col>
               ))}
        </Row>
        { myItem.length === 0 && (
            <Flex className={styles.notFound}>
                <Image alt='Not found' width={400} height={300} src={'/images/404.avif'}/>
            </Flex>
        )}

    </Container>
    </Box>
  )
}





export default Search


