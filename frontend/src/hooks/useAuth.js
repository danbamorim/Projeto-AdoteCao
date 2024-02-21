import api from '../utils/api'
import { usestate, useEffect } from 'react'
import { UserNavigate } from 'react-router-dom'
export default function useAuth() {
    async function register(user) {
        try {
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })
            console.log(data)
        } catch (error) {
            // tratar erro
            console.log(error)
        }
        }
        return {register}
    }