import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Article= () => {
    const colors = ['#fee715ff', '#03dac6', '#6dac4fff', '#ff5851' ];
    const random_number = () => {
        const length = colors.length;
        return colors[Math.floor(Math.random() * length)]
    };
    const [articles, setArticles] = useState([]);
    
    useEffect(async()=>{
        const allArticles = await axios.get('/blogs/get-articles');
        console.log(allArticles.data);
        setArticles(allArticles.data);
  
      },[]);
    return (
        <section className='articles'>
            <form>
                <input type='text'/>
            </form>
                <div className='article_lists'>
                    {articles.map(article => (
                        <Link to={`/blog/${article.blog_id}`}><div style={{backgroundColor : `${random_number()}`}}>
                            <h2>{article.title}</h2>
                        </div></Link>
                    ))}
                    
                </div>
            
            <button>load more</button>

        </section>
      );
}
 
export default Article;