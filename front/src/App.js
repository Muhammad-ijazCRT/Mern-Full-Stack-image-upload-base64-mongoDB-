import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FileBase from 'react-file-base64';

const App = () => {


// useParams
const [getData, setGetData] = useState([])
const [data, setData] = useState({
    name: '',
    email: '',
    phone: ''
})

// define getData function
useEffect(() => {
    fetch_all_user()
}, [])

// get data from api
const fetch_all_user = () => {
    axios.get('http://127.0.0.1:8000/').then(res => {
        console.log(res.data)
        setGetData(res.data)
    })
}





// get input data
const handleChange = (e) => {
    const { name, value } = e.target;

    setData((val) => {
        return {
            ...val,
            [name]: value,
        }
    })
}

console.log(`this is new added data :)`, data.phone);

// get data when click button
const handleClick = (e) => {
    e.preventDefault()

    console.log(`post data`,data);
    // POST request
    axios.post('http://127.0.0.1:8000/image', data)
        .then((res) => {
            console.log(res.data);
            fetch_all_user()

            setData({
                name: '',
                email: '',
                phone: ''
            })
        })
        .catch((error) => {
            console.log(error);
        });
}


  return (



    <div>
      <h2>Home</h2>
      <hr />

      <div className="container">
        <div className="col-md-5">
          

          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Password</label>
              <input type="text" id="name" name="name" onChange={handleChange} value={data.name} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Password</label>
              <input type="text" id="email" name="email" onChange={handleChange} value={data.email}  className="form-control"  /> 
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Password</label>
              <FileBase type="file" multiple={false} onDone={({ base64 }) => setData({ ...data, phone: base64 })} />
            </div>
            <button type="submit" onClick={handleClick} className="btn btn-primary" > Submit</button>
          </form>



        </div>
        <div className="col-md-7">

            {getData.map((item, index) => {
                return (
                    <tr key={item._id}>
                        <th scope="row">{++index}</th>
                        <td>{item.name}</td>
                        <td>
                        <img src={`${item.phone}`} alt="img" style={{width:'100px'}} />
                        </td>
                        
                    </tr>
                )
            })}
          
          </div>
      </div>
    </div>
  )
}

export default App
