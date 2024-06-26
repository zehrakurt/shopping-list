import { useState, useEffect } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { RiDeleteBinLine } from "react-icons/ri";
import Container from 'react-bootstrap/Container';
import IconButton from '../src/IconButton';

function App() {
  const [productName, setProductName] = useState('');
  const [selectedShop, setSelectedShop] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const shops = [
    { id: 1, name: 'Migros' },
    { id: 2, name: 'Teknosa' },
    { id: 3, name: 'BİM' }
  ];
  
  const categories = [
    { id: 1, name: 'Elektronik' },
    { id: 2, name: 'Şarküteri' },
    { id: 3, name: 'Oyuncak' },
    { id: 4, name: 'Bakliyat' },
    { id: 5, name: 'Fırın' }
  ];

  const addProduct = () => {
    const id = Math.floor(Math.random() * 1000) + 1; 
    const newProduct = {
      id: id,
      name: productName,
      shop: selectedShop,
      category: selectedCategory
    };
    setProducts([...products, newProduct]); 
    setProductName('');
    setSelectedShop('');
    setSelectedCategory('');
  };

  const markAsBought = (productId) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, isBought: true };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  const checkShoppingCompleted = () => {
    return products.length > 0 && products.every(product => product.isBought);
  };

  useEffect(() => {
    if (checkShoppingCompleted()) {
      alert('Alışveriş Tamamlandı');
    }
  }, [products]);

  return (
    <><Container className='mt-5'>
      <Form.Control className='mb-3' type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Ürün Adını Giriniz" />

      <Form.Select className='mb-3' value={selectedShop} onChange={(e) => setSelectedShop(e.target.value)} aria-label="Market seç">
        <option>Marketi Seçiniz</option>
        {shops.map(shop => (
          <option key={shop.id} value={shop.id}>{shop.name}</option>
        ))}
      </Form.Select>
      
      <Form.Select className='mb-3' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} aria-label="Default select example">
        <option>Ürün Kategorisi Seçiniz</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </Form.Select>
      <div className='bsk-1'>
      <button className='mb-3 btn-1' onClick={addProduct}>Ürün Ekle</button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ürün Adı</th>
            <th>Market</th>
            <th>Kategori</th>
            <th>Satın Alındı</th>
            <th>Ürünü Sil</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} onClick={() => markAsBought(product.id)} className={product.isBought ? 'bought' : ''}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{shops.find(shop => shop.id === parseInt(product.shop)).name}</td>
              <td>{categories.find(category => category.id === parseInt(product.category)).name}</td>
              <td>{product.isBought ? 'Satın Alındı' : 'Satın Alınmadı'}</td>
              <td>
              <IconButton handleClick={()=>{
                setProducts(products.filter(filterProduct=>filterProduct.id!==product.id))
              }}/></td>
            </tr>
          ))}
        </tbody>
      </Table></Container>
    </>
  );
}

export default App;