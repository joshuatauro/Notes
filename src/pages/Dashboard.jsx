import { useEffect, useState } from "react"
import { db } from "../../firebase"
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore"
function Dashboard(){

    // useEffect(() => {
    //     const getSemSubs = async() =>{
    //         const ssmap = await getDoc(doc(db, "subjects", "CSE"))
    //         console.log(ssmap.data())
    //     }
    //     getSemSubs()

    // }, [])

    const [name,setName]=useState("")
    const [sem,setSem]=useState("")
    const [branch,setBranch]=useState("")
    const [type,setType]=useState("")
    const [link,setLink]=useState("")
    const [code,setCode]=useState("")

    const addNote = async(e) => {
        e.preventDefault()
        const add = await addDoc(collection(db, "notes"), {name,branch,type,sem,link,code})
        console.log(add)
        setName('')
        setBranch('')
        setSem('')
        setType('')
        setCode('')
        setLink('')
    }


    return(
        <div className="min-h-screen bg-dark-primary">
            <form onSubmit={addNote} className="flex flex-col gap-2 w-full items-center h-full mt-20 justify-center">
                <input value={name} onChange={e => setName(e.currentTarget.value)} type="text" placeholder="name" className=" text-primary focus:outline-none border-dark-cta rounded-md py-2 px-2 border-2 bg-transparent" />
                <input value={code} onChange={e => setCode(e.currentTarget.value)} type="text" placeholder="code" className=" text-primary focus:outline-none border-dark-cta rounded-md py-2 px-2 border-2 bg-transparent" />
                <input value={branch} onChange={e => setBranch(e.currentTarget.value)} type="text" placeholder="branch" className=" text-primary focus:outline-none border-dark-cta rounded-md py-2 px-2 border-2 bg-transparent" />
                <input value={link} onChange={e => setLink(e.currentTarget.value)} type="text" placeholder="link" className=" text-primary focus:outline-none border-dark-cta rounded-md py-2 px-2 border-2 bg-transparent" />
                <input value={type} onChange={e => setType(e.currentTarget.value)} type="text" placeholder="type" className=" text-primary focus:outline-none border-dark-cta rounded-md py-2 px-2 border-2 bg-transparent" />
                <input value={sem} onChange={e => setSem(e.currentTarget.value)} type="text" placeholder="sem" className=" text-primary focus:outline-none border-dark-cta rounded-md py-2 px-2 border-2 bg-transparent" />
                <button className="w-[200px] font-medium text-primary rounded-md py-2 bg-dark-cta">Add</button>
            </form>
        </div>
    )
}

export default Dashboard