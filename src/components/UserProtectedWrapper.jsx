import axiosInstance from '../lib/axios'
import { login } from '../redux/Slices/userSlices'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("wf_token")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      return navigate("/login")
    }
    axiosInstance.get("/user/profile",{
      headers:{
        Authorization :`Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(login(res.data.user))
          setIsLoading(false)
        }
      }).catch((err) => {
        toast.error(
          err.response?.data?.message ||
          "User detailes not found:Please Login"
        );
        localStorage.removeItem('wf_token')
        navigate('/login')
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

export default UserProtectedWrapper
