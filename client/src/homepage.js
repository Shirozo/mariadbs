import { useEffect, useState } from "react"
import axios from 'axios'
import { Rendertbody } from "./JS/rendertbody"
import { EditForm } from "./JS/editForm"

export function HomePage() {

    const [newContact, setNewContact] = useState({
        name: "",
        number: "",
        address: "",
        occupation: "",
    })

    const [editingData, setEditingData] = useState({})
    const [editpress, setEditPress] = useState(false)
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

        axios.post("http://localhost:8081/addcontact", newContact)
        .then(res => {
            setNewContact({
                name: "",
                number: "",
                address: "",
                occupation: "",
            })
            getData()
        })
        .catch(err => console.log(err))
    }

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete("http://localhost:8081/removecontact/"+id)
            getData()
        }
        catch (err) {
            console.log(err)
        }

    }

    const handleEdit = async(id) => {
        const res = await axios.get("http://localhost:8081/user/"+id)
        setEditingData(...res.data)
        setEditPress(true)
    }


    return(
        <>
            {editpress && (
                <EditForm  
                    data={editingData} 
                    onUpdate={() => getData()}
                    onclose={() => setEditPress(false)}
            />)}
            <h1 className='headertitle'>Simple CRUD with MariaDB</h1>
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
                    <input placeholder='Address (N/A if None)' 
                            autoFocus autoComplete='off'
                            value={newContact.address}
                            required
                            onChange={(address) => setNewContact((prevSet) => ({
                            ...prevSet, address: address.target.value
                            }))}
                    />
                    
                    <p>Person Occupation</p>
                    <input placeholder='Occupation (N/A if None)' 
                            autoFocus autoComplete='off'
                            required
                            value={newContact.occupation}
                            onChange={(occupation) => setNewContact((prevSet) => ({
                            ...prevSet, occupation: occupation.target.value
                            }))}
                    />

                    <div>
                    <button className="submit-button">Add</button>
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
                                <Rendertbody 
                                    key={data.id}
                                    data={data} 
                                    handleDelete={() => handleDelete(data.id)}
                                    handleEdit={() => handleEdit(data.id)}
                                />
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}