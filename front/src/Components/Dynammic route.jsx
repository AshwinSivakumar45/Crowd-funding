import { useEffect,useState } from "react";
import axios from "axios"

function Dynamic(){
    const [data, setData] = useState();
    useEffect(() => {
        async function fetchData() {
          try {
            const result = await axios.get('http://localhost:1000/dynamic', {
                headers: { '_id': "0a9a5325-45ab-4507-ab4c-70c4c6cb8791" }
              });
            setData(result.data); 
            console.log(result);
          } catch (error) {
            console.log(error.message);
          }
        }
        fetchData();
      }, []);

      if (!data) return <div>Loading...</div>;
return(
    <div>
        <h1>Hi, {data.Name}</h1>
        <h1>{data.Email}</h1>
    </div>
)
}

export default Dynamic