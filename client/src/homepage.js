import { useEffect, useState } from "react"
import axios from 'axios'
import { Rendertbody } from "./JS/rendertbody"
import { EditForm } from "./JS/editForm"

export function HomePage() {
    /*
        HomePage or the Index of the page
        It [newContact, setNewContact], [editingData, setEditingData], [editpress, setEditPress]
        tas [userData, setUserData] is mga state hit im webpage. Kun mayda mag iba hit usa hit nga
        state, magre-render lat it elements nga dependent hiton nga state dire tanan nga elements.
     */

    const [newContact, setNewContact] = useState({
        name: "",
        number: "",
        address: "",
        occupation: "",
    })

    const [editingData, setEditingData] = useState({})
    const [editpress, setEditPress] = useState(false)
    const [userData, setUserData] = useState([])

    //useEffect nama is nagrarun everytime in nga DOM naglolooad. It ginrarun la niya is pagfetch hin data ha server
    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        /*
        Yanhi is pagfetch data ha express or server. Kulawa it ./server/dbconfig.js
        tas it iya route nga "/". Nagfefetch la it hin data iton nga route 
        */
        axios.get("http://localhost:8081/")
        //setUserData is pag plug hit data ngadto hit state
        .then(res => setUserData([...res.data]))
        .catch(err => setUserData(null))
    }

    const addContact = (event) => {
        /* 
        Function pag add contact
        preventDefault() para dire magrefresh it page kada submit
        */
        event.preventDefault()

        //Make an API request ngadto hit server gamit post para mahide it data nga parameter
        axios.post("http://localhost:8081/addcontact", newContact)
        .then(res => {
            //Kun wara error ig reset it state
            setNewContact({
                name: "",
                number: "",
                address: "",
                occupation: "",
            })
            //Update it state using getData() para magreflect it new data ha databse
            getData()
        })
        //kun mayda error ig console.log lat error
        .catch(err => console.log(err))
    }

    const handleDelete = async (id) => {
        /* 
        function nama in pagtanggal data. notice wara didi preventDefault() kay clickable lat delete
        ngan wara hiya didat form
        */
        try {
            //API request dadama ngadto ha server pluggin it id hit tatanggalon
            const res = await axios.delete("http://localhost:8081/removecontact/"+id)
            //update dadama hit state
            getData()
        }
        catch (err) {
            //log la dadama pag mayda error
            console.log(err)
        }
    }

    const handleEdit = async(id) => {
        //Function para igpakita it modal nga edit
        const res = await axios.get("http://localhost:8081/user/"+id)
        //update is editingData state han returned nga data from server
        setEditingData(...res.data)
        //ipakita it modal
        setEditPress(true)
    }

    return(
        <>
            {editpress && (
                //kun true it editpress nga state. ipakita it modal. kun dire, below element it makikita
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