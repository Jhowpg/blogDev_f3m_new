import { db } from '../firebase/config';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
const provider = new GoogleAuthProvider()
import { useState, useEffect } from 'react'

export const userAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    async function createUser(data) {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            userLogout()

            setLoading(false)

            return user
        } catch (error) {
            console.error(error.message)
            console.table(typeof error.message)

            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um error, tente novamente mais tarde"
            }

            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    async function userLogin(data) {
        checkIfIsCancelled()
        setLoading(true)
        setError(null)

        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            setLoading(false)

            return user
        } catch (error) {
            console.error(error.message)
            console.table(typeof error.message)

            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um error, tente novamente mais tarde"
            }

            setLoading(false)
            setError(systemErrorMessage)
        }
    }
    const login_with_google = async () => {
        setLoading(true)
        setError(null)

        await signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            const user = result.user
            console.log(user)
            return user
        }).catch((error) => {
            let systemErrorMessage;

            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    systemErrorMessage = 'O popup de autenticação foi fechado antes da operação ser concluída.';
                    break;
                case 'auth/cancelled-popup-request':
                    systemErrorMessage = 'Múltiplas solicitações de popups foram feitas.';
                    break;
                case 'auth/operation-not-allowed':
                    systemErrorMessage = 'A operação não é permitida.';
                    break;
                default:
                    systemErrorMessage = 'Ocorreu um erro, tente novamente mais tarde.';
            }

            setError(systemErrorMessage)
        })
        setLoading(false)
    }
    async function userLogout() {
        checkIfIsCancelled()
        setLoading(true)
        setError(null)

        try {
            await signOut(auth)

            setLoading(false)

        } catch (error) {
            console.error(error.message)
            console.table(typeof error.message)

            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um error, tente novamente mais tarde"
            }

            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        userLogin,
        userLogout,
        error,
        loading,
        login_with_google
    }
}