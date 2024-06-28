import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import { useState } from "react";
import * as Yup from "yup"

const Login = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  //handle input change 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //handle login logic 
  const handleLogin = async() =>{
    setErrors([])
    try {
      const scheme = Yup.object().shape({
        email:Yup.string()
        .email("Invalid Email")
        .required("Email is required"),
        password:Yup.string()
        .min(6,"Password must be at least 6 characters")
        .required("Password is required"),
      })
      await scheme.validate(formData,{abortEarly:false})
      //api call
      
    } catch (e) {
      const newError = {};
      e?.inner?.forEach((err)=>{
        newError[err.path]=err.message;
      });
      setErrors(newError);
      
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        {errors.email && <Error message={errors.mail}/>}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleInputChange}
          />
          <Error message={"some error"} />
        </div>
        <div className="space-y-1">
          <Input type="email" name="email" placeholder="Enter your email" />
          {errors.passwrod && <Error message={errors.password}/>}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>
          {true ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
