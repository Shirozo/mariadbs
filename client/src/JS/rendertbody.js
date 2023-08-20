import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

export function Rendertbody( {data, handleDelete, handleEdit} ) {
    return (
        <>
            <tr>
                <td>{data.name}</td>
                <td>{data.number}</td>
                <td>{data.address}</td>
                <td>{data.occupation}</td>
                <td>
                    <AiOutlineEdit size={20}
                    onClick={handleEdit}
                    style={{
                        width: 50,
                        cursor: 'pointer',
                    }}
                    />
                    <AiOutlineDelete size={20}
                    onClick={handleDelete}
                    style={{
                        width: 50,
                        cursor: 'pointer',
                    }}
                    />
                </td>
            </tr>
        </>
    )
}