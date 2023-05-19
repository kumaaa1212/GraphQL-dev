import { gql, useQuery } from '@apollo/client'
import './App.css'
const BOOKS = gql`
  query Books {
    books {
      title
      description
    }
  }
`
function Books(){
  const {data,loading,error } = useQuery(BOOKS)
  if (loading) return <p>loading...</p>
  if (error) return <p>error</p>
  return data.books.map(({title,description}) =>(
    <div>
    <h1>{title}</h1>
    <h1>{description}</h1>
    </div>
  ))
}
function App() {
  return (
    <>
    <h2> aaaaaaaa </h2>
    <Books/>
    </>
  )
}

export default App

// query Books{
//   books {
//     hello
//   }
// }