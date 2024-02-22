import api from '../utils/api'
import { usestate, useEffect } from 'react'
import { UserNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'



export default function useAuth() {
    const{setFlashMessage} = useFlashMessage()
    async function register(user) {

        let msgText = 'Cadastro realizado com sucesso'
        let msgType = 'sucess'

        try {
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })
            console.log(data)
        } catch (error) {
            // tratar erro
            msgText = error.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msgText,msgType)
    }
    return { register }
}