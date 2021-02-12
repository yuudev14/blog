
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
                <div style={{backgroundColor : `${random_number()}`}}></div>
                <div style={{backgroundColor : `${random_number()}`}}></div>
                <div style={{backgroundColor : `${random_number()}`}}></div>
                <div style={{backgroundColor : `${random_number()}`}}></div>
                <div style={{backgroundColor : `${random_number()}`}}></div>
                <div style={{backgroundColor : `${random_number()}`}}></div>
                <div style={{backgroundColor : `${random_number()}`}}></div>
                <div style={{backgroundColor : `${random_number()}`}}></div>
                <div style={{backgroundColor : `${random_number()}`}}></div>
                <div style={{backgroundColor : `${random_number()}`}}></div>
                <div style={{backgroundColor : `${random_number()}`}}></div>
                <div style={{backgroundColor : `${random_number()}`}}></div>

            </div>
            <button>load more</button>

        </section>
      );
}
 
export default Article;