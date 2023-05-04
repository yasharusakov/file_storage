import {useState, useEffect} from 'react'
import UsersService from '../../services/UsersService.ts'
import {useAppSelector} from '../../hooks/useAppSelector.ts'
import {useActions} from '../../hooks/useActions.ts'
import './style.scss'

const HomePage = () => {
    const {logout} = useActions()
    const {user} = useAppSelector(state => state.user)
    const [files, setFiles] = useState<FileList | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [images, setImages] = useState<any[]>([])

    const getAllFiles = async () => {
        const response = await UsersService.getFiles(user._id)
        setImages(response.data.files)
    }

    useEffect(() => {
        setLoading(true)
        getAllFiles()
            .finally(() => setLoading(false))
    }, [])

    const saveFiles = async () => {
        if (!files) return
        setLoading(true)
        await UsersService.uploadFiles({userId: user._id, files})
        setFiles(null)
        setLoading(false)
    }

    return (
        <div>
            <button onClick={logout}>Logout</button>
            {images?.map((image, index) => {
                const dataUrl = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;

                return (
                    <div>
                        {image.mimetype.includes('image')
                            ? <img key={index} src={dataUrl}/>
                            : <video key={index} controls src={dataUrl}></video>}
                    </div>
                )
            })}
            <input disabled={loading} onChange={(e) => setFiles(e.target.files)} multiple type="file"/>
            {files && <button onClick={saveFiles}>Save files</button>}
        </div>
    )
}

export default HomePage