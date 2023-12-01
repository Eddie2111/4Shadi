'use client';
import axios from 'axios';
import React from 'react';
import {Button, Spinner, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";

interface IUserTableProps{
    data: {
        user: {
            serial: string;
            name: string;
            email: string;
            phone_number: string;
            age: string;
            gender: string;
            lookingFor: string;
            location: string;
        }
    }
}

export default function UsersTable(){
    const [dataset, setDataset] = React.useState<IUserTableProps[]>([]); // [] is the initial state value
    async function fetchUsers(){
        try{
            const response = await axios.get('http://localhost:3500/getall');
            setDataset(response.data.user);
        }catch(error){
            console.log(error);
        }
    }
    React.useEffect(() => {
        fetchUsers();
    }, []);
    console.log(dataset)

    return(
        dataset.length<1 ? <Spinner className='text-6xl mt-10 p-10 mx-32 max-h-6xl max-w-6xl my-5'/> :
        <>
        <Table aria-label="Example static collection table" className='my-5'>
            <TableHeader>
                <TableColumn>Serial</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Phone Number</TableColumn>
                <TableColumn>Age</TableColumn>
                <TableColumn>Gender</TableColumn>
                <TableColumn>Looking For</TableColumn>
                <TableColumn>Location</TableColumn>
                <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
                {
                    dataset.map((user, index) => (
                    <TableRow key={index}>
                        <TableCell>{user.serial}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone_number}</TableCell>
                        <TableCell>{user.age}</TableCell>
                        <TableCell>{user.gender}</TableCell>
                        <TableCell>{user.lookingFor}</TableCell>
                        <TableCell>{user.location}</TableCell>
                        <TableCell> <DeleteModal id={user.serial}/> </TableCell>
                </TableRow>
                    ))
                }
            </TableBody>
        </Table>
        </>
    )
}

function DeleteModal({id}:string): JSX.Element{
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    console.log(id)
    return(
        <>
        <Button onPress={onOpen} color='danger'>Delete</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader>Delete User</ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to delete this user?</p>
                        <p>User ID: {id}</p>
                        <p>This action cannot be undone.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='danger' onPress={onClose}>Yes</Button>
                        <Button color='success' onPress={onClose}>No</Button>
                    </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
        </>
    )
}