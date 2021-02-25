import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { IS_AUTH } from '../context/isAuth';

const Blog = (props) => {
    const {is_auth} = useContext(IS_AUTH)
    const [blog, setBlog] = useState({
        blog : [],
        title : '',
    });

    const [reactedToBlog, setReactedToBlog] = useState(Boolean);
    
    useEffect(async() => {
        try {
            const blog_id = props.match.params.id;
            const blog_details = await axios.get('/blogs/article/' + blog_id);
            if(blog_details.status !== 404){
                setBlog(blog_details.data);
            }
            console.log(blog_details.data)
            
        } catch (error) {
            alert('doesnt exist');
            props.history.push('/');
        }
        if(is_auth){
            try {
                const check = await axios.get(`/dashboard/check-blog-reaction/${props.match.params.id}`,  {headers : {'token': JSON.parse(localStorage.getItem('blogToken'))}});
                setReactedToBlog(check.data)
                
            } catch (err) {
                console.log(err)
            }   
        }
    },[]);

    const like = async() => {
        if(is_auth){
            if(!reactedToBlog){ 
                try {
                    const react = await axios.post(`/dashboard/like-blog/${props.match.params.id}`, {},{headers : {'token': JSON.parse(localStorage.getItem('blogToken'))}});
                    console.log(react)
                    setReactedToBlog(!reactedToBlog);
                    setBlog({...blog, reacts : react.data.reacts});
                } catch (err) {
                    console.log(err.response);
                }
            }
            else{
                try {
                    const react = await axios.delete(`/dashboard/unlike-blog/${props.match.params.id}`, {headers : {'token': JSON.parse(localStorage.getItem('blogToken'))}});
                    setReactedToBlog(!reactedToBlog);
                    setBlog({...blog, reacts : react.data.reacts});
                    
                } catch (err) {
                    console.log(err);
                    
                }
            }
        }
    }
    return ( 
        <section className='blog'>
            <h1>{blog.title}</h1>
            <div className='blog_details'>
                <p>published by : {blog.first_name} {blog.last_name}</p>
                <i style={{color : reactedToBlog ? 'yellow' : 'black'}} className='fas fa-star' onClick={like}>{blog.reacts}</i>
            </div>
            <img src={blog.preview_img} />
            {blog.blog.map(blog => (
                <p>{blog}</p>
            ))}
        </section>
     );
}
 
export default Blog;