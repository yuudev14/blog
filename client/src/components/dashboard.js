import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import { IS_AUTH } from '../context/isAuth';

const Dashboard = (props) => {
    const colors = ['#fee715ff', '#03dac6', '#6dac4fff', '#ff5851' ];
    const {is_auth_dispatch} =  useContext(IS_AUTH);
    const random_number = () => {
        const length = colors.length;
        return colors[Math.floor(Math.random() * length)]
    };
    const [blogs, setBlogs] = useState([]);
    const deleteBlog = async(id) => {
        try {
            const usersBlogs = await axios.delete('/dashboard/delete-blog/' + id, {headers : {'token': JSON.parse(localStorage.getItem('blogToken'))}});
            setBlogs(usersBlogs.data);
            const blogs = await axios.get('/blogs/popular_blogs');
            console.log(blogs.data);
            props.setPopularBlogs(blogs.data);
        } catch (err) {
            console.log(err);
            
        }
    };

    const updateBlog = (blog) => {
        props.history.push(`updateBlog/${blog.blog_id}`)

    }

    useEffect(async()=> {
        try {
            const usersBlogs = await axios.get('/dashboard/user',{headers : {'token': JSON.parse(localStorage.getItem('blogToken'))}})
            setBlogs(usersBlogs.data)
            
        } catch (err) {
            alert(err.response.data);
            is_auth_dispatch({type:'NOT_AUTH'});
            props.history.push('/');
        }

    },[]);

    const search = async(e) => {
        if(e.target.value === ''){
            try {
                const usersBlogs = await axios.get('/dashboard/user',{headers : {'token': JSON.parse(localStorage.getItem('blogToken'))}})
                setBlogs(usersBlogs.data)
                
            } catch (err) {
                console.log(err);
                
            }
        }else{
            try {
                const search_blog = await axios.post('/dashboard/search_blog', {search : e.target.value}, {headers : {'token': JSON.parse(localStorage.getItem('blogToken'))}})
                setBlogs(search_blog.data);
            } catch (err) {
                console.log(err);
                
            }

        }
    }
    return ( 
        <section className='dashboard'>
            {/* <form> */}
                <input type='text' onChange={search} />
            {/* </form> */}
            <div className='articles'>
                {blogs.map(blog => (
                    <div className='article' style={{backgroundColor : `${random_number()}`}}>
                        {blog.preview_img !== '' && (
                                    <img src={blog.preview_img} />
                            )}
                        <div className='article_header'>
                            
                            <Link to={`/blog/${blog.blog_id}`}><h1>{blog.title}</h1></Link>
                            <div className='article_options'>
                                <i className='fa fa-trash' onClick={() => deleteBlog(blog.blog_id)}></i>
                                <i className='fas fa-edit' onClick={() => updateBlog(blog)}></i>

                            </div>
                            
                        </div>
                        
                        {/* <p>{blog.blog[0]}</p> */}
                        
                    </div>

                ))}
                
            </div>
            
        </section>
     );
}
 
export default Dashboard;