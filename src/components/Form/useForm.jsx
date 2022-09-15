import { useState } from "react";
import { helpHttp } from "../helpHttp";
import swal from 'sweetalert'
import { useHistory } from "react-router-dom";
export const useForm = (initialForm,validateForm) => {
    const [form, setForm] = useState(initialForm)
    const [errors,setErrors] = useState({})
    const [loading,setLoading] = useState(false)
    const [response,setResponse] = useState(false)
    const history = useHistory();
    const  handleChange = (e)=>{
        const{name,value} = e.target;
        setForm({
            ...form,[name]:value
        })
    }
    const  handleBlur = (e)=>{
        handleChange(e);
        setErrors(validateForm(form));
    }
    const  handleSubmit = (e)=>{
        e.preventDefault();
        setErrors(validateForm(form));

        if(Object.keys(errors).length ===0){
            swal("Good job!", "The message was sent successfully", "success");
            history.push("/home")
            setLoading(true);
            helpHttp()
                .post("https://formsubmit.co/ajax/tomasgelvez8@gmail.com",{
                    body:form,
                    headers:{
                       'Content-Type':'application/json',
                       'Accept':'application/json',
                    },
                })  
                    .then((res)=>{
                        setLoading(false);
                        setResponse(true);
                    });
        }else{
            return;
        }
    }
  
    return {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur, 
        handleSubmit
    }
};