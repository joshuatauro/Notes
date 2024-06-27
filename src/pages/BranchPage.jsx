import "./DropdownStyles.css"
import { useContext, useEffect, useState } from "react"
import Select from 'react-select'
import { db } from "../../firebase"
import { XMarkIcon } from '@heroicons/react/24/solid'
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { SessionContext } from "../context/SessionContext"
function BranchPage(){
    const { cacheNotes, setCacheNotes } = useContext(SessionContext)

    const options = [
        { value: 'S1', label: 'SEM 1' },
        { value: 'S2', label: 'SEM 2' },
        { value: 'S3', label: 'SEM 3' },
        { value: 'S4', label: 'SEM 4' },
        { value: 'S5', label: 'SEM 5' },
        { value: 'S6', label: 'SEM 6' },
        { value: 'S7', label: 'SEM 7' },
        { value: 'S8', label: 'SEM 8' },

    ]
    const [subOptions, setSubOptions] = useState([])
    const typeOptions = [
    {value: "Question Paper", label: "Papers"},
    {value: "Notes", label: "Notes"},
    
    ]

    const [notes, setNotes] = useState(cacheNotes)
    const [queriedNotes, setQueriedNotes] = useState()

    const [semSubMap, setSemSubMap]= useState([])

    useEffect(() => {
        const getNotes = async() => {
            // let semToSubMap
            // if(!notes){

                const allNotes = await getDocs(query(collection(db, 'notes'), where("branch", "==", "CSE")))
                const allSubjects = await getDoc(doc(db, "subjects", "CSE"))
                
                const setToSemSubMap = allSubjects.data()
                setSemSubMap(setToSemSubMap)
    
                const setToNotes = allNotes.docs.map(doc => doc.data())
                setNotes(setToNotes)
                setCacheNotes(setToNotes)
                // if sem has been stored in cache, fetch the sem and its note and subjects, above seperation was necessary since otherwise due to it being async by the time we try setting the notes and subjects, it would be undefined because the state is not updated
                if(localStorage.getItem("sem")){
                    const semCached = JSON.parse(localStorage.getItem("sem")).value
                    setQueriedNotes(setToNotes.filter(note => note.sem === semCached))
                    
                    const subjectsForSem = setToSemSubMap[semCached] //get map of subjects for the chosen sem in the format [{code:name}, ....]
                    if(subjectsForSem){
                        setSubOptions(Object.keys(subjectsForSem).map(code =>({value: code, label: subjectsForSem[code]}))) //change such that we can feed to react-select by changing into [{value: code, label: name}, ....]
                    }
                }
            // }else{            }
            
        }

        getNotes()

    }, [])


    const [sem, setSem] = useState(JSON.parse(localStorage.getItem("sem")) || null);
    const [subject, setSubject] = useState();
    const [type, setType] = useState()

    const handleSemChange = (selectedOption) => {
        localStorage.setItem("sem",JSON.stringify(selectedOption))
        setSem(selectedOption)
        setSubject(null)
        setType(null)
        setQueriedNotes(notes?.filter(note => note.sem === selectedOption.value))
        
        const subjectsForSem = semSubMap[selectedOption.value] //get map of subjects for the chosen sem in the format [{code:name}, ....]
        if(subjectsForSem){
            setSubOptions(Object.keys(subjectsForSem).map(code =>({value: code, label: subjectsForSem[code]}))) //change such that we can feed to react-select by changing into [{value: code, label: name}, ....]
        }
    }
    const handleSubjectChange = (selectedOption) => {
        setSubject(selectedOption)
        if(type){
            setQueriedNotes(notes.filter(note => note.code === selectedOption.value && note.sem === sem.value && note.type === type.value))
        }else{

            setQueriedNotes(notes.filter(note => note.code === selectedOption.value && note.sem === sem.value))
        }
    }
    const handleTypeChange = (selectedOption) => {
        setType(selectedOption)
        console.log
        if(subject){
            setQueriedNotes(notes.filter(note => note.type === selectedOption.value && note.sem === sem.value && note.code === subject.value))
        }else{
            setQueriedNotes(notes.filter(note => note.type === selectedOption.value && note.sem === sem.value))
        }
    }
    const handleClearFilters = () => {
        setType(null);
        setSubject(null);
        setQueriedNotes(notes)
    }

    return(

        <div className="text-primary min-h-screen w-11/12 mx-auto py-5">
            <div className="flex justify-between mt-10 ">
                <div className="">
                    <p className="text-sm font-semibold uppercase">Branch :</p>
                    <h1 className="font-medium text-2xl text-secondary">Computer Science and Engineering</h1>
                </div>
                <div className="flex gap-3">
                    <Select onChange={handleSemChange} value={sem} placeholder="Semester" options={options} classNamePrefix={"rs"} />
                    <Select onChange={handleSubjectChange} value={subject} placeholder="Subject" options={subOptions} classNamePrefix={"rs"} />
                    <Select onChange={handleTypeChange} value={type} placeholder="Type" options={typeOptions} classNamePrefix={"rs"} />
                    <button onClick={handleClearFilters} className="bg-red-500 px-3 rounded-md"><XMarkIcon height={20} /></button>
                </div>
            </div>

            {
                sem ? "" : (
                    <div className="mt-32">
                        <h1 className="text-center text-5xl decoration-wavy underline text-secondary font-medium">Select a semester</h1>
                    </div>
                )
            }
            {/* {
                JSON.stringify(session)
            } */}
            <div className="grid grid-cols-4 gap-3 mt-12">
                {queriedNotes?.map(note => <NoteBox props={note} key={`${note.name}-${note.code}`} />)}
            </div>
            
        </div>
    )
}

function NoteBox({props}){
    const { addToSession, removeFromSession, session } = useContext(SessionContext)
    const { name, link, type, sem, code } = props
    let setInitiallyInSession=false
    for(let i=0;i<session.length;i++){  
        if(session[i].link === link)
            setInitiallyInSession=true
    }
    const [inSession, setInSession] = useState(setInitiallyInSession)

    const handleAddToSession = () => {
        addToSession(props)
        setInSession(true)
    }
    const handleRemoveFromSession = () => {
        removeFromSession(link)
        setInSession(false)
    }

    return(
        <div className="bg-dark-secondary rounded-md px-4 py-3">
            <span className="text-xs border border-dark-cta px-2 bg-dark-cta bg-opacity-10 text-blue-600 rounded-md font-medium py-1 uppercase">{type}</span>
            <h1 className="text-xl font-medium mt-2">{sem} | {code} | {name}</h1> 
            {
                inSession ? (

                    <button onClick={handleRemoveFromSession} className="bg-red-500 w-full rounded-md py-3 mt-4">Remove from session</button>
                ) : (
                    <button onClick={handleAddToSession} className="bg-dark-cta w-full rounded-md py-3 mt-4">Add to session</button>

                )
            }                   
        </div>
    )
}

export default BranchPage;