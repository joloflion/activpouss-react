import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../Redux/features/Product/ProductSlice';
import { storage } from '../../constants/firebase-config';
import { ref, getDownloadURL , uploadBytes} from '@firebase/storage'; // Import Firebase storage and firestore
import { toast } from 'react-toastify';




const AddProductForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

 const categories = [
    {
      name: "Soins capillaires",
      value: "soins_papillaires"
    },
    {
    name: "Traitement cheveux",
    value: "traitement_cheveux"
    },
    {
    name: "Soins visage",
    value: "soins_visage"
    },
    {
        name: "Soins corporels",
        value: "soins_corporels"
    }
 ]
  const dispatcher = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrls = await uploadImages(images);
      await saveProduct(title, description, imageUrls, price, category);
      console.log('Product added successfully');
      // Reset form fields after successful submission
      setTitle('');
      setDescription('');
      setImages([]);
      setPrice('');
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  const uploadImages = async (images) => {
    const imageUrls = [];

    await Promise.all(
      images.map(async (image) => {
        const imageRef = ref(storage,`images/${uuidv4()}`);
        await uploadBytes(imageRef,image)
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      })
    );

    return imageUrls;
  };

  const saveProduct = async (title, description, images, price) => {
   dispatcher(addProduct({title,description,images, price}));
   toast.success(`Enrégistré avec succès`, {
    autoClose: 1000,
  });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <div className='my-5'>
      <h2>Ajouter un produit</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
           <label>Catégorie</label>
           <select className='form-select'>
            {categories.map(cat => <option value={cat.value} onChange={() => setCategory(cat.value)}>{cat.name}</option>)}
           </select>
        </div>
        <div className='form-group mt-3'>
          <label>Titre</label>
          <input className='form-control' type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className='form-group my-3'>
          <label>Description</label>
          <textarea className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label>Images</label>
          <input className='form-control' type="file" multiple onChange={handleImageChange} />
        </div>
        <div className='form-group my-3'>
          <label>Prix</label>
          <input className='form-control' type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <button type="submit" className='btn btn-success'>Enrégister</button>
      </form>
    </div>
  );
};

export default AddProductForm;