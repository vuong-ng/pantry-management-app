'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import {firestore} from '../firebase';
import {Box, Typography, Modal, Stack, TextField, Button, createTheme, ThemeProvider, CssBaseline} from '@mui/material'
import {collection, doc, deleteDoc, getDocs, getDoc, setDoc, query} from 'firebase/firestore'
// import "../../fonts/stylesheet.css" 
// import '../public/stylesheet.css'

import { Raleway } from '@next/font/google'
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})
export default function Home() {

  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(true)
  const [itemName, setItemName] = useState('')
  const [search, setSearch] = useState('')

  const updateInventory = async () => {
  const snapshot = query(collection(firestore, 'inventory'))
  const docs = await getDocs(snapshot)
  const inventoryList = []
  docs.forEach((doc) => {
    inventoryList.push({
      name: doc.id,
      ...doc.data(),
    })
  })
  setInventory(inventoryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
     } else {
        await setDoc(docRef, {quantity: 1})
     }
    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {quantity: quantity-1})
      }
    }
    await updateInventory()
  }
  useEffect(() => {
    updateInventory()
  },[])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box 
    width="100vw" 
    height="100vh" 
    display="flex" 
    justifyContent="center" 
    flexDirection="column"
    alignItems="center"
    bgcolor="#E2E9DA"
    gap={5} 
    className={raleway.className}>
      <Box
      position="absolute"
      top="0"
      height="60px"
      width="100%"
      bgcolor="#78954B"
      textAlign="center"
      alignContent="center"
      sx={{boxShadow:"5px 5px 5px lightgray",
        fontSize:"24px"
      }}>
        <Typography
        varaint="h3"
        color="#F9F5EC"
        sx={{fontSize:"28px"
        }}>
          Inventory Management
          </Typography>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform:"translate(-50%,-50%)"
        }}
        width={400}
        bgcolor="white"
        border="2px solid #0000"
        box-shadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}>
          <Typography variant="h6" color="black">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField 
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              }}
            />
              <Button
              variant="outlined" onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
                >Add</Button>
          </Stack>

        </Box>
      </Modal>
      <Stack 
      direction="row"
      spacing={2}>
        <TextField 
        variant="outlined"
        fullWidth
        value={itemName}
        onChange={(e) => {
          setItemName(e.target.value)
          setSearch(e.target.value);
        }}
        placeholder="Search for items"></TextField>
      <Button 
      variant="contained"
      onClick={() => {
        handleOpen()
      }}>
        Add new item
      </Button>
      </Stack>
      <Box border="1px solid #333">
        <Box 
        width="800px" 
        height="100px" 
        bgcolor="#78954B"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{borderRadius:"5px"}}>
          <Typography variant="h2" color="#333">Track Items</Typography>
        
      </Box>
      <Stack width="800px" height="300px" spacing={2} overflow="auto">
        {inventory
        .filter((item) => {
          return search.toLowerCase() === '' 
            ? true : item.name.toLowerCase().includes(search);
        })
        .map(({name, quantity}) => (
          <Box key={name}
          width="100%"
          minHeight="150px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgcolor="#f0f0f0"
          padding={5}>
            <Typography variant="h3" color="#333" textAlign="center">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant="h3" color="#333" textAlign="center">
              {quantity}
            </Typography>
            <Stack overflow="auto" direction="row" spacing={2}>
            <Button
            variant="contained" onClick={() => {
              addItem(name)
            }}>
              Add
            </Button>
            <Button variant="contained" onClick={() => {
              removeItem(name)
            }} color="#78954B">Remove Item</Button>
            </Stack>
          </Box>
        ))}
        
      </Stack>
      </Box>
      </Box>
  );
}
