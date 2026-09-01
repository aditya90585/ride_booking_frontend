import { captainLogin } from '../redux/Slices/captainSlices'
import axiosInstance from '../lib/axios'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const CaptainProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem("wf_token")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            return navigate("/captain-login")
        }
        axiosInstance.get("/captain/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    dispatch(captainLogin(res.data.captain))
                    setIsLoading(false)
                }
            }).catch((err) => {
                toast.error(
                    err.response?.data?.message ||
                    "Captain details not found:Please Login"
                );
                localStorage.removeItem('wf_token')
                navigate('/captain-login')
            })
    }, [token])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectedWrapper
