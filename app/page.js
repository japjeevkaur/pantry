'use client'
import { firestore } from '@/firebase'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Typography, TextField } from '@mui/material'
import { getDocs, query, setDoc, doc, deleteDoc, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [pantry, setPantry] = useState([])
  const [open, setOpen] = useState(false)
  const [newItem, setNewItem] = useState('')
  const [newItemCount, setNewItemCount] = useState(1) // Set the initial count to 1

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setNewItem('')
    setNewItemCount(1) // Reset the count to 1 when closing the modal
    setOpen(false)
  }

  useEffect(() => {
    const updatePantry = async () => {
      try {
        const snapshot = query(collection(firestore, 'pantry'))
        const docs = await getDocs(snapshot)
        const pantryList = []
        docs.forEach((doc) => {
          pantryList.push({ id: doc.id, data: doc.data() })
        })
        console.log(pantryList)
        setPantry(pantryList)
      } catch (error) {
        console.error("Error fetching pantry data: ", error)
      }
    }
    updatePantry()
  }, [])

  const handleAdd = async () => {
    const docRef = doc(collection(firestore, 'pantry'), newItem)
    await setDoc(docRef, { count: newItemCount })
    setPantry(prevPantry => [...prevPantry, { id: newItem, data: { count: newItemCount } }])
    console.log(newItem)
    handleClose()
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'pantry', id))
      setPantry(prevPantry => prevPantry.filter(item => item.id !== id))
      console.log(`Deleted item with id: ${id}`)
    } catch (error) {
      console.error("Error deleting pantry item: ", error)
    }
  }

  return (
    <Box 
      width="100vw" 
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >

      <TableContainer component={Paper} style={{ width: '800px', height: '600px' }}>
        <Button onClick={handleOpen}>ADD</Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pantry</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pantry.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.data.count}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(item.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Add New Pantry Item
          </Typography>
          <TextField
            id="new-item"
            label="New Item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            id="new-item-count"
            label="Count"
            type="number"
            value={newItemCount}
            onChange={(e) => setNewItemCount(parseInt(e.target.value))}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleAdd}>Add</Button>
        </Box>
      </Modal>
    </Box>
  )
}
