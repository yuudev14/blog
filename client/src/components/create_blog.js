import React, {useEffect, useRef, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import '../styles/createBlog.scss';
import Nav from './nav';
import axios from 'axios';
import {IS_AUTH} from '../context/isAuth';
const CreateBlog = (props) => {
    const {is_auth, is_auth_dispatch} = useContext(IS_AUTH)
    const [blogInfo, setBlogInfo] = useState({
        title : '',
        blog : [],
        preview_image : '',
    });
    
    useEffect(async() => {
        try {
            const isVerify = await axios.get('/dashboard/isVerify', {headers : {'token': JSON.parse(localStorage.getItem('blogToken'))}});
            if(!isVerify){
                props.history.push('/')
            }else{
                if(props.location.pathname !== '/createBlog'){
                    try {
                        const blog = await axios.get('/blogs/article/' + props.match.params.id);
                        setBlogInfo(blog.data)
                    } catch (err) {
                        
                    }
                }
            }
            
        } catch (err) {
            console.log(err.response.data)
            
        }
    },[])
    
    



    const setBlogInfoMethod = (e) => {
        if(e.target.name === 'blog'){
            const value = e.target.value.split("\n");
            console.log(value);
            setBlogInfo({
                ...blogInfo,
                [e.target.name] : value
            });

        }else{
            setBlogInfo({
                ...blogInfo,
                [e.target.name] : e.target.value
            });
        }   
    }

    useEffect(()=>{
        console.log(blogInfo)
    },[blogInfo]);

    const createBlog = async() => {
        try {
            const publishBlog = await axios.post('/dashboard/create-blog', blogInfo, {headers : {'token': JSON.parse(localStorage.getItem('blogToken'))}});
            console.log(publishBlog.data);
            props.history.push('/')
        } catch (err) {
            console.log(err.response.data);
        }

    }

    const updateBlog= async() => {
        try {
            const updatedBlog = await axios.post('/dashboard/update-blog', {...blogInfo, blog_id : blogInfo.blog_id}, {headers : {'token': JSON.parse(localStorage.getItem('blogToken'))}});
            console.log(updatedBlog.data);
            props.history.push('/dashboard')
            
        } catch (err) {
            console.log(err.response.data);
            
        }

    }

    const publish = async(e) => {
        e.preventDefault();
        try {
            if(props.location.pathname === '/createBlog'){
                createBlog();
            }else{
                updateBlog();
            }
            
            
        } catch (error) {
            
        }
        
        
    }
    return ( 
        <div className='createBlog-container'>
            <div className='createBlog-preview'>
                <Nav/>
                <div className='preview' >
                    <h1>{blogInfo.title}</h1>
                    {blogInfo.blog.map(p => (
                        <p>{p}</p>
                    ))}
                    
                </div>

            </div>
            
            <div className='createBlog-forms'>
                <form onSubmit={publish}>
                    <label>
                        <h2>Blog Image</h2>
                        <input type='file' />
                    </label>
                    <label>
                        <h2>Title</h2>
                        <input type='text' onChange={setBlogInfoMethod} name='title' value={blogInfo.title}/>
                    </label>
                    <label id='textarea'>
                        <h2>Body</h2>
                        <textarea  name='blog' onChange={setBlogInfoMethod} value={blogInfo.blog}></textarea>
                    </label>
                    <input type='submit' value='publish'/>
                </form>
            </div>
            
        </div>
     );
}
 
export default CreateBlog;