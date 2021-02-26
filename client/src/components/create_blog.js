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
        sample_img : '',
        img : ''

    });
    const form = useRef();
    useEffect(async() => {
        try {
            const isVerify = await axios.get('/dashboard/isVerify', {headers : {'token': JSON.parse(localStorage.getItem('blogToken'))}});
            if(!isVerify){
                is_auth_dispatch({type : "NOT_AUTH"});
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
            var topPos = scrollHere.current.offsetTop;
            window.scroll(0,topPos);
            console.log(topPos)
            setBlogInfo({
                ...blogInfo,
                [e.target.name] : value
            });

        }else if(e.target.name === 'img'){
            setBlogInfo({
                ...blogInfo,
                [e.target.name] : e.target.files[0],
                sample_img : URL.createObjectURL(e.target.files[0])
            });
            
        }else{
            setBlogInfo({
                ...blogInfo,
                [e.target.name] : e.target.value
            });
        }   
    }

    const scrollHere = useRef();

    const createBlog = async() => {
        try {
            const preset = 'kopfy1vm';
            const url = 'https://api.cloudinary.com/v1_1/yutakaki/image/upload';
            const formData = new FormData();
            formData.append('file', blogInfo.img);
            formData.append('upload_preset', preset);
            const uploadImg = await axios.post(url, formData);
            const publishBlog = await axios.post('/dashboard/create-blog', {...blogInfo, preview_img : uploadImg.data.secure_url}, {headers : {'token': JSON.parse(localStorage.getItem('blogToken'))}});
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
    const viewForm = () => {
        form.current.classList.toggle('view');
    }
    return ( 
        <div className='createBlog-container'>
            <div className='createBlog-preview'>
                <i className='fas fa-edit' onClick={viewForm}></i>
                <Nav/>
                <div className='preview' >
                    <h1>{blogInfo.title}</h1>
                    <img src={blogInfo.sample_img} />
                    {blogInfo.blog.map(p => (
                        <p>{p}</p>
                    ))}
                    <p id='scroll_here' ref={scrollHere}></p>
                    
                </div>

            </div>
            
            <div className='createBlog-forms' ref={form}>
                <form onSubmit={publish}>
                    <label>
                        <h2>Blog Image</h2>
                        <input name='img' onChange={setBlogInfoMethod} type='file' accept='image/*' multiple={false}/>
                    </label>
                    <label>
                        <h2>Title</h2>
                        <input type='text' onChange={setBlogInfoMethod} name='title' value={blogInfo.title}/>
                    </label>
                    <label id='textarea'>
                        <h2>Body</h2>
                        <textarea  name='blog' onChange={setBlogInfoMethod} value={blogInfo.blog.join("\n")}></textarea>
                    </label>
                    <input type='submit' value='publish'/>
                </form>
            </div>
            
        </div>
     );
}
 
export default CreateBlog;