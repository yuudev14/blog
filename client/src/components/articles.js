import {Link} from 'react-router-dom';

const Article= () => {
    const colors = ['#fee715ff', '#03dac6', '#fff', '#6dac4fff', '#ff5851' ];
    const random_number = () => {
        const length = colors.length;
        return colors[Math.floor(Math.random() * length)]
    }
    return (
        <section className='articles'>
            <form>
                <input type='text'/>
            </form>
            <div className='article_lists'>
                <Link to='/asdasd'><div style={{backgroundColor : `${random_number()}`}}></div></Link>
               

            </div>
            <button>load more</button>

        </section>
      );
}
 
export default Article;