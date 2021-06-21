import { useState, useEffect  } from 'react';
import BlogList from './BlogList';

const Home = () => {
 const [blogs, setBlogs] = useState(null);
 const [isPending, setIsPending ] = useState(true);
const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
        fetch('http://localhost:8000/blogs')
            .then(response => {
                if(!response.ok) {
                    throw Error('could not fetch the data for that resource');
                }
                return response.json();
            })
            .then(data => {
                    setBlogs(data);
                    setIsPending(false);
                    setError(null);
                }) 
            .catch(error => {
                setIsPending(false);
                setError(error.message);
            })
            }, 1000);
    }, []);



    return (
        <div className="home">
            { error && <div> { error }</div>}
        { isPending && <div>Loading... </div> }

            {blogs && <BlogList blogs={blogs} title="All Blogs!" />}

            {/* <BlogList blogs={blogs.filter((blog) => blog.author === 'mario')} title="Mario's Blogs" /> */}

            {/* <button onClick={() => setName('luigi')}>change name</button>
            <p>{ name }</p> */}

        </div>
    );
}

export default Home;


// Before Fetch Tutorial 17

// const [blogs, setBlogs] = useState([
//     { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
//     { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
//     { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 }
//     ]);

// const [name, setName] = useState('mario')

//     useEffect(() => {
//         console.log('use effect ran')
//       console.log(name);
//     }, [ name ]);

// {blogs && <BlogList blogs={blogs} title="All Blogs!" handleDelete={handleDelete} />}

// const handleDelete = (id) => {
    // const newBlogs = blogs.filter(blog => blog.id !== id);
    // setBlogs(newBlogs);
    // }