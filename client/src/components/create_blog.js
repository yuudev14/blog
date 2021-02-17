import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/createBlog.scss';
import Nav from './nav';

const CreateBlog = (props) => {
    const {isAuth, setIsAuthenticate, isAuthenticate, setAuthenticate} = props;
    
    useEffect(() => {
        isAuth(setIsAuthenticate);
    },[])
    
    const [blogInfo, setBlogInfo] = useState({
        title : '',
        blog : [],
        image : '',
    });

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
    },[blogInfo])
    return ( 
        <div className='createBlog-container'>
            <div className='createBlog-preview'>
                <Nav isAuthenticate={isAuthenticate} setIsAuthenticate={setIsAuthenticate} setAuthenticate={setAuthenticate}/>
                <div className='preview' >
                    <h1>{blogInfo.title}</h1>
                    {blogInfo.blog.map(p => (
                        <p>{p}</p>
                    ))}
                    
                </div>

            </div>
            
            <div className='createBlog-forms'>
                <form>
                    <label>
                        <h2>Blog Image</h2>
                        <input type='file' />
                    </label>
                    <label>
                        <h2>Title</h2>
                        <input type='text' onChange={setBlogInfoMethod} name='title'/>
                    </label>
                    <label>
                        <h2>Body</h2>
                        <textarea name='blog' onChange={setBlogInfoMethod}></textarea>
                    </label>
                    <input type='submit' value='publish'/>
                </form>
            </div>
            
        </div>
     );
}
 
export default CreateBlog;