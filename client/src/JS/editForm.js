import { useState } from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import axios from 'axios'

export function EditForm({ data, onclose, onUpdate}) {
    const [newinfo, setnewinfo] = useState(data)

    const UpdateContact = async(event) => {
        /* 
        React function para mag edit/update hin data
        */
        //preventDefault() is para dire magreload it wesbite kun magsend hin form
        event.preventDefault()
        try{
            //API call ngadto han express js passing an state nga newinfo
            const res = await axios.post("http://localhost:8081/update", newinfo)
            //update it state
            onUpdate()
            //close it modal
            onclose()
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        /* Html hit pag edit hin data */
        <div className="editModal">
            <div className="editModalDiv">
                <span className='close' onClick={onclose}>
                    <AiOutlineClose/>
                </span>
                <h3 style={{marginBottom: '5%'}}>Edit contact for <em>{data.name}</em></h3>
                <form className='editform' onSubmit={UpdateContact}>
                    <h4 className='editinfo'>Edit name</h4>
                    <input
                        className='editInput'
                        value={newinfo.name}
                        autoComplete='off'
                        autoFocus
                        /*
                        onChange is everytime magtype ka new letters ha input,
                        mag a'update kon hain iya nga data hit state. Example is,
                        name nga data hit state lat gin a'update hadi
                        */
                        onChange={(newname) => setnewinfo((previnfo) => ({
                            ...previnfo, name: newname.target.value
                        }))}
                    />
                    <h4 className='editinfo'>Edit Number</h4>
                    <input
                        className='editInput' 
                        value={newinfo.number}
                        autoComplete='off'
                        autoFocus
                        /* Pag update namat state hit data nga number */
                        onChange={(newnumber) => setnewinfo((previnfo) => ({
                            ...previnfo, number: newnumber.target.value
                        }))}
                    />
                    <h4 className='editinfo'>Edit Address</h4>
                    <input
                        className='editInput' 
                        value={newinfo.address}
                        autoComplete='off'
                        autoFocus
                        /* Pag update namat state hit data nga address */
                        onChange={(newaddress) => setnewinfo((previnfo) => ({
                            ...previnfo, address: newaddress.target.value
                        }))}
                    />
                    <h4 className='editinfo'>Edit Occupation</h4>
                    <input
                        className='editInput'
                        value={newinfo.occupation}
                        autoComplete='off'
                        autoFocus
                        /* Pag update namat state hit data nga occupation */
                        onChange={(newoccupation) => setnewinfo((previnfo) => ({
                            ...previnfo, occupation: newoccupation.target.value
                        }))}
                    />
                    <div>
                        <button className='submitEdit-button'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}