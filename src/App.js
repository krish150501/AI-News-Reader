import React,{useEffect,useState} from 'react'
import alanbtn from '@alan-ai/alan-sdk-web'
import NewsCards from "./Components/Newscards/Newscards";
import useStyles from './styles'
import wtn from 'word-to-numbers'

const App = ()=>{
    const [newsArticles,setNewsArticles]=useState([])
    const [activeArticles,setActiveArticles]=useState(-1)
    const classes = useStyles()
    useEffect(()=>{
        alanbtn({
            key:'f971ae37dae4c62516fea4957fc0327b2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand:({command,articles,number} )=>{
                if(command==='newHeadlines'){
                    setNewsArticles(articles)
                    setActiveArticles(-1)
                }
                else if(command==='highlight')
                {
                    setActiveArticles((prev)=>prev+1)
                }
                else if(command==='open')
                {
                    const no = number.length > 2 ? wtn(number,{fuzzy:true}) :number
                    if(no > 20)
                    {
                        alanbtn().playText('try again with correct number')
                    }
                    else if(articles[no-1])
                    {
                        alanbtn().playText('opening..')
                       window.open(articles[no-1].url,'_blank')
                    }
                }
            }
        })
    },[]) 

    return(
        <div>
            <h1>hello</h1>
            <NewsCards articles={newsArticles} activearticle={activeArticles}/>
        </div>
    )
}
export default App;