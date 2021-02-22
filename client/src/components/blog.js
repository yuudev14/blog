import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Blog = (props) => {
    const [blog, setBlog] = useState({
        blog : [],
        title : '',
    });
    useEffect(async() => {
        try {
            const blog_id = props.match.params.id;
            const blog_details = await axios.get('/blogs/article/' + blog_id);
            if(blog_details.status !== 404){
                setBlog(blog_details.data);
            }
            
        } catch (error) {
            alert('doesnt exist');
            props.history.push('/');
            
        }
        

    },[]);
    return ( 
        <section className='blog'>
            <h1>{blog.title}</h1>
            {blog.blog.map(blog => (
                <p>{blog}</p>
            ))}
        </section>
     );
}
 
export default Blog;