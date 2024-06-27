import { useContext } from "react"
import { SessionContext } from "../context/SessionContext"
import { XMarkIcon } from "@heroicons/react/24/outline"

function Frame() {
    const {session, removeFromSession, onStage, setOnStage} = useContext(SessionContext)

    return(
        <div className="custom-h grid grid-cols-10">
            <div className="col-span-2 h-full border-r-4 border-r-dark-cta">
                <div className="mx-2">
                    {session?.map(({name, link, code}, index) => (
                        <div key={link} onClick={() => setOnStage(index)} className={`${index === onStage ? 'border-blue-500' : 'border-dark-secondary'} bg-dark-secondary text-primary rounded-md  font-medium py-3.5 px-4 my-2 flex justify-between items-center cursor-pointer border-[3px]`}>
                            <h1>{code} | {name}</h1>
                            <div onClick={() => removeFromSession(link)} className="p-2 rounded-md bg-red-200 border-red-600 border-2">
                                <XMarkIcon  height={10} color="#DC2626" strokeWidth={3} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full px-4 py-3 rounded-md col-span-8 h-full">
                <iframe className="w-full h-full " src={session[onStage]?.link}></iframe>
            </div>
        </div>
    )
}

export default Frame