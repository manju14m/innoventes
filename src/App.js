import React,{useState} from 'react'


export default function App(){

    const [room, setRoom] = useState(1)
    const [adult, setAdult] = useState(1)
    const [children, setChildren] = useState(0)


    // adding room
    const addRoom = ()=>{
            setRoom(room+1)
        if(adult <= room){
            setAdult(adult+1)
        }   
    }

    // removing room
    const removeRoom = ()=>{
        setRoom(room-1)
        if((adult+children) > (room-1)*4){
            if(children>0){
               let child = (room-1)*4-adult
               if (child >=0){
                   setChildren(child)
               }
               else{
                   setChildren(0)
                   setAdult(adult-(-child))
               }
            }
            else{
                setAdult((room-1)*4)
            }
        }
    }

    // adding adult
    const addAdult = ()=>{
        if((adult+children) < room*4){ // 1 room should contain adult+child <= 4
            setAdult(adult+1)
        }
        else if(room<5){   // when room is filled and want to add persons         
            addRoom()
            setAdult(adult+1)
        }  
    }

    // adding child
    const addChild = ()=>{
        if((adult+children) < room*4){ // 1 room should contain adult+child <= 4
            setChildren(children+1)
        }
        else if(room<5){
            addRoom()
            setChildren(children+1)
        }  
    }

    // removing adult
    const removeAdult = ()=>{
        if(adult > room){          // each room should contain min 1 adult
            setAdult(adult-1)
        }
        else{
            removeRoom()
            setAdult(adult-1)
            if((adult+children) > (room-1)*4){
                setChildren(((room-1)*4)-(adult-1))
            }
        } 
    }

    // removing child
    const removeChild = ()=>{
        setChildren(children-1)   
    }



    return(
        <div className="main mt-5">
            <i className="fa fa-users p-2" aria-hidden="true"></i> Choose number of <strong>people</strong>
            <div className="container" >
                <div className="item py-2 d-flex justify-content-between">
                    <div>
                        <i className="fa fa-bed mr-2" aria-hidden="true"></i> {`${room>1 ? "ROOMS" : "ROOM"}`}
                    </div>
                    <div>
                        <button disabled={room===1 ? true: false}  onClick={()=>removeRoom()}><i className="fa fa-minus-circle minus" aria-hidden="true"></i></button>
                        {room}
                        <button disabled={room===5 ? true: false}  onClick={()=>addRoom()}><i className="fa fa-plus-circle" aria-hidden="true" ></i></button>
                    </div>
                </div>
                <div className=" item py-2 d-flex justify-content-between">
                    <div>
                        <i className="fa fa-user mr-3" aria-hidden="true"></i> {`${adult>1 ? "ADULTS" : "ADULT"}`}
                    </div>
                    <div>
                        <button disabled={adult === 1 ? true: false} onClick={()=>removeAdult()}><i className="fa fa-minus-circle" aria-hidden="true"></i></button>
                        {adult} 
                        <button disabled={adult+children === 20 ? true: false} onClick={()=>addAdult()}><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
                    </div>
                </div>
                <div className=" py-2 d-flex justify-content-between">
                    <div>
                        <i className="fa fa-child mr-3" aria-hidden="true"></i> {`${children>1 ? "CHILDREN" : "CHILD"}`}
                    </div>
                    <div>
                        <button  disabled={children===0 ? true: false} onClick={()=>removeChild()}><i className="fa fa-minus-circle" aria-hidden="true"></i></button>
                        {children}
                        <button disabled={adult+children === 20 ? true: false}  onClick={()=>addChild()}><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}