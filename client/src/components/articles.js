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
        setArticles(allArticles.data);
  
      },[]);
    
    const search = async(e) => {
        if(e.target.value === ''){
            const allArticles = await axios.get('/blogs/get-articles');
            setArticles(allArticles.data);

        }else{
            try {
                const search_blog = await axios.post('/blogs/search_blog', {search : e.target.value});
                setArticles(search_blog.data);


                
            } catch (err) {
                console.log(err);
                
            }

        }

    }
    return (
        <section className='articles'>
                <input onChange={search} type='text'/>
                <div className='article_lists'>
                    {articles.map(article => (
                        <div style={{backgroundColor : `${random_number()}`}}>
                        
                            {article.preview_img !== '' && (<img src={article.preview_img} />)}
                        
                            <Link to={`/blog/${article.blog_id}`}>
                                <h2>{article.title}</h2>
                            </Link>
                            
                            

                            
                        </div>
                    ))}
                    
                </div>
            
            <button>load more</button>

        </section>
      );
}
 
export default Article;