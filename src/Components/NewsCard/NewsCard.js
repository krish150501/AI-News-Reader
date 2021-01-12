import React,{useState,useEffect,createRef} from 'react'
import useStyles from "./styles"
import classnames from 'classnames'
import { Card, CardActions,CardActionArea,CardContent,Button,Typography, CardMedia } from "@material-ui/core";
const NewsCard =({article,activeArticle,i})=>{
    const classes = useStyles()
    const [ref,setref]=useState([])
    useEffect(()=>{
        setref((ref)=>Array(20).fill().map((_,i)=>ref(i)||createRef()))
    },[])
    useEffect(()=>{
        if(i===activeArticle && ref[activeArticle]){
            window.scroll(0,ref[activeArticle].current.offsetTop=50)
        }

    },[i,activeArticle,ref])
    return(
        <Card ref={(ref[i])} className={classnames(classes.card,activeArticle===i?classes.activeCard:null)}>
              <CardActionArea href={article.url} target="_blank">
                  <CardMedia className={classes.media} image={article.urlToImage }/>
                  <div className={classes.details}>
                      <Typography variant='body2' color='textSecondary' component="h2">{(new Date(article.publishedAt)).toLocaleDateString()}</Typography>
                      <Typography variant='body2' color='textSecondary' component="h2">{article.source.name}</Typography>
                  </div>
                  <Typography className={classes.title}gutterBottom variant="h5">{article.title}</Typography>
                  <CardContent>
                      <Typography variant='body2' color="textSecondary" component="p">{article.description}</Typography>
                  </CardContent>
                  </CardActionArea>   
                  <CardActions className={classes.cardActions}>
                      <Button size ="small" color="primary">Know more</Button>
                      <Typography variant='h5' color='textSecondary'>{i+1}</Typography>
                  </CardActions>
        </Card>
    )
}
export default NewsCard;