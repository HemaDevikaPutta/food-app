import React from 'react';
import {useCart} from '../../hooks/useCart';
import {useAuth} from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createOrder } from '../../services/orderservice';
import classes from './checkout.module.css';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import OrderItemList from '../../components/OrderItemList/OrderItemList';
import Map from '../../components/Map/Map';
 //import { latLng } from 'leaflet';
export default function CheckoutPage(){
    const {cart} =useCart();
    const {user} = useAuth();
    const navigate = useNavigate();
    const [order, setOrder] = useState({...cart});
    const {
        register,
        formState:{errors},
        handleSubmit,

    }=useForm();
    const submit = async data =>{
        if(!order.addressLatLng){
        toast.warning('please select your location on the map');
        return;
        }
      await createOrder({...order, name:data.name , address:data.address});
      navigate('/payment');
    }
    return(
        <>
       <form onSubmit={handleSubmit(submit)}
       className={classes.container}
       >
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem"/>
          <div className={classes.inputs}>
            <Input
            defaultValue={user.name}
            label="Name"
            {...register('name')}
            error = {errors.name}
            />
            <Input
            defaultValue={user.address}
            label="Address"
            {...register('address')}
            error={errors.address}
            />
          </div>
          <OrderItemList order={order}/>
        </div>
       <div>
          <Title title="Choose your location" fontSize="1.6rem"/>
          <Map location={order.addressLatLng}
          onChange={latLng=>{
            console.log(latLng)
            setOrder({...order, addressLatLng: latLng})
          }}
          />
       </div>
       <div className={classes.button_container}>
         <div className={classes.buttons}>
         <Button
         type ="submit"
         text="Go to Payment"
         width="100%"
         height="3rem"
         /> 
         </div>
       </div>
       </form>
        </>
    )
}