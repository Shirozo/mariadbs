import { useEffect, useState } from "react"
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import axios from 'axios'

export function HomePage() {

    const [newContact, setNewContact] = useState({
        name: "",
        number: "",
        address: "",
        occupation: "",
    })

    const [userData, setUserData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get("http://localhost:8081/")
        .then(res => setUserData([...res.data]))
        .catch(err => setUserData(null))
    }

    const addContact = (event) => {
        event.preventDefault()

        axios.post("http://localhost:8081/addstudent", newContact)
        .then(res => console.log(res))
        .catch(err => console.log(err))

        setNewContact({
            name: "",
            number: "",
            address: "",
            occupation: "",
        })
        getData()
    }

    return(
        <div className='formPart'>
            <div className='formtable'>
            <h1>Add Number</h1>
            <form onSubmit={addContact}>
                <p>Person Name</p>
                <input placeholder='Name' 
                    autoFocus autoComplete='off' 
                    required
                    value={newContact.name}
                    onChange={(name) => setNewContact((prevSet) => ({
                        ...prevSet, name: name.target.value
                    }))}
                />

                <p>Person Number</p>
                <input placeholder='Number' 
                        autoFocus autoComplete='off' 
                        required
                        value={newContact.number}
                        onChange={(number) => setNewContact((prevSet) => ({
                        ...prevSet, number: number.target.value
                        }))}
                />

                <p>Person Address</p>
                <input placeholder='Address' 
                        autoFocus autoComplete='off'
                        value={newContact.address}
                        onChange={(address) => setNewContact((prevSet) => ({
                        ...prevSet, address: address.target.value
                        }))}
                />
                
                <p>Person Occupation</p>
                <input placeholder='Occupation' 
                        autoFocus autoComplete='off'
                        value={newContact.occupation}
                        onChange={(occupation) => setNewContact((prevSet) => ({
                        ...prevSet, occupation: occupation.target.value
                        }))}
                />

                <div>
                <button>Add</button>
                </div>
            </form>
            </div>
            <div className='people'>
            <h1>Contacts</h1>
            <div className='peopleData'>
                <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Occupation</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((data) => (
                        <tr key={data.id}>
                            <td>{data.name}</td>
                            <td>{data.number}</td>
                            <td>{data.address}</td>
                            <td>{data.occupation}</td>
                            <td>
                                <AiOutlineEdit size={20}
                                style={{
                                    width: 50,
                                    cursor: 'pointer',
                                }}
                                />
                                <AiOutlineDelete size={20}
                                style={{
                                    width: 50,
                                    cursor: 'pointer',
                                }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
    )
}